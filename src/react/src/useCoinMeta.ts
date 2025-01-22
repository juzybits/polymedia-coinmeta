import { CoinMetadata, SuiClient } from "@mysten/sui/client";
import { getCoinMeta } from "@polymedia/coinmeta";
import { useState, useEffect } from "react";

export function useCoinMeta(
    suiClient: SuiClient,
    coinType: string | undefined
) {
    const [coinMeta, setCoinMeta] = useState<CoinMetadata | null | undefined>();
    const [errorCoinMeta, setError] = useState<Error | null>(null);

    useEffect(() =>
    {
        setError(null);

        if (!coinType) {
            setCoinMeta(null);
            return;
        }

        setCoinMeta(undefined); // loading

        getCoinMeta(suiClient, coinType)
            .then(setCoinMeta)
            .catch((error: unknown) => {
                setError(error instanceof Error ? error : new Error(String(error)));
                setCoinMeta(null);
            });
    }, [suiClient, coinType]);

    return { coinMeta, errorCoinMeta };
}
