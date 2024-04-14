import { allCoinMetas } from "@polymedia/coinmeta";
import { shortenSuiAddress } from "@polymedia/suits";
import { ReactNode } from "react";
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

        <br />
        <h2>Sui CoinMetadata for various Coin&lt;T&gt;</h2>

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
        {allCoinMetas.map(meta => (
            <div key={meta.type} className="meta tight">
                <p><img className='logo' src={'/img/' + meta.iconUrl} alt={meta.symbol} /></p>
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
    const [ address, module, struct ] = coinType.split('::'); // TODO move to library
    return <>
        <p>{shortenSuiAddress(address)}</p>
        <p>::{module}::{struct}</p>
    </>;
}
