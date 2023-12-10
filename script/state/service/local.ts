
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
