type NetworkName = "mainnet" | "testnet";
type InputCoin = {
    type: string,
    image: string,
};

export const inputCoins = new Map<NetworkName, InputCoin[]>([
    ["mainnet",
    [
        {   // Sui
            type: "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
            image: "https://suivision.xyz/images/coins/sui.svg",
        },
        {   // USDC
            type: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
            image: "https://suivision.xyz/images/coins/usdc.png",
        },
        {   // Suiswap Token
            type: "0x361dd589b98e8fcda9a7ee53b85efabef3569d00416640d2faa516e3801d7ffc::TOKEN::TOKEN",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/suiswap.png/public",
        },
        {   // Cetus Token
            type: "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
            image: "https://suivision.xyz/images/coins/cetus.webp",
        },
        {   // SPT
            type: "0xb779486cfd6c19e9218cc7dc17c453014d2d9ba12d2ee4dbb0ec4e1e02ae1cca::spt::SPT",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/seapad.png/public",
        },
        {   // Turbos
            type: "0x5d1f47ea69bb0de31c313d7acf89b890dbb8991ea8e03c6c355171f84bb1ba4a::turbos::TURBOS",
            image: "https://suivision.xyz/images/projects/turbos.svg",
        },
        {   // USDT
            type: "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
            image: "https://suivision.xyz/images/coins/usdt.svg",
        },
        {   // SUIZ
            type: "0xda79c0756319ea12c1679cb0d2c9fa85c66c0c724f45b7d1af0f7ed79fe4573d::suiz::SUIZ",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/suizzle.png/public",
        },
        {   // Bucket USD
            type: "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/buck.svg/public",
        },
        {   // REAP
            type: "0xde2d3e02ba60b806f81ee9220be2a34932a513fe8d7f553167649e95de21c066::reap_token::REAP_TOKEN",
            image: "https://images.releap.xyz/reap_token.jpeg",
        },
        {   // Volo Staked SUI
            type: "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT",
            image: "https://suivision.xyz/images/coins/vsui.png",
        },
        {   // FUD
            type: "0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/fud.png/public",
        },
        {   // NAVX Token
            type: "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
            image: "https://suivision.xyz/images/coins/navx.png",
        },
        {   // haSUI
            type: "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI",
            image: "https://suivision.xyz/images/coins/hasui.png",
        },
        {   // Scallop
            type: "0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA",
            image: "https://vrr7y7aent4hea3r444jrrsvgvgwsz6zi2r2vv2odhgfrgvvs6iq.arweave.net/rGP8fARs-HIDcec4mMZVNU1pZ9lGo6rXThnMWJq1l5E",
        },
        {   // afSUI
            type: "0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI",
            image: "https://suivision.xyz/images/coins/afsui.svg",
        },
        {   // Sacabam
            type: "0x9a5502414b5d51d01c8b5641db7436d789fa15a245694b24aa37c25c2a6ce001::scb::SCB",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/sacabam.png/public",
        },
        {   // MOVE
            type: "0xd9f9b0b4f35276eecd1eea6985bfabe2a2bbd5575f9adb9162ccbdb4ddebde7f::smove::SMOVE",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/bluemove.png/public",
        },
        {   // SuiPad
            type: "0xe4239cd951f6c53d9c41e25270d80d31f925ad1655e5ba5b543843d4a66975ee::SUIP::SUIP",
            image: "https://suivision.xyz/images/projects/suipad.png",
        },
        {   // USDCbnb
            type: "0x909cba62ce96d54de25bec9502de5ca7b4f28901747bbf96b76c2e63ec5f1cba::coin::COIN",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/usdc.png/public",
        },
        {   // Suicune
            type: "0x8c47c0bde84b7056520a44f46c56383e714cc9b6a55e919d8736a34ec7ccb533::suicune::SUICUNE",
            image: "https://i.imgur.com/rmQPsBG.png",
        },
        {   // SUIA
            type: "0x1d58e26e85fbf9ee8596872686da75544342487f95b1773be3c9a49ab1061b19::suia_token::SUIA_TOKEN",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/suia.png/public",
        },
        {   // Wrapped Ether
            type: "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
            image: "https://suivision.xyz/images/coins/weth.png",
        },
        {   // cUSDCe
            type: "0x94e7a8e71830d2b34b3edaa195dc24c45d142584f06fa257b73af753d766e690::celer_usdc_coin::CELER_USDC_COIN",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/usdc.png/public",
        },
        {   // Aptos Coin
            type: "0x3a5143bb1196e3bcdfab6203d1683ae29edd26294fc8bfeafe4aaa9d2704df37::coin::COIN",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/aptos.png/public",
        },
        {   // FlowX
            type: "0x6dae8ca14311574fdfe555524ea48558e3d1360d1607d1c7f98af867e3b7976c::flx::FLX",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/flx.svg/public",
        },
        {   // Stork
            type: "0x3cf6e24398c526fd1e0c46e22d4c1f88e3f3c14ba3df6fdaa6dd6d4aab202736::storktoken::STORKTOKEN",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/stork.png/public",
        },
        {   // ovan suu
            type: "0x8b9dc9a32c2f5ae548cece17ca3e31bc0cda4bb505bcf8395c8351c76799cf24::suu::SUU",
            image: "https://i.imgur.com/5fChOAv.png",
        },
        {   // Vaporeon
            type: "0x84d155fb70aebcc1391bf497d8fc139154be745765dfec57faef4704f4112c79::vaporeon::VAPOREON",
            image: "https://i.ibb.co/bmG3krz/Vaporeon.png",
        },
        {   // LUCKYSTAR
            type: "0x202591744d54ee4f4af736ef3b8508f3d46d982c36747d9587032bd549122179::luck::LUCK",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/luck.svg/public",
        },
        {   // Simba the lonely lion
            type: "0x5d6881b68371f1d801ad93fb40d1cb130dd1975717170190207651b701938b72::simba::SIMBA",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/Simbathelonelylion.png/public",
        },
        {   // Wrapped Matic
            type: "0xdbe380b13a6d0f5cdedd58de8f04625263f113b3f9db32b3e1983f49e2841676::coin::COIN",
            image: "https://suivision.xyz/images/coins/wmatic.png",
        },
        {   // USDCsol
            type: "0xb231fcda8bbddb31f2ef02e6161444aec64a514e2c89279584ac9806ce9cf037::coin::COIN",
            image: "https://suivision.xyz/images/coins/usdc.png",
        },
        {   // Wrapped SOL
            type: "0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8::coin::COIN",
            image: "https://suivision.xyz/images/coins/wsol.png",
        },
        {   // Flame Token
            type: "0x247a6d271810efbe80943433e84b9360e2f976fce89e7c19dc680f5aae8738e2::flame::FLAME",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/flame.png/public",
        },
        {   // Wrapped BNB
            type: "0xb848cce11ef3a8f62eccea6eb5b35a12c4c2b1ee1af7755d02d7bd6218e8226f::coin::COIN",
            image: "https://suivision.xyz/images/coins/wbnb.png",
        },
        {   // Suizuki
            type: "0x8d84e98518cab8bd2941cfb23fa78ad0538ed07ba8887e451f0b93380d479908::zuki::ZUKI",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/Suizuki.png/public",
        },
        {   // Burrial
            type: "0x6db9a7bb22829898fd281879778a175120ebfc77eafc1f8ee341654cfc3f8dc2::burry::BURRY",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/burry.jpg/public",
        },
        {   // Poseidollar
            type: "0x4fc3949a4a8fe3ad9c75cec9724ff2b2d8520506b6129c9d8f0fcc2a1e4a8880::pdo::PDO",
            image: "https://ipfs.io/ipfs/bafkreiapkqzmovj53bn3dnh53sdjaiitzdg7hoiq5y5fq42zier4ll44xq",
        },
        {   // Suiba Inu
            type: "0xed4504e791e1dad7bf93b41e089b4733c27f35fde505693e18186c2ba8e2e14b::suib::SUIB",
            image: "https://suibacoin.com/suiba.svg",
        },
        {   // cUSDTe
            type: "0x94e7a8e71830d2b34b3edaa195dc24c45d142584f06fa257b73af753d766e690::celer_usdt_coin::CELER_USDT_COIN",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/usdt-new.png/public",
        },
        {   // USDCpol
            type: "0xcf72ec52c0f8ddead746252481fb44ff6e8485a39b803825bde6b00d77cdb0bb::coin::COIN",
            image: "https://suivision.xyz/images/coins/usdc.png",
        },
        {   // HOMITOKEN
            type: "0xf6e7fcac642280ba427bc1b3e158a169fa0624cad36cd79fc931aba3502880a5::homi::HOMI",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/homicoin.png/public",
        },
        {   // Pikasui
            type: "0x4b8da3a458be156af7bd17c0e754c703d6f7318fcfb2cf2a293d39c080a06692::pika::PIKA",
            image: "https://i.imgur.com/22I33LL.png",
        },
        {   // XFlowX
            type: "0x65ed6d4e666fcbc1afcd9d4b1d6d4af7def3eeeeaa663f5bebae8101112290f6::xflx::XFLX",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/xflx.svg/public",
        },
        {   // Pearl
            type: "0x4e56b39acd75721999cf833062dfb77b1d51e749b02d90f049a5688e21919a64::prl::PRL",
            image: "https://ipfs.io/ipfs/bafkreictaewmj4tunhkcejcnismyrj6s7rxggusircu6hyiaora67uxjhu",
        },
        {   // KIMCHI
            type: "0xb6baa75577e4bbffba70207651824606e51d38ae23aa94fb9fb700e0ecf50064::kimchi::KIMCHI",
            image: "https://assets.kimchi.gg/CoinLogo.png",
        },
        {   // Sudo LP Token
            type: "0xc44d97a4bc4e5a33ca847b72b123172c88a6328196b71414f32c3070233604b2::slp::SLP",
            image: "https://arweave.net/_SEJoeyOw0uVJbu-kcJZ1BFP1E5j4OWOdQnv4s51rU0",
        },
        {   // Wrapped AVAX
            type: "0x1e8b532cca6569cab9f9b9ebc73f8c13885012ade714729aa3b450e0339ac766::coin::COIN",
            image: "https://suivision.xyz/images/coins/wavax.png",
        },
        {   // Wrapped Fantom
            type: "0x6081300950a4f1e2081580e919c210436a1bed49080502834950d31ee55a2396::coin::COIN",
            image: "https://suivision.xyz/images/coins/wfantom.png",
        },
        {   // Wrapped BTC
            type: "0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN",
            image: "https://suivision.xyz/images/coins/wbtc.png",
        },
        {   // ISSP Coin
            type: "0xd0ea9bc91c3855e9b58a51cd55e8455b37bd5c75f70b4d6e97e54b55c4ba4ae8::issp::ISSP",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/$ISSP_logo_200200-Bob.png/public",
        },
        {   // USDCarb
            type: "0xe32d3ebafa42e6011b87ef1087bbc6053b499bf6f095807b9013aff5a6ecd7bb::coin::COIN",
            image: "https://suivision.xyz/images/coins/usdc.png",
        },
        {   // LAMBALL
            type: "0xcfd2bc58d96eb86bc48110e1cfdeebb5b9531317c2203cb415dfd44fab587cf0::lamb::LAMB",
            image: "https://i.imgur.com/UKynM3J.jpeg",
        },
        {   // Tails Exp
            type: "0x37816d28c34cc0df82655ca97b3f066112a5f3c202cbb4aaa76c8af54e779750::tails_exp::TAILS_EXP",
            image: "https://raw.githubusercontent.com/Typus-Lab/typus-asset/main/assets/TEXP.svg",
        },
        {   // Celo native asset
            type: "0xa198f3be41cda8c07b3bf3fee02263526e535d682499806979a111e88a5a8d0f::coin::COIN",
            image: "https://suivision.xyz/images/coins/celo.png",
        },
        {   // Wen Dexscreener
            type: "0x9aff4aa4dd737a71dc374c03deaec1e11b20a51a46e64f4605e95cc3c966f272::wend::WEND",
            image: "https://ipfs.io/ipfs/bafkreibhmmxkynepjlechfvmkpcps35f2ayagaypg5gnqd4bnbeblyvdjm",
        },
        {   // USDCavax
            type: "0xe596782fbaebef51ae99ffac8731aed98a80642b9dc193ed659c97fbc2cc0f84::coin::COIN",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/usdc.png/public",
        },
        {   // HammerHead
            type: "0x996374e9df45796fe8112663a37272af4d33e7531c67d21aaa5cc93b3d1ded5c::hhs::HHS",
            image: "https://magenta-protestant-falcon-171.mypinata.cloud/ipfs/QmNb1caN8xkkdGJEqLa3wuqtF5wS7AwLjpWk3bD1Uh7Ue8",
        }
    ]],
    ["testnet",
    [
        {   // FUD
            type: "0x1fe2bdb8d9dba5bb2f8f1d987fcb9ab53d0f38b8a42445ebed736d6708ca59d6::fud::FUD",
            image: "https://imagedelivery.net/cBNDGgkrsEA-b_ixIp9SkQ/fud.png/public",
        }
    ]],
]);
