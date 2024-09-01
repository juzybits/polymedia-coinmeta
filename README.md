# Polymedia CoinMeta

CoinMetadata for Sui coins, and web-optimized logos.

![Polymedia CoinMeta](https://coinmeta.polymedia.app/img/open-graph.webp?x1)

### The problem

Sui apps often need to fetch `CoinMetadata` objects, which determine how coin amounts get displayed to the user, because they contain info like the coin decimals, ticker, and logo.

While `CoinMetadata` objects can be fetched from a Sui RPC with `SuiClient.getCoinMetadata()`, this has drawbacks that can lead to bad UX:
- If your app needs metadata for many coin types, it will make an RPC request for each of them, which is slow.
- The coin logo is often missing from `CoinMetadata`. And the image may be huge, or stored in a slow web server.

### How CoinMeta helps

It provides pre-fetched `CoinMetadata` for Sui coins, and web-optimized logos.

The top coins on Sui were selected and pre-fetched. The logos are served from CloudFlare, compressed and resized, so they load quickly in your app.

If your app needs a `CoinMetadata` that's not already pre-fetched, CoinMeta falls back to `SuiClient.getCoinMetadata()`, and caches the response.

### How to use it

You can access the data in different ways:
- In plain JS/TS, the `@polymedia/coinmeta` package provides the helper functions `getCoinMeta()` and `getCoinMetas()`
- In React apps, the `@polymedia/coinmeta-react` package provides the React hooks `useCoinMeta()` and `useCoinMetas()`
- You can also fetch all data with a REST API request

## SDK: [src/sdk](./src/sdk/)

The `@polymedia/coinmeta` NPM package.

It provides the TypeScript helper functions `getCoinMeta()` and `getCoinMetas()`, which use
a list of pre-fetched `CoinMetadata<T>` to avoid Sui RPC requests.

If a `CoinMetadata<T>` is not known, they fetch it from the Sui RPC with
`SuiClient.getCoinMetadata()` and cache the response.

### How to use it

Add the package to your project:
```bash
pnpm add @polymedia/coinmeta
```

Use it in your code:
```typescript
import { getCoinMeta, getCoinMetas } from "@polymedia/coinmeta";
...
const meta = await getCoinMeta(suiClient, coinType);    // one coin
const metas = await getCoinMetas(suiClient, coinTypes); // many coins
```

## React: [src/react](./src/react/)

The `@polymedia/coinmeta-react` NPM package.

It provides the React hooks `useCoinMeta()` and `useCoinMetas()`, which under the hood use
the SDK helper functions (see previous section).

### How to use it

Add the package to your project:
```bash
pnpm add @polymedia/coinmeta-react
```

Use it in your code:
```typescript
import { useCoinMeta, useCoinMetas } from '@polymedia/coinmeta-react';
...
const { coinMeta, errorCoinMeta } = useCoinMeta(suiClient, coinType);      // one coin
const { coinMetas, errorCoinMetas } = useCoinMetas(suiClient, coinTypes);  // many coins
```

## Web: [src/web](./src/web/)

The https://coinmeta.polymedia.app webapp, hosted on CloudFlare.

\- It serves the coin logos, optimized for the web, e.g. [`/img/coins/0x76cb…FUD.webp`](https://coinmeta.polymedia.app/img/coins/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1-fud-FUD.webp)<br/>
\- It serves the full list of pre-fetched `CoinMetadata<T>` via [`/api/data.json`](https://coinmeta.polymedia.app/api/data.json)

## CLI: [src/cli](./src/cli/)

Command line tools to fetch `CoinMetadata<T>` objects and coin logo images.

### `pnpm cli:fetch-raw`

It downloads the `CoinMetadata<T>` objects and the coin logos for all coins in [./data/manual-input.json](./data/manual-input.json)

### `pnpm cli:make-prod`

It transforms the output of the previous script into production-ready images (compressed and resized) and hard-coded data for the `getCoinMeta()` function and the `api/data.json` endpoint.

## How to contribute

If you want to add a new coin, you can either let me know on Twitter / Telegram, or add it yourself:

1\) Add the new coin to [./data/manual-input.json](./data/manual-input.json)<br/>
2\) Run `pnpm cli:fetch-raw`<br/>
3\) Run `pnpm cli:make-prod`<br/>
4\) Submit a pull request
