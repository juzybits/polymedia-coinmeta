# Polymedia CoinMeta

CoinMetadata for Sui coins, and web-optimized logos.

![Polymedia CoinMeta](https://coinmeta.polymedia.app/img/open-graph.webp?x1)

### The problem

Sui apps often fetch `CoinMetadata` objects, which specify coin info like the decimals, ticker, and logo.

While `CoinMetadata` objects can be fetched from a Sui RPC with `SuiClient.getCoinMetadata()`, this has drawbacks that can lead to bad UX:
- If your app needs metadata for many coin types, it will make an RPC request for each of them, which is slow.
- The coin logo is often missing from `CoinMetadata`. Also the image could be huge, or stored in a slow web server.

### How CoinMeta helps

It provides pre-fetched `CoinMetadata` for Sui coins and web-optimized logos for top Sui coins.

The logos are served from CloudFlare, compressed and resized, so they load quickly in your app.

If your app needs a `CoinMetadata` that's not already pre-fetched, CoinMeta falls back to `SuiClient.getCoinMetadata()`, and caches the response.

### How to use it

```shell
pnpm add @polymedia/suitcase-core
```

```typescript
import { CoinMetaFetcher } from "@polymedia/suitcase-core";

// reuse the same fetcher across your app
const fetcher = new CoinMetaFetcher({ client: suiClient });

// fetch one coin
const coinMeta = await fetcher.getCoinMeta("0x2::sui::SUI");

// fetch multiple coins
const coinMetas = await fetcher.getCoinMetas([ "0x2::sui::SUI", "0x123::coin::COIN" ]);
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
