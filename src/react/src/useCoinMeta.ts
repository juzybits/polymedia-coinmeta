import { useState, useEffect } from "react";
import { CoinMetadata, SuiClient } from "@mysten/sui.js/client";
import { getCoinMeta } from "@polymedia/coinmeta";

export function useCoinMeta(
    suiClient: SuiClient,
    coinType: string | undefined
) {
    const [coinMeta, setCoinMeta] = useState<CoinMetadata | null>(null);
    const [isLoadingCoinMeta, setLoading] = useState<boolean>(false);
    const [errorCoinMeta, setError] = useState<Error | null>(null);

    useEffect(() => {
        setError(null);

        if (!coinType) {
            setLoading(false);
            setCoinMeta(null);
            return;
        }

        setLoading(true);
        getCoinMeta(suiClient, coinType)
            .then(setCoinMeta)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [suiClient, coinType]);

    return { coinMeta, isLoadingCoinMeta, errorCoinMeta };
}
