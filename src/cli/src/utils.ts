import { writeFileSync } from "fs";

export function writeJsonFile(filename: string, data: unknown): void {
    const str = JSON.stringify(data, null, 4) + "\n";
    writeFileSync(filename, str); // eslint-disable @typescript-eslint/no-unsafe-call
}
