import { mkdirSync, writeFileSync } from "fs";
import { inputCoins } from "./inputCoins.js";

const OUTPUT_DIR = "./data/img/raw";

// Ensure the output directory exists
mkdirSync(OUTPUT_DIR, { recursive: true });

function getExtensionFromMimeType(mimeType: string): string {
    const parts = mimeType.split("/");
    const type = parts[1];
    return type?.split("+")[0] || "bin"; // default to .bin for unknown types
}

async function downloadImage(url: string, filename: string) {
    // fetch the image
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download ${url}: ${response.statusText}`);
    }

    // grab the extension from the URL
    let ext = url.split(".").pop()?.split("?")[0];

    // if extension is not found in URL, get it from the MIME type
    if (!ext || ext.includes("/") || ext.length > 5) {
        const mimeType = response.headers.get("Content-Type") || "";
        ext = getExtensionFromMimeType(mimeType);
    }

    // write the file
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(`${OUTPUT_DIR}/${filename}.${ext}`, buffer);
}

async function downloadAllImages() {
    for (const [networkName, coins] of inputCoins.entries()) {
        console.log(`--- ${networkName} ---`);
        for (const coin of coins) {
            const filename = coin.type.replace(/::/g, "-").replace(/\W+/g, "-");
            console.log(`Downloading ${coin.image}`);
            await downloadImage(coin.image, filename);
        }
    }
}

downloadAllImages()
.then(() => {
    console.log("All images downloaded successfully.");
})
.catch((err: unknown) => {
    console.error("Error downloading images:", err);
});
