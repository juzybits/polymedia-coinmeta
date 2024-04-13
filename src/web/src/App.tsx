import { data } from "@polymedia/coinmeta";
import { useEffect } from "react";
import "./styles/app.less";

export const App: React.FC = () =>
{
    useEffect(() => {
        (() => {
            console.log(data);
        })();
    }, []);

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
}

const PageHome: React.FC = () => {
    return (
    <div id="page-content">

        <h1>Polymedia <span className="rainbow">CoinMeta</span></h1>

        <br />
        <h2>Sui CoinMetadata for various Coin&lt;T&gt;</h2>

    </div>
    );
}

const Header: React.FC = () =>
{
    return <header>
        <h1>
            <img alt="polymedia" src="https://assets.polymedia.app/img/all/logo-nomargin-transparent-512x512.webp" className="logo" />
            CoinMeta
        </h1>
    </header>;
}
