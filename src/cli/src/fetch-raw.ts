import { CoinMetadata, SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { mkdirSync, readdirSync, writeFileSync } from "fs";
import { InputCoin, inputCoins } from "./inputCoins.js";
import { writeJsonFile } from "./utils.js";
import path from "path";

/* Config */
const OUTPUT_META_FILE = "./data/raw-meta.json";
const OUTPUT_IMAGE_DIR = "./data/raw-img";
const REFETCH_IMAGES = false;

async function main()
{
    // ensure the output directory exists
    mkdirSync(OUTPUT_IMAGE_DIR, { recursive: true });

    const coinMetas: CoinMetadata[] = [];

    for (const [network, coins] of inputCoins.entries()) {
        console.log(`--- ${network} ---`);
        const suiClient = new SuiClient({ url: getFullnodeUrl(network) });

        for (const coin of coins) {
            console.log(`\nFetching metadata: ${coin.type}`);
            const coinMeta = await suiClient.getCoinMetadata({ coinType: coin.type });

            if (coinMeta) {
                coinMetas.push(coinMeta);
                await downloadImage(coin);
            } else {
                throw new Error(`CoinMetadata was null for type ${coin}`);
            }
        }
    }
    writeJsonFile(OUTPUT_META_FILE, coinMetas);
}

async function downloadImage(coin: InputCoin) {
    const filename = coin.type.replace(/::/g, "-").replace(/\W+/g, "-");

    if (!REFETCH_IMAGES) {
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
        const mimeType = response.headers.get("Content-Type") || "";
        ext = getExtensionFromMimeType(mimeType);
    }

    // write the file
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(`${OUTPUT_IMAGE_DIR}/${filename}.${ext}`, buffer);
}

function getExtensionFromMimeType(mimeType: string): string {
    const parts = mimeType.split("/");
    const type = parts[1];
    return type?.split("+")[0] || "bin"; // default to .bin for unknown types
}

void main();
