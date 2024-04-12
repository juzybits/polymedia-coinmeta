import { CoinMetadata, SuiClient } from '@mysten/sui.js/client';
import data from './data.json';

const cache = new Map<string, CoinMetadata>(
    data.map(meta => [meta.type, meta])
);

export async function getCoinMeta(coinType: string, client: SuiClient): Promise<CoinMetadata> {
    const cachedMeta = cache.get(coinType);
    if (cachedMeta) {
        return cachedMeta;
    }

    const coinMeta = await client.getCoinMetadata({ coinType });
    if (!coinMeta) {
        throw new Error(`CoinMetadata not found for type: ${coinType}`);
    }

    cache.set(coinType, coinMeta);

    return coinMeta;
}
