# Polymedia CoinMeta

Sui `CoinMetadata<T>` for popular coins.

<!-- ![Polymedia CoinMeta](https://coinmeta.polymedia.app/img/open-graph.webp) TODO -->

## SDK: [./src/sdk/](./ts/sdk/)

The `@polymedia/coinmeta` NPM package.

It provides the helper function `getCoinMeta()`, which uses a long list of hard-coded
`CoinMetadata<T>` to avoid Sui RPC requests.

If a `CoinMetadata<T>` is not known, if fetches it from the Sui RPC with
`SuiClient.getCoinMetadata()` and caches the response.

### How to use it

Add the package to your project:
```bash
pnpm add @polymedia/coinmeta
```

Import it in your code:
```typescript
import { getCoinMeta } from "@polymedia/coinmeta";
```

## Web: [./src/web/](./ts/web/)

The https://coinmeta.polymedia.app webapp, hosted on CloudFlare.

- It serves the coin logos, optimized for the web, e.g. [`/img/0x76cb…FUD.webp`](https://coinmeta.polymedia.app/img/0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1-fud-FUD.webp)

- It serves the full list of hard-coded `CoinMetadata<T>` via [`/api/data.json`](https://coinmeta.polymedia.app)

## CLI: [./src/cli/](./ts/cli/)

Command line tools to fetch `CoinMetadata<T>` objects and coin logo images.

### pnpm cli:fetch-raw

Source: [./src/cli/src/fetch-raw.ts](./src/cli/src/fetch-raw.ts)

It downloads the `CoinMetadata<T>` objects and the coin logos for all coins in [./data/manual-input.json](./data/manual-input.json)

### pnpm cli:make-prod

Source: [./src/cli/src/make-prod.ts](./src/cli/src/make-prod.ts)

It transforms the output of the previous script into production-ready images (compressed and resized) and hard-coded data for the `getCoinMeta()` function and the `api/data.json` endpoint.

## Usage: React

TODO add useCoinMeta/useCoinMetas hooks

## Development

```
pnpm install
pnpm build
pnpm dev
```

Then visit http://localhost:1234

## How to contribute TODO

<!-- ![Polymedia CoinMeta](https://assets.polymedia.app/img/coinmeta/open-graph.webp) TODO -->
