import crypto from 'crypto';
import https from 'https';
import { createClient } from "@supabase/supabase-js"
import {
  PS,
  qtyLookupTable,
  priceLookupTable,
  generalLookupTable,
  getCryptoPriceDecimals,
} from '@/../script/util/webhelp'

export const DEFAULT_ALERT_REF = [["error",""],["warn",""],["wait",""],["success",""],["neutral",""]]

export const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  return supabase
}

/* EXCHANGE */
/************************************************************************************************************/
export function makeLimitOrder(
  { side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }, apiKey, apiSecret, callback) {
  const options = {
    hostname: 'api.binance.com',
    port: 443,
    path: '/api/v3/order',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey
    }
  };
  let _price = !!price ? price.toFixed(getCryptoPriceDecimals(symbol)) : 0
  if (!_price) {
    return null
  }  
  const params = (`symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}`+
    `&price=${_price}&recvWindow=${recvWindow}&timestamp=${timestamp}`
  )
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const data = `${params}&signature=${signature}`;  
  const req = https.request(options, (res) => {
    let result = '';
    res.on('data', (data) => {
      result += data;
    });
    res.on('end', (error) => {
      callback(JSON.parse(result));
    });
  });
  
  req.on('error', (err) => {
    callback(err);
  });
  
  req.write(data);
  req.end();
}
export function makeFuturesTrade(
  { side, symbol, quantity, leverage, price, stopPrice, recvWindow = 5000, timestamp = Date.now() },
  apiKey,
  apiSecret,
  callback
) {
  const options = {
    hostname: 'fapi.binance.com', // Use the futures API endpoint
    port: 443,
    path: '/fapi/v1/order',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey,
    },
  };
  let derivSide = side.toUpperCase()
  let stopPriceString = ``
  
  const params = `symbol=${symbol}&side=${derivSide}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&leverage=${leverage}&price=${price}${stopPriceString}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
  
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const data = `${params}&signature=${signature}`;

  const req = https.request(options, (res) => {
    let result = '';
    res.on('data', (data) => {
      result += data;
    });
    res.on('end', () => {
      callback(JSON.parse(result));
    });
  });

  req.on('error', (err) => {
      callback(err);
  });

  req.write(data);
  req.end();
}
export function closeAllFuturesOpenPositions(
  { symbol, recvWindow = 5000 }, // Removed the timestamp parameter here
  apiKey,
  apiSecret,
  callback
) {
  // Generate a valid timestamp within the recvWindow
  const timestamp = Date.now();
  const params = `symbol=${symbol}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const positionUrl = `/fapi/v2/positionRisk?${params}&signature=${signature}`;
  const tickerUrl = `/fapi/v1/ticker/price?symbol=${symbol}`;

  const positionOptions = {
    hostname: 'fapi.binance.com',
    port: 443,
    path: positionUrl,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey,
    },
  };

  const tickerOptions = {
    hostname: 'fapi.binance.com',
    port: 443,
    path: tickerUrl,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const positionPromise = new Promise((resolve, reject) => {
    const positionReq = https.request(positionOptions, (res) => {
      let result = '';
      res.on('data', (data) => {
        result += data;
      });
      res.on('end', () => {
        const openPositions = JSON.parse(result);
        if (openPositions.length === 0) {
          reject({ message: 'No open positions to close' });
        } else {
          resolve(openPositions);
        }
      });
    });

    positionReq.on('error', (err) => {
      reject(err);
    });

    positionReq.end();
  });

  const tickerPromise = new Promise((resolve, reject) => {
    const tickerReq = https.request(tickerOptions, (res) => {
      let result = '';
      res.on('data', (data) => {
        result += data;
      });
      res.on('end', () => {
        const tickerData = JSON.parse(result);
        if (tickerData.price) {
          resolve(parseFloat(tickerData.price));
        } else {
          reject({ message: 'Failed to fetch ticker data' });
        }
      });
    });

    tickerReq.on('error', (err) => {
      reject(err);
    });

    tickerReq.end();
  });

  Promise.all([positionPromise, tickerPromise])
    .then(([openPositions, currentPrice]) => {
      // Iterate through open positions and create market orders to close them
      openPositions.forEach((position) => {
        const closeParams = {
          symbol: position.symbol,
          side: position.positionAmt > 0 ? 'SELL' : 'BUY', // Close with opposite side
          quantity: Math.abs(position.positionAmt), // Use the absolute position amount
          price: currentPrice, // Set the current price for the close order
          timestamp,
        };
        // Place market orders to close the open positions
        makeFuturesTrade(closeParams, apiKey, apiSecret, callback);
      });
    })
    .catch((err) => {
      callback(err);
    });
}

/* SUPABASE */
/************************************************************************************************************/
export async function fetchPlayerByHref(supabase, href_input) {
  const { data: existingStart } = await supabase.from('player').select(PS.guest)
    .match({ href: href_input }).single();
  return existingStart;
}

export async function fetchPlayerByHash(supabase, hash_input) {
  const { data: existingStart } = await supabase.from('player').select(PS.player)
    .match({ hash: hash_input }).single();
  return existingStart;
}

export async function postAddOrder(supabase, playerHash, orders_input) {
  const { data: removeattempt, error:error_removeattempt } = await supabase.from('player')
    .update({orders: orders_input, mode: 1,}).match({ hash: playerHash }).single()
  return !error_removeattempt
}

export async function addVirtualOrder(supabase, playerObj, playerHash, orderObj) {
  try {
    let orders_input = (playerObj.orders || "") + JSON.stringify(orderObj)+"&&&"
    return await postAddOrder(supabase, playerHash, orders_input, )
  } catch (error) {
    return null
  }
}

export async function deleteOrders(supabase, playerHash) {
  const { data: removeattempt, error:error_removeattempt } = await supabase.from('player')
    .update({orders: null, mode: 0,}).match({ hash: playerHash }).single()
  return !error_removeattempt
}

export async function writeSummaryIfAllowed(supabase, dailySummary, playerHash) {
  try {
    let readPlayer = await fetchPlayerByHash(supabase, playerHash)
    if (!readPlayer) {
      throw new Error("no found")
    }
    
    return await writeSummary(supabase, dailySummary, )
  } catch (error) {
    return null
  }
}
export async function writeSummary(supabase, dailySummary) {
  dailySummary.created_at = new Date();
  const { data: addattempt, error:error_addattempt } = await supabase.from('dailytrend')
    .insert(dailySummary).single()
    
  return !error_addattempt
}


module.exports = {
  DEFAULT_ALERT_REF,
  fetchPlayerByHref,
  fetchPlayerByHash,
  postAddOrder,
  addVirtualOrder,
  deleteOrders,
  makeLimitOrder,
  writeSummary,
  writeSummaryIfAllowed,
  getSupabaseClient,
  getCryptoPriceDecimals,
  makeFuturesTrade,
  closeAllFuturesOpenPositions,
  qtyLookupTable,
  priceLookupTable,
  generalLookupTable,
}

  // if (apiKey === "user") {
  //   const chatId = process.env.TELEGRAM_CHAT_ID;
  //   const token = process.env.TELEGRAM_BOT_TOKEN;

  //   // const message = `Demo API Key @${chatId} | w${token} \n\n\n\n  used to place an order:\nSide: ${side}\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: ${price}\n`;
  //   // const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`;
  //   // https.get(url);
  //   callback(false);
  //   return;
  // }
