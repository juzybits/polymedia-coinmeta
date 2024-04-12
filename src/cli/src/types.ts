export type NetworkName = "mainnet" | "testnet";

export type InputCoin = {
    name: string,
    type: string,
    image: string,
};

/**
 * The type of data/manual-input.json
 */
export type InputFile = Record<NetworkName, InputCoin[]>;
