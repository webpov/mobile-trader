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
      try {
        const url = `https://api.binance.com/api/v3/klines?interval=${timeframe}&symbol=${symbol}`;
        // You can add more query parameters like startTime if needed
        // For example: url += `&startTime=${startUnixDate}`;

        const response = await fetch(url);
        const candlesData = await response.json();
        return { symbol, data: candlesData };
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
      } catch (e) {
        console.log(`Fetch failed for symbol ${symbol}`);
        // Return a default value (like an empty array or a predefined object) if fetch fails
        return { symbol, data: [] }; // Returning an empty array as the default value
      }
    });

    const bulkCandles = await Promise.all(candlePromises);

    return bulkCandles;
  } catch (e) {
    console.log("FETCH FAILED");
    return null; // General error handling for the entire function
  }
};

export const getTickerPrices = async (symbols = ["BTCUSDT"]) => {
  try {
    const pricePromises = symbols.map(async (symbol) => {
      try {
        const spotSymbol = symbol;
        const spotPriceResponse = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${spotSymbol}`);
        const spotPriceData = await spotPriceResponse.json();

        return {
          symbol: spotSymbol,
          spotPrice: parseFloat(spotPriceData.price)
        };
      } catch (e) {
        console.log(`Fetch failed for symbol ${symbol}`);
        return {
          symbol: symbol,
          spotPrice: 0 // Return 0 if fetch fails
        };
      }
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
      latestUnix: 0,
      oldestUnix: 0,
      closingPrices: [],
      lastWeeklyOpen: 0,
      startOfMonthOpen: 0,
    }
  }

  let theLastIndex = priceList.length < 500 ? priceList.length - 1 : 499;
  let latestUnix = parseInt(priceList[theLastIndex][0]);
  let oldestUnix = parseInt(priceList[0][0]);
  const closingPrices = priceList.map((item) => parseFloat(item[4]));
  const lastOpen = parseFloat(priceList[theLastIndex][1]);
  const lastClose = parseFloat(priceList[theLastIndex][4]);
  const dailyDiff = (lastClose - lastOpen) / lastClose * 100;

  let lastWeeklyOpen = 0;
  let startOfMonthOpen = 0;
  let currentMonth = new Date(priceList[theLastIndex][0] * 1000).getMonth();

  lastWeeklyOpen = getLastWeeklyOpen(priceList);
  startOfMonthOpen = getStartOfMonthOpen(priceList);

  return {
    latestUnix,
    oldestUnix,
    closingPrices,
    dailyDiff: parseInt(Math.round(dailyDiff * 100)),
    lastOpen,
    lastClose,
    lastWeeklyOpen,
    startOfMonthOpen,
  }
}

const getLastWeeklyOpen = (priceList) => {
  // Find the date of the last Monday
  const findLastMonday = (date) => {
    let lastMonday = new Date(date);
    // Adjust to the previous Monday
    lastMonday.setDate(date.getDate() - ((date.getDay() + 7) % 7));
    return lastMonday;
  }

  let theLastIndex = priceList.length < 500 ? priceList.length - 1 : 499;
  let latestUnix = parseInt(priceList[theLastIndex][0]);
  let latestDate = new Date(latestUnix);
  let lastMonday = findLastMonday(latestDate);
  
  for (let i = theLastIndex; i >= 0; i--) {
    let itemDate = new Date(parseInt(priceList[i][0]));
    // Check if the date is the same as the last Monday
    if (itemDate.setHours(0, 0, 0, 0) === lastMonday.setHours(0, 0, 0, 0)) {
      return parseFloat(priceList[i][1]);
    }
  }
  return 0; // Return 0 if not found
};

const getStartOfMonthOpen = (priceList) => {
  let theLastIndex = priceList.length - 1
  let latestUnix = parseInt(priceList[theLastIndex][0]);
  let currentMonth = new Date(latestUnix).getMonth();

  for (let i = theLastIndex; i >= 0; i--) {
    const theDate = new Date(parseInt(priceList[i][0]))
    let itemMonth = theDate.getMonth();
    let itemDay = theDate.getDate();

    if (itemMonth === currentMonth && itemDay === 1) {
      console.log("priceList[i][1]", priceList[i])
      if (!!priceList[i-1]) {
        return parseFloat(priceList[i-1][1]);
      } else {
        return parseFloat(priceList[i][1]);
      }
    }
  }
  
  return 0; // Return 0 if not found
};
