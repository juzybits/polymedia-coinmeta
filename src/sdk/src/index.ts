import allData from './data.json';
type OneData = typeof allData[number];
export const allCoinMetas = allData as OneData[];

export * from "./getCoinMeta.js";
export * from "./types.js";
