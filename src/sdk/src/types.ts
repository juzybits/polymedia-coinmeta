import { CoinMetadata } from "@mysten/sui.js/client";

export type CoinMeta = CoinMetadata & {
    type: string,
}
