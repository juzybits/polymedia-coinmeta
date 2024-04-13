import { allCoinMetas } from "@polymedia/coinmeta";
import "./styles/app.less";

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
        {/* <Footer /> */}
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
                <p>decimals: {meta.decimals}</p>
                <p>name: {meta.name}</p>
                <p>symbol: {meta.symbol}</p>
                <p>description: {meta.description}</p>
                <p>id: {meta.id}</p>
                <p>type: {meta.type}</p>
                <p><img src={'/img/' + meta.iconUrl} alt={meta.symbol} /></p>
            </div>
        ))}
    </div>
);
