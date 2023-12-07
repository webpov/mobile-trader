import { useEffect, useMemo, useState } from "react"
import { getBulkCandles, getCurrentPrices, getFuturesPricesList, getLongTermData, getPricesList, getRelevantChartData, getTickerPrices } from "../helper/kline";

export default function useSyncedKLines({state,calls}:any) {
    const [pricesObj, s__pricesObj] = useState<any>()
    const [fuelPoints, s__fuelPoints] = useState<any>(0)

    const [focusSymbol, s__focusSymbol] = useState<any>()

    
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
      if (!focusSymbol) return
      let futTermPricesList = await getPricesList(state.ltf, focusSymbol)
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

  const getFocusSymbol = (_state:any) => {
    let theFocusSymbol = ""
    
    const noFavs = (!_state.favs || (!!_state.favs && !_state.favs.length)) 
    console.log("_state.favsstate.favs", _state.favs)
    const noUrlPicks = !_state.urlArray?.length
    console.log("_state.urlArray?.length", _state.gridData, _state.urlArray)

    console.log("noFavs && !noUrlPicks", noFavs , noUrlPicks)
    if (noUrlPicks && noFavs) {return}

    // has favs
    if (!noFavs && noUrlPicks) {
      theFocusSymbol = (_state.favs[0].symbol)
      
    }
    // has url picks
    if (noFavs && !noUrlPicks) {
      console.log("_state.gridData[_state.urlArray[0]]", _state.gridData[_state.urlArray[0]])
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

      // console.log("state.symbol", state.favs)
      s__isChartLoading(true)
      // console.log("asdasd")
      triggerGetLastPrice();
      getYTDSummary(calculatedFocusSymbol)
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



    const getYTDSummary = async (selectedSymbol:string) => {
      if (!state.favs) { return }
      if (!state.favs.length) { return }

      let ydtSummaryObj:any = {}
      let tokenList = state.favs.map((item:any)=>(item.symbol))
      // console.log("tokenList", tokenList)
      let currentYTDData:any = await getBulkCandles(tokenList, state.htf)
      currentYTDData.map((item:any)=>{
        ydtSummaryObj[item.symbol] = {
          candles: item.data,
          output: getLongTermData(item.data)
        }
      })
      
      
      // const firstOne = selectedSymbol
      console.log("selectedSymbolselectedSymbol", selectedSymbol)
      const selectedSymbolData = currentYTDData.filter((item:any)=>{
        return item.symbol == selectedSymbol
      })
      // console.log("selectedSymbolData", selectedSymbolData[0])
      // console.log("selectedSymbolData candles", selectedSymbolData[0]?.data)
      // console.log("currentYTDData[selectedSymbol].candles", currentYTDData[selectedSymbol].candles)
      s__htfList(selectedSymbolData[0]?.data)

      let htfPricesData = getRelevantChartData(selectedSymbolData[0]?.data)
      s__htfClosingList(htfPricesData.closingPrices)
      
      // console.log("ydtSummaryObj", ydtSummaryObj)
      s__ytdObj(ydtSummaryObj)
      s__isChartLoading(false)
      // console.log("ydtSummaryObjydtSummaryObj", ydtSummaryObj)
      // s__ydtSummaryObj(ydtSummaryObj)
    }

    const selectedSymbolYTDSummary = useMemo(()=>{
      if (!ytdObj) return null
      if (!focusSymbol) return null


      
      // console.log("selectedSymbolselectedSymbol", focusSymbol)
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


      
      // console.log("selectedSymbolselectedSymbol", focusSymbol)
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






    return {
      fuelPoints, s__fuelPoints,
      pricesObj, s__pricesObj,
      ytdObj, s__ytdObj,
      focusSymbol, s__focusSymbol,

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
