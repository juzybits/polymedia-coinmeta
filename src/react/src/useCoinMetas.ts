import { useState, useEffect } from "react";
import { CoinMetadata, SuiClient } from "@mysten/sui.js/client";
import { getCoinMetas } from "@polymedia/coinmeta";

export function useCoinMetas(
    suiClient: SuiClient,
    coinTypes: string[] | undefined
) {
    const [coinMetas, setCoinMetas] = useState<Map<string, CoinMetadata | null>>(new Map());
    const [isLoadingCoinMetas, setLoading] = useState<boolean>(false);
    const [errorCoinMetas, setError] = useState<Error | null>(null);

    useEffect(() => {
        setError(null);

        if (!coinTypes) {
            setLoading(false);
            setCoinMetas(new Map());
            return;
        }

        setLoading(true);
        getCoinMetas(suiClient, coinTypes)
            .then(setCoinMetas)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [suiClient, coinTypes]);

    return { coinMetas, isLoadingCoinMetas, errorCoinMetas };
}
