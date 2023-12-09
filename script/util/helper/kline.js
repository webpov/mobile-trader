import { ShortHardcodedKLines } from "@/../script/constant/klines"

export const getCurrentPrices = async (symbol="BTCUSDT") => {
  try {
    const spotSymbol = symbol ; // Assuming the spot symbol is named based on the provided symbol
    const futureSymbol = symbol ; // Assuming the future symbol is named based on the spot symbol

    const [spotPrice, futurePrice] = await Promise.all([
      fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${spotSymbol}`),
      fetch(`https://fapi.binance.com/fapi/v1/ticker/price?symbol=${futureSymbol}`)
    ]);

    const [spotPriceData, futurePriceData] = await Promise.all([
      spotPrice.json(),
      futurePrice.json()
    ]);

    return {
      spotPrice: parseFloat(spotPriceData.price),
      futurePrice: parseFloat(futurePriceData.price)
    };
  } catch (e) {
    console.log("FETCH FAILED");
    return null;
  }
};
export const getBulkCandles = async (symbols = ["BTCUSDT"], timeframe = "1d", startUnixDate) => {
  try {
    const candlePromises = symbols.map(async (symbol) => {
      const url = `https://api.binance.com/api/v3/klines?interval=${timeframe}&symbol=${symbol}`;
      
      // You can add more query parameters like startTime if needed
      // For example: url += `&startTime=${startUnixDate}`;

      const response = await fetch(url);
      const candlesData = await response.json();
      return {symbol,data:candlesData}
      // return {
      //   symbol: symbol,
      //   candles: candlesData.map((candle) => ({
      //     openTime: candle[0],
      //     open: parseFloat(candle[1]),
      //     high: parseFloat(candle[2]),
      //     low: parseFloat(candle[3]),
      //     close: parseFloat(candle[4]),
      //     volume: parseFloat(candle[5]),
      //     closeTime: candle[6],
      //   })),
      // };
    });

    const bulkCandles = await Promise.all(candlePromises);

    return bulkCandles;
  } catch (e) {
    console.log("FETCH FAILED");
    return null;
  }
};
export const getTickerPrices = async (symbols = ["BTCUSDT"]) => {
  try {
    const pricePromises = symbols.map(async (symbol) => {
      const spotSymbol = symbol;
      const spotPriceResponse = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${spotSymbol}`);
      const spotPriceData = await spotPriceResponse.json();

      return {
        symbol: spotSymbol,
        spotPrice: parseFloat(spotPriceData.price)
      };
    });

    const tickerPrices = await Promise.all(pricePromises);

    return tickerPrices;
  } catch (e) {
    console.log("FETCH FAILED");
    return null;
  }
};

export const getPricesList = async (timeframe, requestToken, startUnixDate) => {
    let t = timeframe || "15m"
    let theToken = requestToken || "BTCUSDT"
  // let startUnixDate = getRandomUnixDate()
    // let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&startTime=${startUnixDate}&symbol=`
    let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&symbol=`
    urlBase += theToken
    let theList = null
    try {
      const theListRes = await fetch(urlBase)
      theList = await theListRes.json()
    } catch (e) {
      console.log("FETCH FAILED")
      theList = ShortHardcodedKLines
    }
  
    return theList
  }
  
export const getFuturesPricesList = async (timeframe, requestToken, startTime) => {
  const t = timeframe || "15m";
  const theToken = requestToken || "BTCUSDT"; // Replace with the appropriate futures trading pair symbol.

  const urlBase = `https://fapi.binance.com/fapi/v1/klines?interval=${t}&symbol=${theToken}&startTime=${startTime || ''}`;
  
  let theList = null;
  try {
    const theListRes = await fetch(urlBase);
    theList = await theListRes.json();
  } catch (e) {
    console.log("FETCH FAILED");
    // Handle the error appropriately.
  }

  return theList;
}
export const getRelevantChartData = (priceList) => {
    if (!priceList) {
      return {
        latestUnix:0,
        oldestUnix:0,
        closingPrices:[],
        volumeList:[], // Include volume in the returned object
    
      }
    }
  let theLastIndex = priceList.length < 500 ? priceList.length-1 : 499
  let latestUnix = parseInt( priceList[theLastIndex][0] )
  let oldestUnix =  parseInt(priceList[0][0])
  const volumeList = priceList.map((item) => parseFloat(item[5])); // Extract volume data


  // s__liveUnix(latestUnix - 2)
  // s__diffUnix(oldestUnix - latestUnix)
  
  const closingPrices = priceList.map((item) => parseFloat(item[4]));
  // s__pricesList(closingPrices)
  return {
    latestUnix,
    oldestUnix,
    closingPrices,
    volumeList, // Include volume in the returned object

  }
}

export const getLongTermData = (priceList) => {
  if (!priceList || (!!priceList && !priceList.length)) {
    return {
      latestUnix:0,
      oldestUnix:0,
      closingPrices:[],
      volumeList:[], // Include volume in the returned object
  
    }
  }
  let theLastIndex = priceList.length < 500 ? priceList.length-1 : 499
  let latestUnix = parseInt( priceList[theLastIndex][0] )
  let oldestUnix =  parseInt(priceList[0][0])
  // const volumeList = priceList.map((item) => parseFloat(item[5])); // Extract volume data


  // s__liveUnix(latestUnix - 2)
  // s__diffUnix(oldestUnix - latestUnix)

  const closingPrices = priceList.map((item) => parseFloat(item[4]));
  // s__pricesList(closingPrices)

  
  const lastOpen = priceList[theLastIndex][1]
  const lastClose = priceList[theLastIndex][4]
  const dailyDiff = (lastClose - lastOpen) / lastClose * 100

  return {
    latestUnix,
    oldestUnix,
    closingPrices,

    dailyDiff: parseInt(Math.round(dailyDiff * 100)),
    lastOpen,
    lastClose,
    // volumeList, // Include volume in the returned object

  }
}
