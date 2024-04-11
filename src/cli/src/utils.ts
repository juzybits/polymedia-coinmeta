import { readFileSync, writeFileSync } from "fs";

export function getFilename(coinType: string): string {
    return coinType.replace(/::/g, "-").replace(/\W+/g, "-");
}

export function readJsonFile<T>(filename: string): T {
    const fileContent = readFileSync(filename, 'utf8');
    const jsonData: T = JSON.parse(fileContent);
    return jsonData;
}

export function writeJsonFile(filename: string, data: unknown): void {
    const str = JSON.stringify(data, null, 4) + "\n";
    writeFileSync(filename, str);
}
