# Polymedia CoinMeta

CoinMetadata for Sui coins, and web-optimized logos.

![Polymedia CoinMeta](https://coinmeta.polymedia.app/img/open-graph.webp?x1)

## The problem

Sui apps often rely on `CoinMetadata` objects to find coin info like the decimals, ticker, and logo.

These objects can be fetched directly from a Sui RPC, but this has drawbacks that can lead to bad UX:

- If the app needs metadata for many coin types, it will have to make an RPC request for each of them.
- The coin logo is often missing from the `CoinMetadata` object.
- The image could be very large, or stored in a slow web server.

## How CoinMeta helps

It provides pre-fetched `CoinMetadata` and web-optimized logos for common Sui coins.

The logos are served from CloudFlare, compressed and resized, so they load quickly in your app.

If your app needs a `CoinMetadata` that's not already pre-fetched, `CoinMetaFetcher` falls back to `SuiClient.getCoinMetadata()`, and caches the response.

## Usage

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

Alternatively, you can fetch the data from https://coinmeta.polymedia.app/api/data.json.

## Contributing

If you want to add a new coin, you can either let me know on Twitter / Telegram, or add it yourself:

1\) Add the new coin to [./data/manual-input.json](./data/manual-input.json)<br/>
2\) Run `pnpm cli:fetch-raw`<br/>
3\) Run `pnpm cli:make-prod`<br/>
4\) Submit a pull request
