import { readFileSync, readdirSync, writeFileSync } from "fs";
import path from "path";

export function getFilename(normalizedCoinType: string): string {
    return normalizedCoinType.replace(/::/g, "-").replace(/\W+/g, "-");
}

// Function to find the image path based on the filename without extension
export function findImagePath(directory: string, filename: string): string | null {
    const files = readdirSync(directory);
    const file = files.find(f => path.basename(f, path.extname(f)) === filename);
    return file ? path.join(directory, file) : null;
}

export function readJsonFile<T>(filename: string): T {
    const fileContent = readFileSync(filename, 'utf8');
    const jsonData = JSON.parse(fileContent) as T;
    return jsonData;
}

export function writeJsonFile(filename: string, data: unknown): void {
    const str = JSON.stringify(data, null, 4) + "\n";
    writeFileSync(filename, str);
}
