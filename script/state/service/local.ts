
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
  // console.log("requestRes", requestRes, requestRes.status)
}
  
export const getTradeLogs = async (symbol:string) => {
  const requestRes:any = await fetch('/api/order/logs?symbol='+symbol)
    // console.log("requestRes 1111111", requestRes )
    if (requestRes.status > 300) {
    return
  }
  const parsedRes = await requestRes.json()
    // console.log("requestRes", parsedRes )
    // if (!parsedRes.data) {
    //   return
    // }
    // console.log("parsedRes", parsedRes )
    // if (!parsedRes.data ) {
    //   return
    // }
    // if (!!parsedRes.data && !!parsedRes.data.data && !parsedRes.data.data.length) {
    //   return
    // }
  // alert("Success!")
  // console.log("parsedRes", parsedRes, parsedRes.data)
  return parsedRes //.data
}
