
export const TIERPACK_COLORS = [
    ["#c8ffda", "#78fe8d"], //  (top10)
    ["#ffcfaf", "#d59872"], //  (all\ndefi)
    ["#fdc39b", "#ffa519"], //  (Layer 1)
    ["#d1e0ff", "#9fb8e9"], // a16z
    ["#b5feb5", "#58ff1a"], //  (Smart Contract)
    ["#f2a4ff", "#fc62ea"], //  (topdefi)
    ["#f4ffcc", "#f1ff08"], //  (dex)
    ["#84c5f2", "#1ba7ff"], //  (ai)
    ["#aef5cf", "#2ce3c3"], //  (liquidity)
    ["#f6c1a1", "#cc671c"], //  (Top DeFi)
    ["#fb70ff", "#bb20f2"], //  (gov tokens)
    ["#c8ffda", "#78fe8d"], //  (layer2)
    ["#ffcfaf", "#d59872"], //  (gamefi)
    ["#94ff9a", "#34ff2a"], //  (metaverse)
    ["#c9f9ff", "#77bbcf"], //  (privacy)
    ["#fd8287", "#ed1237"], //  (storage)
    ["#93f7ff", "#83d0ff"], //  (oracle)
]

export const TIERPACK_NAMES = [
    "top10",
    "all\ndefi",
    "layer1",
    "a16z\nholdings",
    "smart\ncontract",
    "topdefi",
    "dex",
    "ai",
    "liquidity",
    "memes",
    "gov\ntokens",
    "layer2",
    "gamefi",
    "meta\nverse",
    "privacy",
    "storage→",
    "oracle→",
]

export const TIERPACK_LINKS = [
    `/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%7D&c0=%7B%22symbol%22%3A%22RUNEUSDT%22%7D&b1=%7B%22symbol%22%3A%22LINKUSDT%22%7D&d0=%7B%22symbol%22%3A%22SOLUSDT%22%7D&b1=%7B%22symbol%22%3A%22AAVEUSDT%22%7D&d1=%7B%22symbol%22%3A%22FILUSDT%22%7D&e0=%7B%22symbol%22%3A%22GRTUSDT%22%7D&e1=%7B%22symbol%22%3A%22RNDRUSDT%22%7D&e2=%7B%22symbol%22%3A%22TIAUSDT%22%7D`, // top10
    `/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%7D&b0=%7B%22symbol%22%3A%22ADAUSDT%22%7D&b1=%7B%22symbol%22%3A%22UNIUSDT%22%7D&c0=%7B%22symbol%22%3A%22AXSUSDT%22%7D&c1=%7B%22symbol%22%3A%22AAVEUSDT%22%7D&d0=%7B%22symbol%22%3A%22SANDUSDT%22%7D&d1=%7B%22symbol%22%3A%22MKRUSDT%22%7D&e0=%7B%22symbol%22%3A%22FETUSDT%22%7D&e1=%7B%22symbol%22%3A%22RNDRUSDT%22%7D&e2=%7B%22symbol%22%3A%22TIAUSDT%22%7D`, // all\ndefi
    `/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%7D&b0=%7B%22symbol%22%3A%22ADAUSDT%22%7D`, // Layer 1 (L1)
    `/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%7D&b0=%7B%22symbol%22%3A%22XRPUSDT%22%7D&b1=%7B%22symbol%22%3A%22UNIUSDT%22%7D&c0=%7B%22symbol%22%3A%22ICPUSDT%22%7D&c1=%7B%22symbol%22%3A%22FILUSDT%22%7D&d0=%7B%22symbol%22%3A%22FLOWUSDT%22%7D&d1=%7B%22symbol%22%3A%22MKRUSDT%22%7D&e0=%7B%22symbol%22%3A%22ROSEUSDT%22%7D&e1=%7B%22symbol%22%3A%22SUIUSDT%22%7D&e2=%7B%22symbol%22%3A%22ARUSDT%22%7D`, // a16z
    `/?a0=%7B%22symbol%22%3A%22XRPUSDT%22%7D&a1=%7B%22symbol%22%3A%22LTCUSDT%22%7D&b0=%7B%22symbol%22%3A%22DOTUSDT%22%7D`, // Smart Contract Platform
    `/?a0=%7B%22symbol%22%3A%22LINKUSDT%22%7D&a1=%7B%22symbol%22%3A%22AAVEUSDT%22%7D&b0=%7B%22symbol%22%3A%22COMPUSDT%22%7D`, // DeFi
    `/?a0=%7B%22symbol%22%3A%22UNIUSDT%22%7D&a1=%7B%22symbol%22%3A%22SOLUSDT%22%7D&b0=%7B%22symbol%22%3A%22RUNEUSDT%22%7D`, // Decentralized Exchange (DEX)
    `/?a0=%7B%22symbol%22%3A%22RNDRUSDT%22%7D&a1=%7B%22symbol%22%3A%22TIAUSDT%22%7D&b0=%7B%22symbol%22%3A%22FETUSDT%22%7D`, // AI
    `/?a0=%7B%22symbol%22%3A%22BNBUSDT%22%7D&a1=%7B%22symbol%22%3A%22CAKEUSDT%22%7D&b0=%7B%22symbol%22%3A%22UNIUSDT%22%7D`, // Liquidity
    `/?a0=%7B%22symbol%22%3A%22DOGEUSDT%22%7D&a1=%7B%22symbol%22%3A%22SHIBUSDT%22%7D&b0=%7B%22symbol%22%3A%22AKITAUSDT%22%7D`, // Memes
    `/?a0=%7B%22symbol%22%3A%22AAVEUSDT%22%7D&a1=%7B%22symbol%22%3A%22UNIUSDT%22%7D&b0=%7B%22symbol%22%3A%22MKRUSDT%22%7D`, // Governance
    `/?a0=%7B%22symbol%22%3A%22MATICUSDT%22%7D&a1=%7B%22symbol%22%3A%22DOTUSDT%22%7D&b0=%7B%22symbol%22%3A%22XDAIUSDT%22%7D`, // Layer 2 (L2)
    `/?a0=%7B%22symbol%22%3A%22MANAUSDT%22%7D&a1=%7B%22symbol%22%3A%22AXSUSDT%22%7D&b0=%7B%22symbol%22%3A%22SANDUSDT%22%7D`, // GameFi
    `/?a0=%7B%22symbol%22%3A%22MANAUSDT%22%7D&a1=%7B%22symbol%22%3A%22AXSUSDT%22%7D&b0=%7B%22symbol%22%3A%22ENJUSDT%22%7D`, // Metaverse
    `/?a0=%7B%22symbol%22%3A%22XMRUSDT%22%7D&a1=%7B%22symbol%22%3A%22ETCUSDT%22%7D&b0=%7B%22symbol%22%3A%22ZECUSDT%22%7D`, // Privacy Coins
    `https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22FILUSDT%22%7D&a1=%7B%22symbol%22%3A%22ARBUSDT%22%7D&b0=%7B%22symbol%22%3A%22STORJUSDT%22%7D`, // Storage
    `https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22LINKUSDT%22%7D&a1=%7B%22symbol%22%3A%22GRTUSDT%22%7D&b0=%7B%22symbol%22%3A%22BANDUSDT%22%7D`, // Oracle
];
