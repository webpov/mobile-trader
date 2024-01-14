import { useEffect, useMemo, useState } from "react"
import { getBulkCandles, getCurrentPrices, getFuturesPricesList, getLongTermData, getPricesList, getRelevantChartData, getTickerPrices } from "../helper/kline";
import { getTradeLogs } from "../../state/service/local";
import { parseDateTimeString, parseDecimals } from "./useOrderHistory";

export default function useSyncedKLines({state,calls}:any) {
    const [pricesObj, s__pricesObj] = useState<any>()
    const [fuelPoints, s__fuelPoints] = useState<any>(0)

    const [focusSymbol, s__focusSymbol] = useState<any>()

    
    const [ytdObj, s__ytdObj] = useState<any>()
    const [tradeLogsObj, s__tradeLogsObj] = useState<any>()

    const [ltfList, s__ltfList] = useState<any>([])
    const [ltfClosingList, s__ltfClosingList] = useState<any>([])
    const [htfList, s__htfList] = useState<any>([])
    const [htfClosingList, s__htfClosingList] = useState<any>([])

    // const [fullmidtermList, s__fullmidtermList] = useState<any>([])

  const [isFetchingLogs, s__isFetchingLogs] = useState(false)
  const [isChartLoading, s__isChartLoading] = useState(false)
  const [delayMsecs, s__delayMsecs] = useState(5000)
  const [startRotationTime, s__startRotationTime] = useState(0); 

  const lowTimeframeUpdate = async () => {
      if (!focusSymbol) return
      let futTermPricesList = await getPricesList(state.ltf, focusSymbol)
    s__ltfList(futTermPricesList)
    let futTermPricesData = getRelevantChartData(futTermPricesList)
    s__ltfClosingList(futTermPricesData.closingPrices)
    // s__startRotationTime(futTermPricesData.latestUnix)
    // s__scopeStart(futTermPricesData.oldestUnix)
    // s__shorttermList(futTermPricesData.closingPrices)
    // s__futtermVolumeList(futTermPricesData.volumeList)
    s__isChartLoading(false)
  }

  const getFocusSymbol = (_state:any) => {
    let theFocusSymbol = ""
    
    const noFavs = (!_state.favs || (!!_state.favs && !_state.favs.length)) 
    const noUrlPicks = !_state.urlArray?.length

    if (noUrlPicks && noFavs) {return}

    // has favs
    if (!noFavs && noUrlPicks) {
      theFocusSymbol = (_state.favs[0].symbol)
      
    }
    // has url picks
    if (noFavs && !noUrlPicks) {
      if (_state.gridData[_state.urlArray[0]]) {
        theFocusSymbol = (_state.gridData[_state.urlArray[0]].symbol)
      }        
    }
    // has both
    if (!noFavs && !noUrlPicks) {
      theFocusSymbol = (_state.favs[0].symbol)
    }

    return theFocusSymbol
  }
  
    useEffect(() => {
      if (isChartLoading) {return}

      const calculatedFocusSymbol:string = getFocusSymbol(state) || ""
      s__focusSymbol(calculatedFocusSymbol)

      s__isChartLoading(true)
      triggerGetLastPrice();
      getYTDSummary(calculatedFocusSymbol)
      lowTimeframeUpdate()
    }, []);






    const triggerGetLastPrice = async () => {
      if (!state.favs) { return }
      if (!state.favs.length) { return }

      let pricesObj:any = {}
      let tokenList = state.favs.map((item:any)=>(item.symbol))
      let currentData:any = await getTickerPrices(tokenList)
      currentData.map((item:any)=>{
        pricesObj[item.symbol] = item.spotPrice
      })
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



    const getYTDSummary = async (selectedSymbol:string) => {
      if (!state.favs) { return }
      if (!state.favs.length) { return }

      let ydtSummaryObj:any = {}
      let tokenList = state.favs.map((item:any)=>(item.symbol))
      let currentYTDData:any = await getBulkCandles(tokenList, state.htf)
      currentYTDData.map((item:any)=>{
        const outputData = getLongTermData(item.data)
        console.log("symbol", item.symbol, "outputData", outputData) 
        ydtSummaryObj[item.symbol] = {
          candles: item.data,
          output: outputData
        }
      })
      
      
      // const firstOne = selectedSymbol
      const selectedSymbolData = currentYTDData.filter((item:any)=>{
        return item.symbol == selectedSymbol
      })
      s__htfList(selectedSymbolData[0]?.data)

      let htfPricesData = getRelevantChartData(selectedSymbolData[0]?.data)
      s__htfClosingList(htfPricesData.closingPrices)
      
      s__ytdObj(ydtSummaryObj)
      s__isChartLoading(false)
      // s__ydtSummaryObj(ydtSummaryObj)
    }

    const selectedSymbolYTDSummary = useMemo(()=>{
      if (!ytdObj) return null
      if (!focusSymbol) return null


      
      const selectedSymbolData = ytdObj[focusSymbol].candles
      let htfPricesData = getRelevantChartData(selectedSymbolData)

      const minValue =  Math.min(...htfPricesData.closingPrices)
      const maxValue =  Math.max(...htfPricesData.closingPrices)
      const comparingRange =  maxValue - minValue
      

      return {...htfPricesData,
        minValue,
        maxValue,
      }
      
      },[focusSymbol, ytdObj])

    const selectedSymbolLTFSummary = useMemo(()=>{
      if (!ltfList) return null
      if (!ltfList.length) return null
      if (!focusSymbol) return null


      
      let ltfPricesData = getRelevantChartData(ltfList)

      const minValue =  Math.min(...ltfPricesData.closingPrices)
      const maxValue =  Math.max(...ltfPricesData.closingPrices)
      const comparingRange =  maxValue - minValue
      

      return {...ltfPricesData,
        minValue,
        maxValue,
      }
      
      },[focusSymbol, ltfList])


  useEffect(() => {
      if (fuelPoints == 0) {
        lowTimeframeUpdate()
        if (!focusSymbol) { return }
        getYTDSummary(focusSymbol)
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
    }, [focusSymbol, fuelPoints, startRotationTime, delayMsecs]);


    const exportLogs = async (aSymbol:string) => {
      console.log("aSymbolaSymbol", aSymbol)

      const asdasd = `act as a professional bitcoin market researcher
      analyze this simulated data and make a report:
      the list is the closing daily prices of ${aSymbol} 
      generate a only a support and a resistance level (floor and roof price) to trade for the next month
      ${JSON.stringify(ltfClosingList.slice(150))}
      `
      console.log(asdasd)
      
      // ltfClosingList.slice(Math.max(ltfClosingList.length - 5, 1))
      // console.log(JSON.stringify(ltfClosingList.slice(150)) )
      // console.log(JSON.stringify(ltfClosingList) )
    }
    const triggerGetLogs = async (aSymbol:string) => {
      let theChosenSymbol = aSymbol || focusSymbol
      s__isFetchingLogs(true)
      const logsData = await getTradeLogs(theChosenSymbol)

      
      let theList = logsData
      theList = theList.map((anItem:any, index:any) => {
        return {...anItem,...{
            side: anItem.isBuyer ? "Buy" : "Sell",
            price: parseDecimals(anItem.price),
            qty: "$"+parseDecimals(parseFloat(anItem.price)*parseFloat(anItem.qty)),
            time: parseDateTimeString(new Date(anItem.time/1)),
        }}
      }) // .reverse()
      // s__orderLogs(theList)


      s__tradeLogsObj((oldLogsObj:any)=>{
        return {...oldLogsObj, [theChosenSymbol]: theList}
      })
      s__isFetchingLogs(false)
    }



    return {
      fuelPoints, s__fuelPoints,
      pricesObj, s__pricesObj,
      ytdObj, s__ytdObj,
      tradeLogsObj, s__tradeLogsObj, triggerGetLogs,
      isFetchingLogs, s__isFetchingLogs,
      focusSymbol, s__focusSymbol,
      exportLogs,
      isChartLoading, s__isChartLoading,
      ltfList, s__ltfList,
      ltfClosingList, s__ltfClosingList,
      htfList, s__htfList,
      htfClosingList, s__htfClosingList,

      selectedSymbolYTDSummary,
      selectedSymbolLTFSummary,
      // fullmidtermList, s__fullmidtermList,
    }
}
