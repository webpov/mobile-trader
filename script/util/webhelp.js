export const PS = {
  "fan": "",
  "guest": "name, attempts, totalAttempts, goodAttempts, trades, orders, mode, subscription, referral, eloWTL, href",
  "player": "name, attempts, totalAttempts, goodAttempts, trades, orders, mode, jwt, binancekeys, subscription, referral, eloWTL",
  "user": "",
}

export const qtyLookupTable = {
  'BTCUSDT': 3,'ETHUSDT': 4,'BNBUSDT': 4,'USDTUSDT': 4,'ADAUSDT': 4,'DOGEUSDT': 8,
  'XRPUSDT': 4,'DOTUSDT': 4,'LINKUSDT': 3,'FTMUSDT': 4,'UNIUSDT': 4,'SOLUSDT': 4,
};

export const priceLookupTable = {
  'BTCUSDT': 1,'ETHUSDT': 5,'BNBUSDT': 4,'USDTUSDT': 4,'ADAUSDT': 4,
  'DOGEUSDT': 8,'XRPUSDT': 4,'DOTUSDT': 4,'LINKUSDT': 3,'FTMUSDT': 4,
  'UNIUSDT': 4,'SOLUSDT': 4,
};

export const generalLookupTable = {
  'BTC': 1,'ETH': 5,'BNB': 4,'USDT': 4,'ADA': 4,'DOGE': 8,
  'XRP': 4,'DOT': 4,'LINK': 3,'FTM': 4,'UNI': 4,'SOL': 4,
};

export function getCryptoPriceDecimals(symbol) {
  return generalLookupTable[symbol] || 2;
}

export function computeHash(firstValue, secondValue, createHash) {
  const hash = createHash('sha256');
  hash.update(firstValue.toLowerCase().replace(" ", ""));
  hash.update(secondValue.toLowerCase().replace(" ", ""));
  const hash_digest = hash.digest('hex');
  return hash_digest
}

export function parseQuantity(symbol, quantity) {
  const qtydecimalPlaces = qtyLookupTable[symbol] || 2;
  return Number(parseFloat(`${quantity}`).toFixed(qtydecimalPlaces));
}

export function adjustOrderParams({ side, symbol, quantity, price }) {
  const pricedecimalPlaces = priceLookupTable[symbol.toUpperCase()] || 2;
  const adjustedQuantity = parseQuantity(symbol.toUpperCase(), quantity / price);
  const adjustedPrice = Number(parseFloat(`${price}`).toFixed(pricedecimalPlaces));

  return { quantity: adjustedQuantity, price: adjustedPrice };
}

export function adjustDerivativeOrderParams({ side, symbol, quantity, price }) {
  const pricedecimalPlaces = priceLookupTable[symbol.toUpperCase()] || 2;
  const adjustedQuantity = parseQuantity(symbol.toUpperCase(), quantity / price);
  const adjustedPrice = Number(parseFloat(`${price}`).toFixed(pricedecimalPlaces));
  const adjustedStopPrice = Number(parseFloat(`${price}`).toFixed(pricedecimalPlaces));

  return { quantity: adjustedQuantity, price: adjustedPrice, stopPrice: adjustedStopPrice };
}

export const directionLookup = {
  "NORTH": [-2, 0,  0],
  "SOUTH": [2, 0,  0],
  "EAST": [0,  0, -2],
  "WEST": [0, 0,  2],
}
export const monthsLookup = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
]

export const getUTCDateString = (scopeStart) => {
  let theDate = new Date(scopeStart)
  let getUTCFullYear = theDate.getUTCFullYear() // 👉️ 2022
  let getUTCMonth = theDate.getUTCMonth()// 👉️ 0
  let getUTCDate = theDate.getUTCDate() // 👉️ 15
  return `${getUTCFullYear} ${monthsLookup[getUTCMonth]}-${getUTCDate}`
}

export function shortWeb3Address(address)
{
  return address.substr(0,5)+"..."+address.substr(address.length-3,address.length)
}

export function signJWT(JWTMaker, dataset) {
  
  const JWT_SECRET = process.env.JWT_SECRET || ""
  const jwtPayload = { data: dataset }
  
  const the_jwt = JWTMaker.sign(jwtPayload, JWT_SECRET, { expiresIn: "7 days" }); 

  return the_jwt
}

export function parseTradingNews(news) {
  return {
    bitcoinPrice: !!news.bitcoinPrice ? parseInt(news.bitcoinPrice.split("|")[0]) : 0,
    bitcoinDominance: parseInt(news.bitcoinDominance),
    fearAndGreed: parseInt(news.fearAndGreed),
    totalMarketCap: parseInt(news.totalMarketCap.replace("T","")),
    cryptoVolume: parseInt(news.cryptoVolume.replace("B","")),
  }
}