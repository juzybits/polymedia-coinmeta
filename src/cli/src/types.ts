export type InputCoin = {
    name: string,
    nameOverride?: string,
    type: string,
    image: string,
};

/**
 * The type of data/manual-input.json
 */
export type InputFile = InputCoin[];
