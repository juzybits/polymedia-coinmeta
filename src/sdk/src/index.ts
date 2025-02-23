import { data } from "./data.js";

type OneData = typeof data[number];
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export const allCoinMetas = data as OneData[];
