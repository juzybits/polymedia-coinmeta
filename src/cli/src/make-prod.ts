import { cpSync, mkdirSync } from "fs";
import path from "path";
import sharp from "sharp";
import { CoinMeta } from "./types.js";
import { findImagePath, getFilename, readJsonFile, writeJsonFile } from "./utils.js";

/*
This script:
- Reads a list of CoinMeta<T> from INPUT_RAW_META_FILE
- For each CoinMeta<T>:
    - Resizes and compresses the coin logo image
    - Replaces iconUrl with the path to the local image
- Writes all CoinMeta to OUTPUT_PROD_META_FILE
- Saves all coin logos in OUTPUT_PROD_IMAGE_DIR
*/

/* Config */
const INPUT_RAW_META_FILE = "data/raw-meta.json";
const INPUT_RAW_IMAGE_DIR = "data/raw-img";
const OUTPUT_PROD_META_FILE = "data/prod-meta.json";
const OUTPUT_PROD_IMAGE_DIR = "data/prod-img";

async function main()
{
    // ensure the output directory exists
    mkdirSync(OUTPUT_PROD_IMAGE_DIR, { recursive: true });

    const rawMetas = readJsonFile<CoinMeta[]>(INPUT_RAW_META_FILE);
    const prodMetas: CoinMeta[] = [];
    for (const meta of rawMetas) {
        const filename = getFilename(meta.type)
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
        if (ext === '.svg') {
            prodImagePath = `${OUTPUT_PROD_IMAGE_DIR}/${filename}.svg`;
            cpSync(rawImagePath, prodImagePath);
        } else {
            prodImagePath = `${OUTPUT_PROD_IMAGE_DIR}/${filename}.webp`;
            await sharp(rawImagePath)
                .resize({ height: 256 })
                .webp({ quality: 80 })
                .toFile(prodImagePath);
        }

        // save the CoinMeta
        meta.iconUrl = prodImagePath;
        prodMetas.push(meta);
    }
    writeJsonFile(OUTPUT_PROD_META_FILE, prodMetas);
}

void main();
