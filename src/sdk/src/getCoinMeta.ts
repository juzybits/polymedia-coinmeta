import { CoinMetadata, SuiClient } from '@mysten/sui.js/client';
import data from './data.json';
import { CoinMeta } from './types';

const cache = new Map<string, CoinMetadata>(
    (data as CoinMeta[]).map(meta => [meta.type, meta])
);

export async function getCoinMeta(
    client: SuiClient,
    coinType: string)
: Promise<CoinMetadata>
{
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

export async function getCoinMetas(
    client: SuiClient,
    coinTypes: string[])
: Promise<(CoinMetadata|null)[]>
{
    const results = await Promise.allSettled(
        coinTypes.map(coinType => getCoinMeta(client, coinType))
    );

    return results.map(result =>
        result.status === 'fulfilled' ? result.value : null
    );
}
