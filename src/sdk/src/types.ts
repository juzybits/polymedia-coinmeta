import { CoinMetadata } from "@mysten/sui/client";

export type CoinMeta = CoinMetadata & {
    type: string;
};
