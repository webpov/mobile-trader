
export const updatePublicSecretKey = async (hash:string, keys:string) => {
  const requestRes = await fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify({
      hash, keys
    })
  })
  if (requestRes.status > 300) {
    return
  }
  alert("Success!")
}
  
export const getTradeLogs = async (symbol:string) => {
  const requestRes:any = await fetch('/api/order/logs?symbol='+symbol)
    if (requestRes.status > 300) {
    return
  }
  const parsedRes = await requestRes.json()
  return parsedRes
}

export const getFearNGreed = async () => {
  const requestRes:any = await fetch('https://api.alternative.me/fng/')
    if (requestRes.status > 300) {
    return
  }
  const parsedRes = await requestRes.json()
  return parsedRes
}
export async function getTotalMarketCap() {
  const apiUrl = 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest';

  try {
    const response = await fetch("/api/market", {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const totalMarketCap = data

    console.log('Total Cryptocurrency Market Cap:', totalMarketCap);
    return totalMarketCap;
  } catch (error:any) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

// export async function getTotalMarketCap(apiKey:string) {
//   const apiUrl = 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest';

//   try {
//     const response = await fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'X-CMC_PRO_API_KEY': apiKey,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     const totalMarketCap = data.data.quote.USD.total_market_cap;

//     console.log('Total Cryptocurrency Market Cap:', totalMarketCap);
//     return totalMarketCap;
//   } catch (error:any) {
//     console.error('Error fetching data:', error.message);
//     throw error;
//   }
// }

