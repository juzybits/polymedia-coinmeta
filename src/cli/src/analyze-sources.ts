import { normalizeStructTag } from "@mysten/sui/utils";
import { readJsonFile, writeTsvFile } from "@polymedia/suitcase-node";

/*
- Reads a list of coin from Suiscan and SuiVision
*/

/* Config */

const INPUT_SUISCAN_FILE = "../../data/sources/suiscan-top100.json";
const INPUT_SUIVISION_FILE = "../../data/sources/suivision-top100.json";
const OUTPUT_FILE = "../../data/sources/output.tsv";

/* Types */

// https://suiscan.xyz/api/sui-backend/mainnet/api/coins?page=0&sortBy=HOLDERS&orderBy=DESC&searchStr=&size=100
type CoinSuiscan = {
    type: string;
    objectId: string;
    name: string;
    supply: string;
    supplyInUsd: string;
    tokenPrice: string;
    dominance: string;
    circulatingSupply: string;
    marketCap: string;
    totalVolume: string;
    maxSupply: string;
    fdv: string;
    holders: string;
    denom: string;
    packageId: string;
    createTimestamp: string;
    creator: string;
    creatorName: string;
    creatorImg: string;
    scamMessage: string;
    decimals: string;
    symbol: string;
    iconUrl: string;
    description: string;
    bridge: string;
    verified: string;
};

// e.g. https://internal.suivision.xyz/mainnet/api/coinsList?cursor=20&search=
type CoinSuivision = {
    coinID: string;
    creator: string;
    createdTime: string;
    package: string;
    totalSupply: string;
    decimals: string;
    name: string;
    symbol: string;
    iconUrl: string;
    holders: string;
    sorted: string;
    nextId: string;
    cmcId: string;
    verified: string;
    website: string;
    coinType: string;
    price: string;
    marketCap: string;
    priceChangePercentage24H: string;
    priceChangePercentage7D: string;
    volume24H: string;
    desc: string;
};

type CoinBoth = {
    scan?: CoinSuiscan;
    vision?: CoinSuivision;
};

type TsvLine = {
    type: string; // s.type == v.coinID
    s_symbol: string;
    v_symbol: string;
    s_name: string;
    v_name: string;
    s_decimals: string;
    v_decimals: string;
    s_created: string; // s.createTimestamp
    v_created: string; // v.createdTime
    s_iconUrl: string;
    v_iconUrl: string;
    s_holders: string;
    v_holders: string;
    s_verified: string;
    v_verified: string;
    s_mktCap: string; // s.marketCap
    v_mktCap: string; // v.marketCap
    s_price: string; // s.tokenPrice
    v_price: string; // v.price
    s_totalVolume: string;
    s_fdv: string;
    s_bridge: string;
    s_description: string;
    s_objectId: string;
    v_volume24H: string;
    v_totalSupply: string;
};

const tsvHeaders = {
    type: "type",
    s_symbol: "s_symbol",
    v_symbol: "v_symbol",
    s_name: "s_name",
    v_name: "v_name",
    s_decimals: "s_decimals",
    v_decimals: "v_decimals",
    s_created: "s_created",
    v_created: "v_created",
    s_iconUrl: "s_iconUrl",
    v_iconUrl: "v_iconUrl",
    s_holders: "s_holders",
    v_holders: "v_holders",
    s_verified: "s_verified",
    v_verified: "v_verified",
    s_mktCap: "s_mktCap",
    v_mktCap: "v_mktCap",
    s_price: "s_price",
    v_price: "v_price",
    s_totalVolume: "s_totalVolume",
    s_fdv: "s_fdv",
    s_bridge: "s_bridge",
    s_description: "s_description",
    s_objectId: "s_objectId",
    v_volume24H: "v_volume24H",
    v_totalSupply: "v_totalSupply",
};

function main()
{
    /* Add all coins to the `coinBoth` map, where the key is the coin type */

    const coinsBoth = new Map<string, CoinBoth>();
    const coinsSuiscan = readJsonFile<CoinSuiscan[]>(INPUT_SUISCAN_FILE);
    const coinsSuivision = readJsonFile<CoinSuivision[]>(INPUT_SUIVISION_FILE);

    for (const scan of coinsSuiscan) {
        const coinType = normalizeStructTag(scan.type);
        coinsBoth.set(coinType, { scan });
    }

    for (const vision of coinsSuivision) {
        const coinType = normalizeStructTag(vision.coinID);
        const both = coinsBoth.get(coinType);
        if (both) {
            both.vision = vision;
        } else {
            coinsBoth.set(coinType, { vision });
        }
    }

    /* Assemble TSV lines */

    const tsvLines: TsvLine[] = [ tsvHeaders ];
    for (const [coinType, both] of coinsBoth.entries()) {
        const s = both.scan;
        const v = both.vision;
        tsvLines.push({
            type: coinType,
            s_symbol: s ? s.symbol : "",
            v_symbol: v ? v.symbol : "",
            s_name: s ? s.name : "",
            v_name: v ? v.name : "",
            s_decimals: s ? s.decimals : "",
            v_decimals: v ? v.decimals : "",
            s_created: s ? s.createTimestamp : "",
            v_created: v ? v.createdTime : "",
            s_iconUrl: s ? s.iconUrl : "",
            v_iconUrl: v ? v.iconUrl : "",
            s_holders: s ? s.holders : "",
            v_holders: v ? v.holders : "",
            s_verified: s ? s.verified : "",
            v_verified: v ? v.verified : "",
            s_mktCap: s ? s.marketCap : "",
            v_mktCap: v ? v.marketCap : "",
            s_price: s ? s.tokenPrice : "",
            v_price: v ? v.price : "",
            s_totalVolume: s ? s.totalVolume : "",
            s_fdv: s ? s.fdv : "",
            s_bridge: s ? s.bridge : "",
            s_description: s ? s.description : "",
            s_objectId: s ? s.objectId : "",
            v_volume24H: v ? v.volume24H : "",
            v_totalSupply: v ? v.totalSupply : "",
        });
    }

    /* Write the TSV */

    const tsvData = tsvLines.map(line =>
        Object.values(line)
    );
    writeTsvFile(OUTPUT_FILE, tsvData);
}

main();
