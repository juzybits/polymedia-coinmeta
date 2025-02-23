import { readdirSync } from "fs";
import path from "path";

export function getFilename(normalizedCoinType: string): string {
    return normalizedCoinType.replace(/::/g, "-").replace(/\W+/g, "-");
}

// find the image path based on the filename without extension
export function findImagePath(directory: string, filename: string): string | null {
    const files = readdirSync(directory);
    const file = files.find(f => path.basename(f, path.extname(f)) === filename);
    return file ? path.join(directory, file) : null;
}
