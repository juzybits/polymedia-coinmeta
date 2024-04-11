import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { mkdirSync, readdirSync, writeFileSync } from "fs";
import path from "path";
import { InputCoin, inputCoins } from "./inputCoins.js";
import { CoinMeta } from "./types.js";
import { getFilename, writeJsonFile } from "./utils.js";

/* Config */
const OUTPUT_META_FILE = "./data/raw-meta.json";
const OUTPUT_IMAGE_DIR = "./data/raw-img";
const REFETCH_IMAGES = false;

async function main()
{
    // ensure the output directory exists
    mkdirSync(OUTPUT_IMAGE_DIR, { recursive: true });

    const coinMetas: CoinMeta[] = [];

    for (const [network, coins] of inputCoins.entries()) {
        console.log(`--- ${network} ---`);
        const suiClient = new SuiClient({ url: getFullnodeUrl(network) });

        for (const coin of coins) { // TODO normalize Sui address
            console.log(`\nFetching metadata: ${coin.type}`);
            const coinMetadata = await suiClient.getCoinMetadata({ coinType: coin.type });
            if (coinMetadata) {
                const coinMeta = Object.assign(coinMetadata, { type: coin.type });
                coinMetas.push(coinMeta);
                await downloadImage(coin);
            } else {
                throw new Error(`CoinMetadata was null for type ${coin.type}`);
            }
        }
    }
    writeJsonFile(OUTPUT_META_FILE, coinMetas);
}

async function downloadImage(coin: InputCoin) {
    const filename = getFilename(coin.type);

    if (!REFETCH_IMAGES) { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
        const files = readdirSync(OUTPUT_IMAGE_DIR);
        const fileExists = files.some(file => path.basename(file, path.extname(file)) === filename);
        if (fileExists) {
            console.log(`Image already downloaded. Set \`REFETCH_IMAGES = true\` to re-download.`);
            return;
        }
    }

    console.log(`Downloading image: ${coin.image}`);

    // fetch the image
    const response = await fetch(coin.image);
    if (!response.ok) {
        throw new Error(`Failed to download ${coin.image}: ${response.statusText}`);
    }

    // grab the extension from the URL
    let ext = coin.image.split(".").pop()?.split("?")[0];

    // if extension is not found in URL, get it from the MIME type
    if (!ext || ext.includes("/") || ext.length > 5) {
        const mimeType = response.headers.get("Content-Type") ?? "";
        ext = getExtensionFromMimeType(mimeType);
    }

    // write the file
    const buffer = Buffer.from(await response.arrayBuffer());
    const imagePath = `${OUTPUT_IMAGE_DIR}/${filename}.${ext}`;
    writeFileSync(imagePath, buffer);
}

function getExtensionFromMimeType(mimeType: string): string {
    const parts = mimeType.split("/");
    const type = parts[1];
    return type.split("+")[0] || "bin"; // default to .bin for unknown types
}

void main();
