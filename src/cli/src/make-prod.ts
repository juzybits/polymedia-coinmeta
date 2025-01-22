import { cpSync, mkdirSync, rmSync, writeFileSync } from "fs";
import path from "path";

import { CoinMeta } from "@polymedia/coinmeta";
import { readJsonFile, writeJsonFile } from "@polymedia/suitcase-node";
import sharp from "sharp";

import { findImagePath, getFilename } from "./utils.js";

/*
This script:
- Reads a list of CoinMeta<T> from INPUT_RAW_META_FILE
- For each CoinMeta<T>:
    - Resizes and compresses the coin logo image
    - Replaces iconUrl with the path to the local image
- Writes all CoinMeta to OUTPUT_SDK_META_FILE and OUTPUT_WEB_META_FILE
- Saves all coin logos in OUTPUT_WEB_IMAGE_DIR
*/

/* Config */
const INPUT_RAW_META_FILE = "../../data/raw-meta.json";
const INPUT_RAW_IMAGE_DIR = "../../data/raw-img";
const OUTPUT_SDK_META_FILE = "../sdk/src/data.ts";
const OUTPUT_WEB_META_FILE = "../web/public/api/data.json";
const OUTPUT_WEB_IMAGE_DIR = "../web/public/img/coins"; // careful, gets deleted
const BASE_URL_IMG = "https://coinmeta.polymedia.app/img/coins/";

async function main()
{
    // delete and re-create the output directory
    rmSync(OUTPUT_WEB_IMAGE_DIR, { recursive: true });
    mkdirSync(OUTPUT_WEB_IMAGE_DIR);

    const rawMetas = readJsonFile<CoinMeta[]>(INPUT_RAW_META_FILE);
    const prodMetas: CoinMeta[] = [];
    for (const meta of rawMetas) {
        const filename = getFilename(meta.type);
        console.log(filename);

        // find the raw image
        const rawImagePath = findImagePath(INPUT_RAW_IMAGE_DIR, filename);
        if (!rawImagePath) {
            console.error(`Raw image not found for: ${filename}`);
            continue;
        }

        const ext = path.extname(rawImagePath);

        // resize and convert the image to .webp
        let prodImagePath: string;
        if (ext === ".svg") {
            prodImagePath = `${OUTPUT_WEB_IMAGE_DIR}/${filename}.svg`;
            cpSync(rawImagePath, prodImagePath);
        } else {
            prodImagePath = `${OUTPUT_WEB_IMAGE_DIR}/${filename}.webp`;
            await sharp(rawImagePath)
                .resize({ height: 256 })
                .webp({ quality: 80 })
                .toFile(prodImagePath);
        }

        // save the CoinMeta
        meta.iconUrl = BASE_URL_IMG + path.basename(prodImagePath);
        prodMetas.push(meta);
    }
    writeTextFile(OUTPUT_SDK_META_FILE, `export const data = ${JSON.stringify(prodMetas, null, 4)};`);
    writeJsonFile(OUTPUT_WEB_META_FILE, prodMetas);
}

void main();

function writeTextFile(filename: string, contents: string): void {
    writeFileSync(
        filename,
        contents + "\n"
    );
}
