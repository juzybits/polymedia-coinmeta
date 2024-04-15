import { CoinMetadata, SuiClient } from "@mysten/sui.js/client";
import { normalizeStructTag } from "@mysten/sui.js/utils";
import data from "./data.json";
import { CoinMeta } from "./types";

const cache = new Map<string, CoinMetadata>(
    (data as CoinMeta[]).map(meta => [meta.type, meta])
);

export async function getCoinMeta(
    client: SuiClient,
    coinType: string)
: Promise<CoinMetadata>
{
    const normalizedType = normalizeStructTag(coinType);
    const cachedMeta = cache.get(normalizedType);
    if (cachedMeta) {
        return cachedMeta;
    }

    const coinMeta = await client.getCoinMetadata({ coinType: normalizedType });
    if (!coinMeta) {
        throw new Error(`CoinMetadata not found for type: ${normalizedType}`);
    }

    cache.set(normalizedType, coinMeta);

    return coinMeta;
}

export async function getCoinMetas(
    client: SuiClient,
    coinTypes: string[]
): Promise<Map<string, CoinMetadata | null>>
{
    // It's possible (but unlikely) that some duplicates remain if addresses are
    // inconsistently normalized, e.g. ['0x000...002::sui::SUI', '0x2::sui::SUI'].
    const uniqueTypes = Array.from(new Set(coinTypes));

    const results = await Promise.allSettled(
        uniqueTypes.map(coinType => getCoinMeta(client, coinType))
    );

    const metas = new Map<string, CoinMetadata | null>();
    results.forEach((result, index) => {
        metas.set(
            uniqueTypes[index],
            result.status === "fulfilled" ? result.value : null
        );
    });

    return metas;
}
