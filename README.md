# Polymedia CoinMeta

CoinMetadata for Sui coins, and web-optimized logos.

![Polymedia CoinMeta](https://coinmeta.polymedia.app/img/open-graph.webp?x1)

## SDK: [./src/sdk/](./src/sdk/)

The `@polymedia/coinmeta` NPM package.

It provides the helper functions `getCoinMeta()` and `getCoinMetas()`, which use
a long list of hard-coded `CoinMetadata<T>` to avoid Sui RPC requests.

If a `CoinMetadata<T>` is not known, they fetch it from the Sui RPC with
`SuiClient.getCoinMetadata()` and cache the response.

### How to use it

Add the package to your project:
```bash
pnpm add @polymedia/coinmeta
```

Use it in your code:
```typescript
import { getCoinMeta } from "@polymedia/coinmeta";
...
const meta = await getCoinMeta(suiClient, coinType);
```

## React: [./src/react/](./src/react/)

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
import { useCoinMeta } from '@polymedia/coinmeta-react';
...
const { coinMeta, isLoadingCoinMeta, errorCoinMeta } = useCoinMeta(suiClient, coinType);

```

## Web: [./src/web/](./src/web/)

The https://coinmeta.polymedia.app webapp, hosted on CloudFlare.

- It serves the coin logos, optimized for the web, e.g. [`/img/0x76cb…FUD.webp`](https://coinmeta.polymedia.app/img/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1-fud-FUD.webp)

- It serves the full list of hard-coded `CoinMetadata<T>` via [`/api/data.json`](https://coinmeta.polymedia.app)

## CLI: [./src/cli/](./src/cli/)

Command line tools to fetch `CoinMetadata<T>` objects and coin logo images.

### `pnpm cli:fetch-raw`

It downloads the `CoinMetadata<T>` objects and the coin logos for all coins in [./data/manual-input.json](./data/manual-input.json)

### `pnpm cli:make-prod`

It transforms the output of the previous script into production-ready images (compressed and resized) and hard-coded data for the `getCoinMeta()` function and the `api/data.json` endpoint.

## How to contribute TODO
