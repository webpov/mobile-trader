import { useState } from "react"
export const zeroPad = (value:any, length:any)=>{
  return `${value}`.padStart(length, '0');
}
export const parseDateTimeString = (_theDate:any)=>{
  let theDate = new Date(_theDate.toUTCString())
  return (
      `${theDate.getFullYear()}-${zeroPad(theDate.getMonth()+1,2)}-`+
      `${zeroPad(theDate.getDate(),2)}`+
      `T`+
      `${zeroPad(theDate.getHours(),2)}:${zeroPad(theDate.getMinutes(),2)}`
  )
}
export const mapTradeHistory = (anItem:any) => {
  return {...anItem,...{
      side: anItem.isBuyer ? "Buy" : "Sell",
      price: parseDecimals(anItem.price),
      qty: "$"+parseDecimals(parseFloat(anItem.price)*parseFloat(anItem.qty)),
      time: parseDateTimeString(new Date(anItem.time/1)),
  }}
}
export const parseDecimals = (x:number) => {
  x = parseFloat(`${x}`)
  if (x == 0) return 0
  if (x < 0.000001)
  {
    return 0
  }
  if (x < 0.00001)
  {
    return x.toFixed(8)
  }
  if (x < 0.0001)
  {
    return x.toFixed(7)
  }
  if (x < 0.001)
  {
    return x.toFixed(6)
  }
  if (x < 0.01)
  {
    return x.toFixed(5)
  }
  if (x < 0.1)
  {
    return x.toFixed(4)
  }
  if (x < 1)
  {
    return x.toFixed(3)
  }
  if (x < 50)
  {
    return x.toFixed(2)
  }
  if (x < 100)
  {
    return x.toFixed(1)
  }
  return parseInt(`${x}`)
};

export const useOrderHistory = (publicSecretHash:string) => {
  const [orderLogs, s__orderLogs] = useState([])


  
  const refetchLogs = async () => {
    if (orderLogs.length > 0) {
      s__orderLogs([])
      return
    }

    
    let pwPrompt = prompt('Enter password')
    if ( !pwPrompt) { return }
    

    let pair = "BTCUSDT"
    const theListRes = await fetch(`/api/order/history/`,{
      method:"POST",
      body:JSON.stringify({
            hash: publicSecretHash,
            pw:pwPrompt,
          // binancePublic,
          // binanceSecret,
      })
    })
    try {

      let theList = await theListRes.json()
      theList = theList.map((anItem:any, index:any) => {
        return {...anItem,...{
            side: anItem.isBuyer ? "Buy" : "Sell",
            price: parseDecimals(anItem.price),
            qty: "$"+parseDecimals(parseFloat(anItem.price)*parseFloat(anItem.qty)),
            time: parseDateTimeString(new Date(anItem.time/1)),
        }}
      }).reverse()
      s__orderLogs(theList)

    } catch (e:unknown) {
      alert("error")
    }
    // alert()
  }

  return {
    orderLogs,
    refetchLogs,
  }
}