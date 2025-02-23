import { parseStructTag } from "@mysten/sui/utils";
import { ReactNode } from "react";

import { shortenAddress } from "@polymedia/suitcase-core";
import { LinkExternal } from "@polymedia/suitcase-react";

import { data } from "./data.js";
import "./styles/.shared.app.less";
import "./styles/App.less";
import "./styles/ListCoinMetas.less";

export const App: React.FC = () =>
{
    return (
    <div id="layout">
        <div>
            <Header />
            <div id="nav-and-page">
                {/* <Nav /> */}
                <div id="page">
                    <PageHome />
                </div>
            </div>
        </div>
        <footer />
    </div>
    );
};

const PageHome: React.FC = () => (
    <div id="page-content">

        <h1>Polymedia <span className="rainbow">CoinMeta</span></h1>

        <h2>
            CoinMetadata for Sui coins, and web-optimized logos
        </h2>
        <p>
            You can get the data from this <LinkExternal href="/api/data.json">endpoint</LinkExternal>, or use <i>CoinMetaFetcher</i> from <i>@polymedia/suitcase-core</i>.
        </p>
        <p>
            <LinkExternal href="https://github.com/juzybits/polymedia-coinmeta">Read the docs</LinkExternal>
        </p>

        <br /><br />
        <h2>Pre-fetched coins:</h2>
        <ListCoinMetas />

    </div>
);

const Header: React.FC = () =>
(
    <header>
        <h1>
            <img alt="polymedia" src="https://assets.polymedia.app/img/all/logo-nomargin-transparent-512x512.webp" className="logo" />
            CoinMeta
        </h1>
    </header>
);

const ListCoinMetas: React.FC = () =>
(
    <div id="ListCoinMetas">
        {data.map(meta => (
            <div key={meta.type} className="meta tight">
                <p><img className="logo" src={getIconUrl(meta.iconUrl)} alt={meta.symbol} /></p>
                <p>{meta.name}</p>
                <p>({meta.symbol})</p>
                {formatCoinType(meta.type)}
                {/* <p>id: {meta.id}</p> */}
                {/* <p>decimals: {meta.decimals}</p> */}
                {/* <p>description: {shortDescription(meta.description)}</p> */}
            </div>
        ))}
    </div>
);

function formatCoinType(coinType: string): ReactNode {
    const { address, module, name } = parseStructTag(coinType);
    return <>
        <p>{shortenAddress(address)}</p>
        <p>::{module}::{name}</p>
    </>;
}

function getIconUrl(iconUrl: string): string {
    return window.location.hostname === "localhost"
        ? iconUrl.replace("https://coinmeta.polymedia.app/", "/")
        : iconUrl;
}
