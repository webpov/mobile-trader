
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
    // if (!parsedRes.data) {
    //   return
    // }
    // if (!parsedRes.data ) {
    //   return
    // }
    // if (!!parsedRes.data && !!parsedRes.data.data && !parsedRes.data.data.length) {
    //   return
    // }
  // alert("Success!")
  return parsedRes //.data
}
