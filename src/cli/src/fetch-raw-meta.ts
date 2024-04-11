import { CoinMetadata, SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { readJsonFile, writeJsonFile } from "./utils.js";

const INPUT_FILE = "./data/input-coin-types.json";
const OUTPUT_FILE = "./data/raw-meta.json";

type NetworkName = "mainnet" | "testnet";
type InputCoinTypes = Record<NetworkName, string[]>;

async function main()
{
    const inputCoinTypes = readJsonFile<InputCoinTypes>(INPUT_FILE);
    const coinMetas: CoinMetadata[] = [];
    for (const [networkName, coinTypes] of Object.entries(inputCoinTypes)) {
        console.log(`--- ${networkName} ---`);
        const suiClient = new SuiClient({ url: getFullnodeUrl(networkName as NetworkName) });
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
