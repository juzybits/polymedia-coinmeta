import { CoinMetadata, SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { inputCoins } from "./inputCoins.js";
import { writeJsonFile } from "./utils.js";

const OUTPUT_FILE = "./data/raw-meta.json";

async function main()
{
    const coinMetas: CoinMetadata[] = [];
    for (const [networkName, coins] of inputCoins.entries()) {
        console.log(`--- ${networkName} ---`);
        const suiClient = new SuiClient({ url: getFullnodeUrl(networkName) });
        for (const coin of coins) {
            console.log(`Fetching ${coin.type}`);
            const coinMeta = await suiClient.getCoinMetadata({ coinType: coin.type });
            if (coinMeta) {
                coinMetas.push(coinMeta);
            } else { // should never happen
                throw new Error(`CoinMetadata was null for type ${coin}`);
            }
        }
    }
    writeJsonFile(OUTPUT_FILE, coinMetas);
}

void main();
