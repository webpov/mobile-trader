import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import crypto from 'crypto';
import { computeHash } from '@/../script/util/webhelp';
import { fetchPlayerByHash, getSupabaseClient } from '@/../script/state/repository/webdk';
import { cookies } from "next/headers";
import { NextRequest } from 'next/server';

let SS_apikeypublic:string = process.env.EXCHANGE_PUBLIC_API_KEY || ""
let SS_apikeysecret:string = process.env.EXCHANGE_SECRET_API_KEY || ""

export async function GET(req : NextRequest ) {
  const url = new URL(req.url)
  
  const symbol = url.searchParams.get("symbol")

  // const body:any = await req.json()
  // const supabase = getSupabaseClient();

  // let {symbol, limit, recvWindow} = body
  // const { hash, pw } = body;
  let lengthlimit = 500
  const receivingWindow = 5000
  const timestamp = Date.now();

  let cookieKeyName = "publicSecretKey"  
  const cookieObject:any = cookies().get(cookieKeyName)

  if (!cookieObject || !cookieObject.value) {
    throw new Error('cookie key is undefined');
  }
  console.log("kekekekekkeekke", cookieObject)
  const binancekeys = cookieObject.value
  let apikeypublic: string = binancekeys.split(":")[0]
  let apikeysecret: string = binancekeys.split(":")[1]
  const apiKey = apikeypublic
  const apiSecret = apikeysecret

  
  if ((`${apiKey}${apiSecret}`).length !== 128) { throw new Error("Invalid keys") }

  const params = `symbol=${symbol}&limit=${lengthlimit}&recvWindow=${receivingWindow}&timestamp=${timestamp}`;

  if (!apiSecret) {
    throw new Error('apiSecret is undefined');
  }
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const options: https.RequestOptions = { hostname: 'api.binance.com', port: 443, method: 'GET',
    path: `/api/v3/myTrades?${params}&signature=${signature}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey
    }
  };

  const response = await fetch(`https://${options.hostname}${options.path}`, {
    method: options.method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey
    }
  });



  try {
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'An error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // return new Response(JSON.stringify({data:[]}), {
  //   status: 200,
  //   headers: { 'Content-Type': 'application/json' },
  // });













  // let wHash = computeHash(referral, pin, crypto.createHash)
  // let thePlayer = await fetchPlayerByHash(supabase, wHash)  
  

  // if ((`${apiKey}${apiSecret}`).length !== 128) { throw new Error("Invalid keys") }

  // const params = `symbol=${symbol}&limit=${lengthlimit}&recvWindow=${receivingWindow}&timestamp=${timestamp}`;

  // if (!apiSecret) {
  //   throw new Error('apiSecret is undefined');
  // }
  // const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  // const options: https.RequestOptions = { hostname: 'api.binance.com', port: 443, method: 'GET',
  //   path: `/api/v3/myTrades?${params}&signature=${signature}`,
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'X-MBX-APIKEY': apiKey
  //   }
  // };

  // const response = await fetch(`https://${options.hostname}${options.path}`, {
  //   method: options.method,
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'X-MBX-APIKEY': apiKey
  //   }
  // });



  // try {
  //   const data = await response.json();
  //   return new Response(JSON.stringify(data), {
  //     status: response.status,
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // } catch (error) {
  //   console.error(error);
  //   return new Response(JSON.stringify({ error: 'An error occurred.' }), {
  //     status: 500,
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }

}