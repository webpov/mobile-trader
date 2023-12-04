import { useEffect, useState } from "react"
import { getBulkCandles, getCurrentPrices, getFuturesPricesList, getLongTermData, getPricesList, getRelevantChartData, getTickerPrices } from "../helper/kline";

export default function useSyncedKLines({state,calls}:any) {
    const [pricesObj, s__pricesObj] = useState<any>()
    const [fuelPoints, s__fuelPoints] = useState<any>(0)

    const [ytdObj, s__ytdObj] = useState<any>()

    const [ltfList, s__ltfList] = useState<any>([])
    const [ltfClosingList, s__ltfClosingList] = useState<any>([])
    const [htfList, s__htfList] = useState<any>([])
    const [htfClosingList, s__htfClosingList] = useState<any>([])

    // const [fullmidtermList, s__fullmidtermList] = useState<any>([])
  const [isChartLoading, s__isChartLoading] = useState(false)
  const [delayMsecs, s__delayMsecs] = useState(5000)
  const [startRotationTime, s__startRotationTime] = useState(0); 

  const lowTimeframeUpdate = async () => {
    let futTermPricesList = await getPricesList(state.ltf, state.symbol)
    s__ltfList(futTermPricesList)
    let futTermPricesData = getRelevantChartData(futTermPricesList)
    s__ltfClosingList(futTermPricesData.closingPrices)
    // s__startRotationTime(futTermPricesData.latestUnix)
    // s__scopeStart(futTermPricesData.oldestUnix)
    // s__shorttermList(futTermPricesData.closingPrices)
    // s__futtermVolumeList(futTermPricesData.volumeList)
    // console.log(sceneState.ltfList, futTermPricesData)
    s__isChartLoading(false)
  }
  
    useEffect(() => {
      if (isChartLoading) {return}
      s__isChartLoading(true)
      // console.log("asdasd")
      triggerGetLastPrice();
      getYTDSummary()
      lowTimeframeUpdate()
    }, []);






    const triggerGetLastPrice = async () => {
      if (!state.favs) { return }
      if (!state.favs.length) { return }

      let pricesObj:any = {}
      let tokenList = state.favs.map((item:any)=>(item.symbol))
      // console.log("tokenList", tokenList)
      let currentData:any = await getTickerPrices(tokenList)
      currentData.map((item:any)=>{
        pricesObj[item.symbol] = item.spotPrice
      })
      // console.log("pricesObjpricesObj", pricesObj)
      s__pricesObj(pricesObj)
      // if (!!ltfList && ltfList.length == 500) {
      //   const newArray = [...ltfList];
      //   const diff = Math.abs(newArray[newArray.length - 1][4] - parseFloat(currentData.futurePrice))
      //   const timeDiff = startRotationTime + 60000 - Date.now() 
      //   const diffPercent = diff / currentData.futurePrice * 100
      //   if (diffPercent > 0.07 || timeDiff < 0) {
      //     s__startRotationTime(startRotationTime + 60000)
      //     await lowTimeframeUpdate()
      //     setTimerChartLoading()
      //   }
      // }
      // s__lastPrices(currentData)
    }



    const getYTDSummary = async () => {
      if (!state.favs) { return }
      if (!state.favs.length) { return }

      let ydtSummaryObj:any = {}
      let tokenList = state.favs.map((item:any)=>(item.symbol))
      // console.log("tokenList", tokenList)
      let currentYTDData:any = await getBulkCandles(tokenList)
      currentYTDData.map((item:any)=>{
        ydtSummaryObj[item.symbol] = {
          candles: item.data,
          output: getLongTermData(item.data)
        }
      })
      console.log("ydtSummaryObj", ydtSummaryObj)
      s__ytdObj(ydtSummaryObj)
      // console.log("ydtSummaryObjydtSummaryObj", ydtSummaryObj)
      // s__ydtSummaryObj(ydtSummaryObj)
    }



  useEffect(() => {
      if (fuelPoints == 0) {
        lowTimeframeUpdate()
        // initMid()
        
        return
      }
      
      let timeoutId:any = null;
    
      const repeatAction = () => {
        triggerGetLastPrice();
        timeoutId = setTimeout(repeatAction, delayMsecs); // Schedule the next repetition
      };
    
      if (fuelPoints) {
        timeoutId = setTimeout(repeatAction, delayMsecs); // Initial trigger
      }
    
      return () => {
        clearTimeout(timeoutId);
      };
    }, [fuelPoints, startRotationTime, delayMsecs]);






    return {
      fuelPoints, s__fuelPoints,
      pricesObj, s__pricesObj,
      ytdObj, s__ytdObj,

      isChartLoading, s__isChartLoading,
      ltfList, s__ltfList,
      ltfClosingList, s__ltfClosingList,
      htfList, s__htfList,
      htfClosingList, s__htfClosingList,

      // fullmidtermList, s__fullmidtermList,
    }
}
