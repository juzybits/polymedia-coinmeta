import { mkdirSync, writeFileSync } from "fs";

import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { normalizeStructTag } from "@mysten/sui/utils";
import { CoinMeta } from "@polymedia/suitcase-core";
import { readJsonFile, writeJsonFile } from "@polymedia/suitcase-node";

import { findImagePath, getFilename } from "./utils.js";

// === about ===
/*
- Reads a list of coin types and icon URLs from INPUT_MANUAL_FILE
- For each coin:
    - Fetches the CoinMetadata<T> from Sui
    - Downloads the coin logo from the URL
- Writes all CoinMeta<T> to OUTPUT_RAW_META_FILE
- Saves all coin logos in OUTPUT_RAW_IMAGE_DIR
*/

// === config ===

const INPUT_MANUAL_FILE = "../../data/manual-input.json";
const OUTPUT_RAW_META_FILE = "../../data/raw-meta.json";
const OUTPUT_RAW_IMAGE_DIR = "../../data/raw-img";
const REFETCH_IMAGES = false;

// === types ===

type InputCoin = {
    name: string;
    nameOverride?: string;
    type: string;
    image: string;
};

/**
 * The type of data/manual-input.json
 */
type InputFile = InputCoin[];

async function main()
{
    // ensure the output directory exists
    mkdirSync(OUTPUT_RAW_IMAGE_DIR, { recursive: true });

    const coinMetas: Partial<CoinMeta>[] = [];
    const inputCoins = readJsonFile<InputFile>(INPUT_MANUAL_FILE);

    const suiClient = new SuiClient({ url: getFullnodeUrl("mainnet") });
    for (const coin of inputCoins) {
        const coinType = normalizeStructTag(coin.type);
        console.log(`\nFetching metadata: ${coinType}`);
        const coinMetadata = await suiClient.getCoinMetadata({ coinType });

        if (coinMetadata) {
            const coinMeta = Object.assign(coinMetadata, { type: coinType });
            if (coin.nameOverride) { // USDCsol, USDCbnb, cUSDCe, cUSDTe, USDCarb
                coinMeta.name = coin.nameOverride;
                coinMeta.symbol = coin.nameOverride;
            }
            coinMetas.push(coinMeta);

            const imageUrl = coin.image ?? coinMeta.iconUrl;
            if (imageUrl) {
                await downloadImage(
                    getFilename(coinType),
                    imageUrl
                );
            }
        } else {
            throw new Error(`CoinMetadata was null for type ${coinType}`);
        }
    }
    writeJsonFile(OUTPUT_RAW_META_FILE, coinMetas);
}

async function downloadImage(filename: string, imageUrl: string) {
    if (!REFETCH_IMAGES) {
        const imagePath = findImagePath(OUTPUT_RAW_IMAGE_DIR, filename);
        if (imagePath) {
            console.log("Image already downloaded. Set `REFETCH_IMAGES = true` to re-download.");
            return;
        }
    }

    console.log(`Downloading image: ${imageUrl}`);

    // fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error(`Failed to download ${imageUrl}: ${response.statusText}`);
    }

    // grab the extension from the URL
    let ext = imageUrl.split(".").pop()?.split("?")[0];

    // if extension is not found in URL, get it from the MIME type
    if (!ext || ext.includes("/") || ext.length > 5) {
        const mimeType = response.headers.get("Content-Type") ?? "";
        ext = getExtensionFromMimeType(mimeType);
    }

    // write the file
    const buffer = Buffer.from(await response.arrayBuffer());
    const imagePath = `${OUTPUT_RAW_IMAGE_DIR}/${filename}.${ext}`;
    writeFileSync(imagePath, buffer);
}

function getExtensionFromMimeType(mimeType: string): string {
    const parts = mimeType.split("/");
    const type = parts[1];
    return type.split("+")[0] || "bin"; // default to .bin for unknown types
}

void main();
