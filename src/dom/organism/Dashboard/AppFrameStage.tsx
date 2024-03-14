"use client"
import { AI_BASE, useAI } from "@/../script/util/hook/useAI"
import ModelGameStage from "@/model/level/ModelGameStage"
import { useUrlParamCatcher } from "@/../script/util/hook/useUrlParamCatcher"
import Link from 'next/link'
import useChartConfig from "@/../script/util/hook/useChartConfig"
import useLocalStorageCatcher from "@/../script/util/hook/useLocalStorageCatcher"
import { URLGridTab } from "../URLGridTab"
import { FavoritesTab } from "../FavoritesTab"
import { DailyLog } from "../DailyLog"
import { SymbolNameHeader } from "../SymbolNameHeader"
import { useMemo, useState } from "react"
import useSyncedKLines from "@/../script/util/hook/useSyncedKLines"
import MobileTabsButtons from "./MobileTabsButtons"
import BuySellButtons from "./BuySellButtons"
import { ChartWindowSubMenu } from "./ChartWindowSubMenu"
import { ChartWindowOverlayLabels } from "./ChartWindowOverlayLabels"
import { ODivider } from "@/dom/atom/ODivider"
import { FavModalContent } from "./FavModalContent"
import MarketNewsStage from "../../../model/level/MarketNewsStage"
import { SelectedModalContent } from "./SelectedModalContent"
import { StandardTokens } from "@/../script/constant/klines";
import { SocialMediaRow } from '@/dom/atom/popup/SocialMediaRow'
import { useLocalStorage, useMediaQuery } from "usehooks-ts"
import { parseDateTimeString, parseDecimals, mapTradeHistory } from "../../../../script/util/hook/useOrderHistory"
export default function AppFrameStage({}:any) {
  const lsData:any = useLocalStorageCatcher()
  const {LS_publicSecretKeys, s__LS_publicSecretKeys, } = lsData
  const urlp = useUrlParamCatcher()
  const chartConfig = useChartConfig({})
  const [isLocalStorageModalOpen, s__isLocalStorageModalOpen] = useState(false)
  const [isSelectedModalOpen, s__isSelectedModalOpen] = useState(false)
  const [activeMobileTab, s__activeMobileTab] = useState("chart")

  const addTileToUrl = (tileCode:string, posCode:string) => {
    urlp.addTile(tileCode, posCode)
  }

  const editTileToUrl = (tileCode:string, posCode:string) => {
    alert("yes")
    let existingTileItem = null

    existingTileItem = urlp.gridData[posCode]
    
    // console.log("existingTileItem", tileCode, existingTileItem, posCode)
    // urlp.updateTile(tileCode, posCode)
    
    
    
    
    
    
    // lsData.s__LS_favs(returnObj)
  }
  const [LS_customTradeList, s__LS_customTradeList] = useLocalStorage<any>("custom_myTrades", {});
  const [customTradeList, s__customTradeList] = useState<any>(
    Object.keys(LS_customTradeList).reduce((acc:any, key) => {
      acc[key] = LS_customTradeList[key].map(mapTradeHistory);
      return acc;
    }, {})
  );

  const baseTradeObj = {
    symbol: "", // e.g., "BTCUSDT"
    orderId: 0,
    orderListId: -1, // Unless part of an OCO, the value will always be -1
    price: "0.00",
    qty: "0.00",
    quoteQty: "0.00",
    commission: "0.00",
    commissionAsset: "BTC",
    time: 0,
    isBuyer: false,
    isMaker: false,
    isBestMatch: true,
  };
  const baseQty = 330

  const generateTradeAtCurrentLevel = (side: string, isMaker = true, promptConfig = false) => {
    let tradeTime = Date.now();
    let price = `${pricesObj[focusSymbol]}`
    const amountTokens = prompt(`${focusSymbol} amount?`);
    if (!amountTokens) return

    if (promptConfig) {
        const minutesAgo = prompt("How many minutes ago did the trade happen?");
        if (!minutesAgo) return
        const minutesAgoMs = minutesAgo ? parseInt(minutesAgo) * 60000 : 0;
        tradeTime -= minutesAgoMs;
        const pricePrompt = prompt("Enter custom price");
        if (!pricePrompt) return
        price = pricePrompt
    }

    let customTrade = {
        ...baseTradeObj,
        id: LS_customTradeList.length || 0,
        symbol: focusSymbol,
        orderId: LS_customTradeList.length,
        price: price,
        // qty: `${(baseQty / pricesObj[focusSymbol])}`,
        qty: amountTokens,
        quoteQty: parseInt(`${parseFloat(price)*parseFloat(amountTokens)}`),
        time: tradeTime,
        isBuyer: side === "buy",
        isMaker: isMaker,
    };

    return customTrade;
};
  const updateTradeList = (trade:any) => {
    const updatedList = { ...LS_customTradeList };
    if (!updatedList[trade.symbol]) {
      updatedList[trade.symbol] = [];
    }

    


    updatedList[trade.symbol].push(trade);
    s__LS_customTradeList(updatedList);

    
    let theList = updatedList[trade.symbol]
    theList = theList.map(mapTradeHistory) // .reverse()
    // s__orderLogs(theList)


    // s__tradeLogsObj((oldLogsObj:any)=>{
    //   return {...oldLogsObj, [focusSymbol]: theList}
    // })
    // s__isFetchingLogs(false)


    s__customTradeList({...LS_customTradeList, [focusSymbol]: theList});
    // s__LS_customTradeList(updatedList);
  };
  const triggerUploadLogs = (jsonString:string) => {
    if (jsonString) {
      try {
        const uploadList = JSON.parse(jsonString);
        // Assuming LS_customTradeList is your local storage trade list
        // You need to implement a method to update LS_customTradeList with uploadList
        s__LS_customTradeList(uploadList);
        window.location.reload()
      } catch (e) {
        console.error("Invalid JSON string", e);
      }
    }
  };
  
  
  
  
  
  const triggerImportLogs = () => {
    const jsonString = prompt("Enter the JSON string for trade list:");
    if (jsonString) {
      try {
        const importList = JSON.parse(jsonString);
        // Assuming LS_customTradeList is your local storage trade list
        // You need to implement a method to update LS_customTradeList with importList
        s__LS_customTradeList(importList);
        window.location.reload()
      } catch (e) {
        console.error("Invalid JSON string", e);
      }
    }
  };
  
  const triggerExportLogs = () => {
    const jsonString = JSON.stringify(LS_customTradeList);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customTradeList.json';
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  
  const triggerBuy = () => {
    const theTrade = generateTradeAtCurrentLevel("buy");
    if (!theTrade) return
    // console.log("newobj", theTrade);
    updateTradeList(theTrade);
  };
  
  const triggerSell = () => {
    const theTrade = generateTradeAtCurrentLevel("sell");
    if (!theTrade) return
    // console.log("newobj", theTrade);
    updateTradeList(theTrade);
  };
  
  const triggerConfigBuy = () => {
    const theTrade = generateTradeAtCurrentLevel("buy",true,true);
    if (!theTrade) return
    // console.log("newobj", theTrade);
    updateTradeList(theTrade);
  };
  
  const triggerConfigSell = () => {
    const theTrade = generateTradeAtCurrentLevel("sell",true,true);
    if (!theTrade) return
    // console.log("newobj", theTrade);
    updateTradeList(theTrade);
  };
  const triggerResetFocusSymbolCustomLogs = () => {
    const updatedList = { ...LS_customTradeList };
    delete updatedList[focusSymbol];
    s__LS_customTradeList(updatedList);
    s__customTradeList({...LS_customTradeList, [focusSymbol]: []});

  }
  const triggerCloneFromUrl = ()=>{
    const returnObj:any = []
    urlp.keysArray.map((aKey:string)=>{
      returnObj.push({...urlp.gridData[aKey], posCode: aKey})
    })

    // const returnValues = Object.keys(state.urlState).map((item,index)=>({...item, posCode:}))
    lsData.s__LS_favs(returnObj)
    window.location.reload()
  }
  //
  const {
      
      fuelPoints, s__fuelPoints,
      ytdObj, s__ytdObj,
      focusSymbol, s__focusSymbol,
      pricesObj, s__pricesObj,
      isChartLoading, s__isChartLoading,
      ltfList, s__ltfList,
      ltfClosingList, s__ltfClosingList,
      htfList, s__htfList,
      htfClosingList, s__htfClosingList,
      selectedSymbolYTDSummary,
      selectedSymbolLTFSummary,
      tradeLogsObj, s__tradeLogsObj, triggerGetLogs, exportLogs,
      isFetchingLogs, s__isFetchingLogs,
      // fullmidtermList, s__fullmidtermList,
  } = useSyncedKLines({state:{
    urlSymbol: urlp.symbol.toUpperCase(),
    gridData: urlp.gridData,
    urlArray: urlp.keysArray,
    favs: lsData.LS_favs,
    // symbol:urlp.symbol,
    ltf:urlp.ltf,
    htf:urlp.htf,
  }})
  
  const editSingleToken = (theItem:any, side:string) => {
    // console.log(`editSingleToken(theItem, side)`, theItem, side)
    const ratioMul = side == "target" ? 1 : (side !== "roof" ? 0.8 : 1.2) 
    const baseprice:any = (pricesObj[theItem.symbol]*ratioMul).toFixed(1)

    const selectedLevel = prompt("Enter price", baseprice)
    if (!selectedLevel) { return }

    const posCode = theItem.posCode
    const tileCode = ""
    const cellObj = {[side]: selectedLevel}

    
    urlp.updateTile(theItem, posCode, side, cellObj)
    
    // console.log("lsData.s__LS_favs", lsData.LS_favs)
    // console.log("lsData.s__LS_favs", lsData.s__LS_favs)
    const modifiedLocalStorageObj:any = [...lsData.LS_favs].map((oneItem:any)=>{
      // modifiedLocalStorageObj.push({...urlp.gridData[aKey], posCode: aKey})
      return oneItem.posCode == posCode ? {
              ...oneItem,
              ...cellObj,
            } : oneItem
    })



    // console.log(modifiedLocalStorageObj)
    lsData.s__LS_favs(modifiedLocalStorageObj)
    
    // const returnObj:any = []

    // urlp.keysArray.map((aKey:string)=>{
    //   returnObj.push({...urlp.gridData[aKey], posCode: aKey})
    // })

    // lsData.s__LS_favs(returnObj)


  }






type CompletionResponse = {
  // Define the structure of your expected response here
  // For example:
  choices?: { text: string }[];
  error?: string;
};

const triggerMobileTab = (newTab:string) => {
  s__activeMobileTab(newTab)
  
  if (newTab == "chart") {
    // recalcChartContext(newTab)
  }
}
async function getCompletionFromAPI(prompt: string): Promise<CompletionResponse> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const data: CompletionResponse = await response.json();
  return data;
}

  const chosenMidTimeframe = "4h"
  const {askAI: ask_angelInvestorSimulator, theAIContextTimeframe, setAITimeframe} = useAI(chosenMidTimeframe,true)
  const triggerAi = async () => {
    

    const wholeClosingPrices:any = ltfClosingList
    let thePromptGuide = ask_angelInvestorSimulator("4h",wholeClosingPrices)
    console.log("thePromptGuide", thePromptGuide)

    console.log("AI_BASE + JSON.stringify(thePromptGuide)", AI_BASE + JSON.stringify(thePromptGuide))
    const promptGuide = AI_BASE + JSON.stringify(thePromptGuide)
    
    // console.log(asdasd)
    prompt(`Consult ${focusSymbol}`, promptGuide)
    // const resres = await getCompletionFromAPI(AI_BASE + JSON.stringify(thePromptGuide))
    // console.log("resres*******************************")
    // console.log(resres)
    // console.log("resres*******************************")
  }
  const triggerOpenPack = () => {

  }
  const triggerOpenModal = () => {
    
    let theDom:any = document.getElementById("main_scrollable_content")
    if (!theDom) { return }
    theDom.className += " noverflow h-max-100vh"
    s__isLocalStorageModalOpen(true)

  }
  const isLogsFilled = (aSymbol:string) => {
    if (!tradeLogsObj) { return null }

    return !!tradeLogsObj[aSymbol]
  }
  const isMediumDevice = useMediaQuery("only screen and (max-width : 600px)");

  const memoActiveMobileTab = useMemo(()=>{
    return isMediumDevice ? activeMobileTab : "chart"
  },[activeMobileTab, isMediumDevice])
  return (<>


{isLocalStorageModalOpen &&
      <div className="pos-fixed flex-align-start flex-justify-center pt-8 top-0 z-400 w-100vw h-100vh bg-glass-20 bg-b-50  tx-white">
        
        <div className='Q_sm_x w-10 '></div>
        <div className='Q_lg_x w-10 '></div>
        <div className='Q_xl_x w-10 '></div>
        <div className="w-100 ">
          <div className=' mt-8 pt-4 '></div>
          <FavModalContent
            state={{
              LS_favs:lsData.LS_favs, LS_publicSecretKeys,ytdObj,
              focusSymbol, isChartLoading, tradeLogsObj,isFetchingLogs,
              urlStateKeys:urlp.keysArray, ltfClosingList, pricesObj,
              fuelPoints,
            }} 
            calls={{
              triggerUploadLogs,
              triggerImportLogs, triggerExportLogs,
              editSingleToken, s__fuelPoints,
              s__isLocalStorageModalOpen,triggerCloneFromUrl,
              s__LS_favs: lsData.s__LS_favs, s__LS_publicSecretKeys, s__isFetchingLogs,
              s__focusSymbol, s__isChartLoading, s__tradeLogsObj, triggerGetLogs, exportLogs, isLogsFilled,
            }}
          /> 
        </div>
        
        <div className='Q_sm_x w-10 '></div>
        <div className='Q_lg_x w-10'></div>
        <div className='Q_xl_x w-10'></div>
      </div>
    }
  
  

    {isSelectedModalOpen &&
      <div className="pos-fixed flex-align-start flex-justify-center pt-8 top-0 z-400 w-100vw h-100vh bg-glass-20   tx-white">
        
        <div className='Q_sm_x w-10 '></div>
        <div className='Q_lg_x w-10 '></div>
        <div className='Q_xl_x w-10 '></div>
        <div className="w-100 ">
          <div className=' mt-6  pt-4 '></div>
          <SelectedModalContent
            state={{pairs:StandardTokens,
              LS_favs:lsData.LS_favs, LS_publicSecretKeys,
              focusSymbol, isChartLoading, tradeLogsObj,isFetchingLogs,
              urlStateKeys:urlp.keysArray,urlState: urlp.gridData
            }} 
            calls={{
              editSingleToken,addTileToUrl,
              s__isSelectedModalOpen,triggerCloneFromUrl,
              s__LS_favs: lsData.s__LS_favs, s__LS_publicSecretKeys, s__isFetchingLogs,
              s__focusSymbol, s__isChartLoading, s__tradeLogsObj, triggerGetLogs, exportLogs, isLogsFilled,
            }}
          /> 
        </div>
        
        <div className='Q_sm_x w-10 '></div>
        <div className='Q_lg_x w-10'></div>
        <div className='Q_xl_x w-10'></div>
      </div>
    }
  

    <div className='pos-fix top-0 w-100 flex-col noverflow h-100vh z-2 ' style={{width: '100vw',}}>
      <div className={`${chartConfig.isTrendUp ? "_ddg" : "_ddr"} h-50 w-100 bord-r-100p spin-60 blur opaci-10 `} 
        style={{filter:"blur(200px)"}}
      >
      </div>
    </div><a href="/" className="nodeco z-800 block opaci-chov--50 tx-white pa-2 pos-abs left-0 flex-row Q_xs_flex-col top-0 tx-md tx-bold-8 tx-ls-1 ">
      <img src="/webtrade11.jpg" className=" bord-r-100p" width="50" height="50"  />
        {/* <span className="tx-altfont-5">Web</span>
        <span className="">Trade</span> */}
    </a>
    {memoActiveMobileTab == "chart" && <>
    

      {/* <div className="tx-white pa-2 pos-fix left-0 top-0 tx-md tx-bold-8 tx-ls-1 tx-altfont-5">Web</div> */}
      <div className='flex-row  tx-white  Q_lg_x  w-90 z-10'>
        <div className='Q_lg_x w-10'></div>
        <h1 className=" flex-1 mb-0 pb-0 pl-100 block">
          <a href={`/?symbol=${focusSymbol?.toUpperCase()}`} className="tx-white flex-center flex-justify-start gap-1  nodeco" onClick={()=>window.location.reload()}>
            <SymbolNameHeader label={focusSymbol || "N/A"} />
            {!!pricesObj && <div className=" tx-lg  tx-roman">: {(pricesObj[focusSymbol])}</div>}
          </a>
        </h1>
      </div>
      <div className='flex-row pos-rel flex-justify-end mr-8  w-100 Q_xs_lg z-10 tx-white'>
        <a href={`/?symbol=${focusSymbol?.toUpperCase()}`} className="flex-col tx-white nodeco" onClick={()=>window.location.reload}>
          <h2 className="mb-0 pb-0 flex-center bg-w-10 px-4 gap-2 box-shadow-i-9-b pt-2 bord-r-25 pb-2">
            <div className="tx-sm"><SymbolNameHeader label={focusSymbol || "N/A"} /></div>
            <div>-</div>
            {!!pricesObj && <div className=" tx-lg tx-roman">{(pricesObj[focusSymbol])}</div>}
          </h2>
          
        </a>
      </div>
    </>}
    <div className='flex-row flex-align-stretch tx-white w-90 z-10'
    >
      {!!chartConfig.isLeftSidebarVisible &&
        <div className=' Q_lg_x w-10 box-shadow-9-b bg-glass-20 bord-r-25 pb-8 pt-4 neu-convex flex-col flex-justify-start'
          style={{maxHeight:"60vh", background: "linear-gradient(0deg, #00000099, #00000019)"}}
        >
          <div className="pb-4 tx-center">URL <small>Favorites</small> </div>
          <div className="flex-col w-90 h-100 autoverflow-y">
            <URLGridTab state={{urlStateKeys:urlp.keysArray, urlState: urlp.gridData,baseToken:urlp.reftoken}}
              calls={{addTileToUrl, s__isSelectedModalOpen}}
            />
          </div>
        </div>
      }
      <div className='tx-roman flex flex-align-stretch flex-1 mt-4 flex-center pos-rel '
                style={{maxHeight:"65vh"}}

      >
        {memoActiveMobileTab == "chart" && <>
        {!!focusSymbol && !!selectedSymbolYTDSummary &&
          selectedSymbolLTFSummary && chartConfig.isOverlayLabeled && <>
          <ChartWindowOverlayLabels state={{selectedSymbolLTFSummary, selectedSymbolYTDSummary}} />
          
        </>}
          <div className="w-90  pos-rel bord-r-25 h-100" style={{minHeight:"55vh",}}>
            <div className='bord-r-25 w-100 noverflow bg-b-50 bg-glass-50  h-100'
              style={{boxShadow:"inset 5px 8px 5px #ffffff22, 4px 4px 10px #000000cc"}}
            >
              <ModelGameStage config={chartConfig} state={{
                ltfClosingList, ltfList, isChartLoading,
                favs: lsData.LS_favs,
                
                selectedSymbolYTDSummary,
                selectedSymbolLTFSummary,
                activeMobileTab: memoActiveMobileTab,
                htfList,
                htfClosingList,
                ytdObj, focusSymbol,
                tradeLogsObj, isFetchingLogs,
                customTradeList,
                LS_customTradeList,
              }}
                calls={{
                  s__LS_customTradeList,
                  s__customTradeList,
                }}
              >
                <div>
                  
                </div>
              </ModelGameStage>
            </div>
            
            <button className="pos-abs  translate-y-50 border-white-50 Q_xs  bottom-0 right-0 pa-1 pb-2 opaci-chov--50 bg-b-90 noborder bord-r-50 tx-lgx"
                  onClick={()=>{triggerOpenModal()}}
                >
                  ⭐
                </button>
            
            
        
          </div>
          
        {!fuelPoints && 
          <div className="flex hover-10 some-shakefull-1 pointer pos-abs top-0  right-50p">
            <button className="opaci-chov--50 bg-b-90 py-1 bord-r-50 tx-mdl tx-white px-3 translate-y--50" 
              onClick={()=>s__fuelPoints(1)}
            >
              Feed
            </button>
          </div>
        }
        {!!fuelPoints && 
          <div className="flex pointer pos-abs top-0  right-50p">
            <button className="opaci-chov--50 bg-b-90 translate-y--50 py-1 bord-r-50 tx-mdl tx-white px-3 " 
              onClick={()=>s__fuelPoints(0)}
            >
              🛑
            </button>
          </div>
        }
        
  <div className="flex opaci-chov--50 pos-abs bottom-0 right-0 mb-8 ma-2" onClick={() => {chartConfig.s__isChartMovable(!chartConfig.isChartMovable);}}>
        <button className=" bg-b-90 py-1 bord-r-10 tx-mdl noclick" >
        {!chartConfig.isChartMovable ? "🔎" : "🔒"}
        </button>
      </div>
  <div className="flex opaci-chov--50 pos-abs top-0 left-0 mb-8 ma-2" onClick={() => {triggerAi();}}>
        <button className=" bg-b-90 py-1 bord-r-10 tx-mdl noclick" >
          {!chartConfig.isChartMovable ? "🪄" : "🪄"}
        </button>
      </div>
        <div className="pos-abs z-300" style={{bottom:"-25px", left:"10%"}}>
          <ChartWindowSubMenu state={{fuelPoints}} calls={{s__fuelPoints, editTileToUrl}} 
            chartConfig={chartConfig} 
          />          
        </div>
        <div className="Q_xs pos-abs z-300" style={{bottom:"-25px", left:"25%"}}>
          
  <details className="">
      <summary className="flex opaci-chov--50 pos-abs bottom-0">
        <button className=" bg-b-90 border-blue py-1 bord-r-50 tx-mdl noclick">
        💰
        </button>
      </summary>
      <div className="pa-2 bg-b-50 border-blue bord-r-10 mb-8 bg-glass-10 box-shadow-9-b">
          <BuySellButtons triggerBuy={triggerBuy} triggerSell={triggerSell} 
            triggerConfigBuy={triggerConfigBuy} triggerConfigSell={triggerConfigSell}
            triggerResetFocusSymbolCustomLogs={triggerResetFocusSymbolCustomLogs} state={{focusSymbol}}
          />
        </div>
        </details>
      </div>
        </>}
      </div>
        {!!chartConfig.isNotesVisible &&
          <div className="Q_xl_x  w-25 flex-col flex-justify-start gap-3">
            <div className='Q_xl_x w-100  block pos-rel bord-r-25 tx-center flex-col flex-justify-start  py-4'
              // style={{boxShadow:"inset 5px 8px 5px #ffffff10, 4px 4px 10px #000000"}}
            >
              <div className="pb-4 w-100 tx-start pl-8" data-responsive="xl">
                <div className="pl-4">Market <br /> Summary</div>
              </div>
              <div className="flex-col w-90  right-0"
                // style={{width:"50vw"}}
              >
                <MarketNewsStage />
              </div>
            </div>
            <div className='Q_xl_x hideNotesVerticalContainer w-100 box-shadow-9-b block bg-glass-50 bord-r-25 tx-center neu-concave flex-col flex-justify-start py-4'>
              {/* <div className="pb-4">Daily Log</div> */}
              <div className="flex-col w-90">
                <DailyLog state={{LS_notes:lsData.LS_notes, maxChars:20}} calls={{s__LS_notes: lsData.s__LS_notes}} />
              </div>
            </div>
          </div>
        }
      <div className='Q_sm_x px-4 w-20 gap-3 pos-rel block flex-col flex-justify-start tx-center'>
         
        <div className='Q_sm_x w-100 h-100 pos-rel block px-4  bord-r-25 tx-center'>
          <div className=' tx-center bg-glass-50 h-100 bord-r-25 neu-convex  flex-col flex-justify-start'
        style={{maxHeight:"68vh", background: "linear-gradient(0deg, #000000aa, #00000022)"}}
        >
            <div className="Q_md_x py-2"></div> 
            <div className="Q_sm py-2"></div> 
            <div className="py-4 flex-center gap-3">
              <div className="Q_md_x">Stored <br /> Favorites</div> 
              <div className="Q_xs_md">Fav</div> 
              {!!fuelPoints && <div>
                <div className="blink_me pa-1 _ddr bord-r-50 "></div>
              </div>}
            </div>
            <div className="flex-col w-90 pb-4 h-100 autoverflow-y"
            >
              <FavoritesTab state={{
                  LS_favs:lsData.LS_favs,urlStateKeys:urlp.keysArray, urlState: urlp.gridData,
                  ytdObj, fuelPoints, focusSymbol, isChartLoading,
                  pricesObj, 
                }} 
                calls={{s__LS_favs: lsData.s__LS_favs,
                  s__focusSymbol, s__isChartLoading, isLogsFilled,
                  triggerCloneFromUrl,
                }} 
              />
            </div>

            

            <button className="pos-abs top-0 right-0 pa-1 opaci-chov--50 bg-b-90 noborder bord-r-50 tx-lgx"
              onClick={()=>{triggerOpenModal()}}
            >
              ⭐
            </button>
          </div>
          
        </div> 
        
      </div>
    </div>
    <div className="mt-6 Q_md_x"></div>
    <div className='Q_sm_x flex-1 flex flex-align-start  tx-white w-90 z-10'>
      
      {chartConfig.isLeftSidebarVisible &&
        <Link href="https://wfun.vercel.app/" className='Q_sm_x w-10 block  Q_md_x  bord-r-25 tx-center '>
          <button className='w-100  tx-white tx-lg tx-center bg-glass-50 h-100 bord-r-25 py-4 pb-5 neu-convex opaci-chov--50 border-white tx-altfont-1'>
            <div className="hover-jump pb-2">🎮</div> <div className="Q_lg_x">Games</div> 
          </button>
        </Link>
      }
      <div className='flex-1 flex-col mt-8 pb-8 Q_sm_x '>
        <BuySellButtons triggerBuy={triggerBuy} triggerSell={triggerSell}
          triggerConfigBuy={triggerConfigBuy} triggerConfigSell={triggerConfigSell}
          triggerResetFocusSymbolCustomLogs={triggerResetFocusSymbolCustomLogs} state={{focusSymbol}}
        />

        
        <div className='Q_sm_lg w-90 mt-8  box-shadow-9-b block bg-glass-50 bord-r-25 tx-center neu-concave flex-col flex-justify-start py-4'
          style={{boxShadow:"inset 5px 8px 5px #ffffff10, 4px 4px 10px #000000"}}
        >
          <div className="pb-4" data-responsive="md-lg">Market Summary</div>
          <div className="flex-col w-95 ">
            <MarketNewsStage />
          </div>
        </div>
      </div>
      <div className='Q_sm_lg px-2 pt-4 mr-3 pb-4 neu-convex bord-r-25'>
        <div className="w-100 tx-center pb-2">Notes</div>
        <DailyLog state={{LS_notes:lsData.LS_notes, maxChars:20}} calls={{s__LS_notes: lsData.s__LS_notes}} />
      </div>

      
      <div className='Q_xl_x w-25 mt-  flex-col block   tx-center  '>
        <div className="neu-convex py-4 px-8 bord-r-25 box-shadow-9-b">
          WebPOV Ecosystem
        </div>
        <div className="pa-2">
          {/* <div className="tx-lx opaci-10">Not Found</div> */}
          <div>
            <SocialMediaRow />

          </div>
        </div>
      </div>
      
      <div className='Q_md_x flex-col w-20 gap-3'>
      <div className='Q_md_x  w-100 mt-8 block bg-glass-20 bord-r-25 tx-center  neu-concave'>
        <details className="w-100  ">
          <summary className="flex py-4 opaci-chov--50">
            <div className="px-8">{">"} Account</div>
          </summary>
          <div>
            <h6>Sync</h6>
          </div>
        </details>
      </div>

      
      <div className=' Q_xs_xl  w-100 mt-8  flex-col block   tx-center  '>
        <div className=" neu-convex py-4 px-8 bord-r-25 box-shadow-9-b">
          WebPOV Apps
        </div>
        <div className="pa-4">
          <div>
            <SocialMediaRow />

          </div>
        </div>
      </div>


      </div>

      
    <div className='Q_sm mt-8 w-10 block flex-col gap-3 bord-r-25 tx-center '>
      <button className='w-100  tx-white tx-lg tx-center bg-glass-50 h-100 bord-r-10 py-4 neu-convex opaci-chov--50 border-white tx-altfont-1'>
          Acc <div className="Q_md_x">Acc</div> 
        </button>
        <button className='w-100 pb-5 tx-white tx-lg tx-center bg-glass-50 h-100 bord-r-25 py-4 neu-convex opaci-chov--50 border-white-50 tx-altfont-1'>
          <div className="hover-jump pb-2">🎮</div> <div className="Q_md_x">Games</div> 
        </button>
      </div>
      
    </div>

    {/* <ODivider className="Q_xs_md w-90 my-4" /> */}

    

      
      
      
      
      {memoActiveMobileTab == "favs" && <>

    <div className="mt-6 Q_sm_x"></div>
      
    <div className="flex-wrap w-100 mt-2 Q_xs_md mb-100 flex-align-start gap-2 z-100  " >
      
      <div className='Q_xs_md  w-30 mb-8 pb-100 box-shadow-9-b bg-glass-20 bord-r-25 pt-4 bg-w-10 flex-col flex-justify-start tx-white'
      >
        <div className="pb-4 tx-lg tx-center">URL <br /> <small>Favorites</small> </div>
        <div className="flex-col w-90 tx-lg"
        style={{maxHeight:"40vh"}}
        >
          <URLGridTab state={{urlStateKeys:urlp.keysArray, urlState: urlp.gridData,baseToken:urlp.reftoken}}
            calls={{addTileToUrl, s__isSelectedModalOpen}}
          />
        </div>
      </div>
      
      {/* <div className='Q_sm w-50 z-200 box-shadow-9-b block bg-glass-50 bord-r-25 tx-center neu-concave flex-col flex-justify-start py-4'>
        <div className="pb-4">684Market Summary</div>
        <div className="flex-col w-90 "
        >
          <MarketNewsStage />
        </div>
      </div> */}
      
      <div className='Q_xs_sm w-40  pos-rel block px-4  bord-r-25 tx-center tx-white mb-8 z-200'>
        <div className=' tx-center  pa-2 pb-6  bg-glass-50 h-100 bord-r-25 neu-convex flex-col flex-justify-start'
          style={{
            boxShadow:"-2px -2px 4px -2px #ffffff44",
            
          }}
        >
          <div className=" flex-center gap-3 py-4">
            <div className="tx-lgx Q _md_x">Stored <br />Favorites</div> 
            {/* <div className="Q_xs_md">Fav</div>  */}
            {!!fuelPoints && <div>
              <div className="blink_me pa-1 _ddg bord-r-50 "></div>
            </div>}
          </div>
          <div className="flex-col w-90"
        style={{maxHeight:"50vh"}}
        >
            <FavoritesTab state={{
                LS_favs:lsData.LS_favs,urlStateKeys:urlp.keysArray,
                urlState: urlp.gridData,
                ytdObj, fuelPoints,
                pricesObj, focusSymbol, isChartLoading,
              }} 
              calls={{s__LS_favs: lsData.s__LS_favs,
                s__focusSymbol, s__isChartLoading, isLogsFilled,
                triggerCloneFromUrl,
              }} 
            />
          </div>
          <button className="pos-abs top-0 right-0 pa-1 opaci-chov--50 bg-b-90 noborder bord-r-50 translate-y--50 tx-lgx"
            onClick={()=>{triggerOpenModal()}}
          >
            ⭐
          </button>
        </div>
      </div>
    </div>
</>}
    {/* <ODivider className="Q_xs_xl w-90 mt-4" /> */}
    

    {memoActiveMobileTab == "notes" && <>
      {!!pricesObj && 
        <div className="Q_xs pb-4 px-4 flex-center  gap-1 tx-white"
          style={{alignSelf:"flex-end"}}
        >
          <div className=" tx-lg tx-roman tx-altfont-1">{(focusSymbol)}</div>
          <div>-</div>
          <div className=" tx-lg tx-roman">{(pricesObj[focusSymbol])}</div>
        </div>
      } 
    <div className='Q_xs w-90 z-200   box-shadow-9-b block bg-glass-50 bord-r-25 tx-center  flex-col flex-justify-start py-4'>
        <div className="pb-4 tx-white tx-lg" data-responsive="xs" >
          Market <br /> Summary
        </div>
        <div className="flex-col w-90 h-min-50vh">
          <MarketNewsStage state={{canvasHeight:"350px"}} />
        </div>
      </div>

      </>
}
    {memoActiveMobileTab == "notes" && <>
      <div className="mt-8 Q_sm_x"></div>
      <div className='z-200  mb-150 mt-4 pb-100  Q_xs_xl w-90 box-shadow-9-b block bg-glass-50 bord-r-25 tx-center neu-concave flex-col flex-justify-start pt-4'>
        <div className="pb-4 tx-white">Daily Log</div>
        <div className="flex-col w-90">
          <DailyLog state={{LS_notes:lsData.LS_notes, maxChars:32}} calls={{s__LS_notes: lsData.s__LS_notes}} />
        </div>
              
      </div>
    </>}
      
      <div className='flex-1 flex-col mt-8 pb-6 Q_xs z-300  pos-fixed bottom-0 '>
        <MobileTabsButtons state={{activeMobileTab: memoActiveMobileTab}}  calls={{s__activeMobileTab: triggerMobileTab}} />
      </div>


      
      <div className=' Q_sm_md  w-100 mt-8  flex-col block   tx-center  '>
        <div className="tx-white neu-convex py-4 px-8 bord-r-25 box-shadow-9-b">
          The WebPOV Project
        </div>
        <div className="pa-4">
          <div>
            <SocialMediaRow />

          </div>
        </div>
      </div>

    </>)
}

