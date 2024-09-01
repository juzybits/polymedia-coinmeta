import { useState, useEffect } from "react";
import { CoinMetadata, SuiClient } from "@mysten/sui/client";
import { getCoinMetas } from "@polymedia/coinmeta";

export function useCoinMetas(
    suiClient: SuiClient,
    coinTypes: string[] | undefined
) {
    const [coinMetas, setCoinMetas] = useState<Map<string, CoinMetadata | null> | undefined>();
    const [errorCoinMetas, setError] = useState<Error | null>(null);

    useEffect(() => {
        setError(null);

        if (!coinTypes) {
            setCoinMetas(new Map());
            return;
        }

        setCoinMetas(undefined); // loading

        getCoinMetas(suiClient, coinTypes)
            .then(setCoinMetas)
            .catch((error: unknown) => {
                setError(error instanceof Error ? error : new Error(String(error)));
                setCoinMetas(new Map());
            });
    }, [suiClient, coinTypes]);

    return { coinMetas, errorCoinMetas };
}
