import { cpSync, mkdirSync, readdirSync } from "fs";
import path from "path";
import sharp from "sharp";
import { CoinMeta } from "./types.js";
import { findImagePath, getFilename, readJsonFile } from "./utils.js";

/* Config */
const INPUT_META_FILE = "./data/raw-meta.json";
const OUTPUT_META_FILE = "./data/prod-meta.json";
const OUTPUT_IMAGE_RAW_DIR = "./data/raw-img";
const OUTPUT_IMAGE_PROD_DIR = "./data/prod-img";

async function main()
{
    // ensure the output directory exists
    mkdirSync(OUTPUT_IMAGE_PROD_DIR, { recursive: true });

    const rawMetas = readJsonFile<CoinMeta[]>(INPUT_META_FILE);
    const prodMetas: CoinMeta[] = [];
    for (const meta of rawMetas) {
        const filename = getFilename(meta.type)
        console.log(filename);

        // find the raw image
        const rawImagePath = findImagePath(OUTPUT_IMAGE_RAW_DIR, filename);
        if (!rawImagePath) {
            console.error(`Raw image not found for: ${filename}`);
            continue;
        }

        const ext = path.extname(rawImagePath);

        // resize and convert the image to .webp
        if (ext === '.svg') {
            const prodImagePath = `${OUTPUT_IMAGE_PROD_DIR}/${filename}.svg`;
            cpSync(rawImagePath, prodImagePath);
        } else {
            const prodImagePath = `${OUTPUT_IMAGE_PROD_DIR}/${filename}.webp`;
            await sharp(rawImagePath)
                .resize({ height: 256 })
                .webp({ quality: 60 })
                .toFile(prodImagePath);
        }
    }
    // writeJsonFile(OUTPUT_META_FILE, rawMetas);
}

void main();
