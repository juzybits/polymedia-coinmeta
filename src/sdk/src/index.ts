import allData from "./data.json";

type OneData = typeof allData[number];
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export const allCoinMetas = allData as OneData[];

export * from "./getCoinMeta.js";
export * from "./types.js";
