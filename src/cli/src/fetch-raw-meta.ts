import { CoinMetadata, SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { inputCoinTypes } from "./inputCoinTypes.js";
import { writeJsonFile } from "./utils.js";

const OUTPUT_FILE = "./data/raw-meta.json";

async function main()
{
    const coinMetas: CoinMetadata[] = [];
    for (const [networkName, coinTypes] of inputCoinTypes.entries()) {
        console.log(`--- ${networkName} ---`);
        const suiClient = new SuiClient({ url: getFullnodeUrl(networkName) });
        for (const coinType of coinTypes) {
            console.log(`Fetching ${coinType}`);
            const coinMeta = await suiClient.getCoinMetadata({ coinType });
            if (coinMeta) {
                coinMetas.push(coinMeta);
            } else { // should never happen
                throw new Error(`CoinMetadata was null for type ${coinType}`);
            }
        }
    }
    writeJsonFile(OUTPUT_FILE, coinMetas);
}

void main();
