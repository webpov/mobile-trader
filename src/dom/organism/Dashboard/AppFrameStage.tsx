"use client"

import ModelGameStage from "@/model/level/ModelGameStage"
import { useUrlParamCatcher } from "@/../script/util/hook/useUrlParamCatcher"
import useChartConfig from "@/../script/util/hook/useChartConfig"
import useLocalStorageCatcher from "@/../script/util/hook/useLocalStorageCatcher"
import { URLGridTab } from "../URLGridTab"
import { FavoritesTab } from "../FavoritesTab"
import { DailyLog } from "../DailyLog"
import { SymbolNameHeader } from "../SymbolNameHeader"
import { useState } from "react"
import useSyncedKLines from "@/../script/util/hook/useSyncedKLines"
import BuySellButtons from "./BuySellButtons"
import { ChartWindowSubMenu } from "./ChartWindowSubMenu"
import { ChartWindowOverlayLabels } from "./ChartWindowOverlayLabels"
import { ODivider } from "@/dom/atom/ODivider"
import { FavModalContent } from "./FavModal"
import MarketNewsStage from "../../../model/level/MarketNewsStage"

export default function AppFrameStage({}:any) {
  const lsData:any = useLocalStorageCatcher()
  const {LS_publicSecretKeys, s__LS_publicSecretKeys, } = lsData
  const urlp = useUrlParamCatcher()
  const chartConfig = useChartConfig({})
  const [isLocalStorageModalOpen, s__isLocalStorageModalOpen] = useState(false)

  const addTileToUrl = (tileCode:string, posCode:string) => {
    urlp.addTile(tileCode, posCode)
  }

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
      tradeLogsObj, s__tradeLogsObj, triggerGetLogs,
      isFetchingLogs, s__isFetchingLogs,
      // fullmidtermList, s__fullmidtermList,
  } = useSyncedKLines({state:{
    gridData: urlp.gridData,
    urlArray: urlp.keysArray,
    favs: lsData.LS_favs,
    // symbol:urlp.symbol,
    ltf:urlp.ltf,
    htf:urlp.htf,
  }})

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
  return (<>


    {isLocalStorageModalOpen &&
      <div className="pos-fixed flex-center pt-8 top-0 z-400 w-100vw h-100vh bg-glass-20 bg-b-50  tx-white">
        
        <div className='Q_sm_x w-10 '></div>
        <div className='Q_lg_x w-10 '></div>
        <div className='Q_xl_x w-10 '></div>
        <FavModalContent  state={{LS_favs:lsData.LS_favs, LS_publicSecretKeys, focusSymbol, isChartLoading, tradeLogsObj,isFetchingLogs,  }} 
                calls={{s__isLocalStorageModalOpen,
                  s__LS_favs: lsData.s__LS_favs, s__LS_publicSecretKeys, s__isFetchingLogs,
                  s__focusSymbol, s__isChartLoading, s__tradeLogsObj, triggerGetLogs, isLogsFilled,

                }}
        /> 
        
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
    </div>
    <div className='flex-row  tx-white  Q_lg_x  w-90 z-10'>
      <div className='Q_lg_x w-10'></div>
      <h1 className=" flex-1 mb-0 pb-0 pl-100 block"><SymbolNameHeader label={focusSymbol || "N/A"} /></h1>
    </div>
    <div className='flex-row pos-rel flex-align-stretch  w-100 Q_xs_lg z-10 tx-white'>
      <h2 className="mb-0 pb-0  bg-w-10 px-6 box-shadow-i-9 pt-2 bord-r-25 pb-3"><SymbolNameHeader label={focusSymbol || "N/A"} /></h2>
    </div>
    <div className='flex-row flex-align-stretch tx-white w-90 z-10'>
      {!!chartConfig.isLeftSidebarVisible &&
        <div className='Q_lg_x w-10 box-shadow-9-b bg-glass-20 bord-r-25 pt-4 neu-convex flex-col flex-justify-start'>
          <div className="pb-4 tx-center">URL Grid</div>
          <div className="flex-col w-90">
            <URLGridTab state={{urlStateKeys:urlp.keysArray, urlState: urlp.gridData,baseToken:urlp.reftoken}}
              calls={{addTileToUrl}}
            />
          </div>
        </div>
      }
      <div className='tx-roman flex flex-align-stretch flex-1 mt-4 flex-center pos-rel'>
        {!!focusSymbol && !!selectedSymbolYTDSummary &&
          selectedSymbolLTFSummary && chartConfig.isOverlayLabeled && <>
          <ChartWindowOverlayLabels state={{selectedSymbolLTFSummary, selectedSymbolYTDSummary}} />
          
        </>}
        <div className="w-90  pos-rel bord-r-25 h-100" >
          <div className='bord-r-25 w-100 noverflow bg-b-50 bg-glass-50  h-100'
            style={{boxShadow:"inset 5px 8px 5px #ffffff10, 4px 4px 10px #000000"}}
          >
            <ModelGameStage config={chartConfig} state={{
              ltfClosingList, ltfList, isChartLoading,
              favs: lsData.LS_favs,
              
              selectedSymbolYTDSummary,
              selectedSymbolLTFSummary,

              htfList,
              htfClosingList,
              ytdObj, focusSymbol,
              tradeLogsObj, isFetchingLogs,
            }}
              calls={{}}
            >
              <div>
                
              </div>
            </ModelGameStage>
          </div>
          
      <button className="pos-abs translate-y-50 border-white-50 Q_xs  bottom-0 right-0 pa-1 pb-2 opaci-chov--50 bg-b-90 noborder bord-r-50 tx-lgx"
            onClick={()=>{triggerOpenModal()}}
          >
            ⭐
          </button>
        </div>
        {!fuelPoints && 
          <div className="flex pointer pos-abs top-0 " style={{right:"10%"}}>
            <button className="opaci-chov--50 bg-b-90 py-1 bord-r-50 tx-mdl tx-white px-3 " 
              onClick={()=>s__fuelPoints(1)}
            >
              Start
            </button>
          </div>
        }
        <div className="pos-abs z-300" style={{bottom:"-25px", left:"10%"}}>
          <ChartWindowSubMenu state={{fuelPoints}} calls={{s__fuelPoints}} 
            chartConfig={chartConfig}
          />
          
        </div>
      </div>
        {!!chartConfig.isNotesVisible &&
          <div className="Q_xl_x w-20 flex-col gap-3">
            <div className='Q_xl_x w-100 box-shadow-9-b block bg-glass-50 bord-r-25 tx-center neu-concave flex-col flex-justify-start py-4'>
              <div className="pb-4">Market Summary</div>
              <div className="flex-col w-90">
                <MarketNewsStage />
              </div>
            </div>
            <div className='Q_xl_x w-100 box-shadow-9-b block bg-glass-50 bord-r-25 tx-center neu-concave flex-col flex-justify-start py-4'>
              <div className="pb-4">Daily Log</div>
              <div className="flex-col w-90">
                <DailyLog state={{LS_notes:lsData.LS_notes, maxChars:20}} calls={{s__LS_notes: lsData.s__LS_notes}} />
              </div>
            </div>
          </div>
        }
      <div className='Q_sm_x px-4 w-20 gap-3 pos-rel block flex-col flex-justify-start tx-center'>
          
        <div className='Q_md_lg w-100 box-shadow-9-b block bg-glass-50 bord-r-25 tx-center neu-concave flex-col flex-justify-start py-4'>
          <div className="pb-4">Market Summary</div>
          <div className="flex-col w-90">
            <MarketNewsStage />
          </div>
        </div>
        <div className='Q_sm_x w-100 h-100 pos-rel block px-4  bord-r-25 tx-center'>
          <div className=' tx-center bg-glass-50 h-100 bord-r-25 neu-convex  flex-col flex-justify-start'>
            <div className="Q_md_x py-2"></div> 
            <div className="Q_sm py-2"></div> 
            <div className="py-4 flex-center gap-3">
              <div className="Q_md_x">Favorites</div> 
              <div className="Q_xs_md">Fav</div> 
              {!!fuelPoints && <div>
                <div className="blink_me pa-1 _ddg bord-r-50 "></div>
              </div>}
            </div>
            <div className="flex-col w-90 pb-4">
              <FavoritesTab state={{
                  LS_favs:lsData.LS_favs,urlStateKeys:urlp.keysArray, urlState: urlp.gridData,
                  ytdObj, fuelPoints, focusSymbol, isChartLoading,
                  pricesObj, 
                }} 
                calls={{s__LS_favs: lsData.s__LS_favs, s__focusSymbol, s__isChartLoading, isLogsFilled}} 
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
    <div className=' flex-1 flex flex-align-start mt-6 tx-white w-90 z-10'>
      
      {chartConfig.isLeftSidebarVisible &&
        <div className='Q_sm_x w-10 block  Q_md_x  bord-r-25 tx-center '>
          <button className='w-100  tx-white tx-lg tx-center bg-glass-50 h-100 bord-r-25 py-4 pb-5 neu-convex opaci-chov--50 border-white tx-altfont-1'>
            🎮 <div className="Q_lg_x">Games</div> 
          </button>
        </div>
      }
      <div className='flex-1 flex-col mt-8 pb-8'>
        <BuySellButtons />
      </div>
      <div className='Q_xl_x w-25 mt-8  flex-col block   tx-center  '>
        <div className="neu-convex py-4 px-8 bord-r-25 box-shadow-9-b">
          Live Orders
        </div>
        <div className="pa-8">
          <div className="tx-lx opaci-10">Not Found</div>
        </div>
      </div>
      
      <div className='Q_md_x w-20 mt-8 block bg-glass-20 bord-r-25 tx-center  neu-concave'>
        <details className="w-100  ">
          <summary className="flex py-4 opaci-chov--50">
            <div className="px-8">Account</div>
          </summary>
          <div>
            <h6>Sync</h6>
          </div>
        </details>
      </div>

      
    <div className='Q_sm mt-8 w-10 block flex-col gap-3 bord-r-25 tx-center '>
      <button className='w-100  tx-white tx-lg tx-center bg-glass-50 h-100 bord-r-10 py-4 neu-convex opaci-chov--50 border-white tx-altfont-1'>
          Acc <div className="Q_md_x">Acc</div> 
        </button>
        <button className='w-100 pb-5 tx-white tx-lg tx-center bg-glass-50 h-100 bord-r-25 py-4 neu-convex opaci-chov--50 border-white-50 tx-altfont-1'>
          🎮 <div className="Q_md_x">Games</div> 
        </button>
      </div>
    </div>

    <ODivider className="Q_xs_md w-90 my-4" />

    
    <div className='Q_xs w-90 z-200  box-shadow-9-b block bg-glass-50 bord-r-25 tx-center neu-concave flex-col flex-justify-start py-4'>
        <div className="pb-4 tx-white tx-lg">Market Summary</div>
        <div className="flex-col w-90">
          <MarketNewsStage />
        </div>
      </div>

    <div className="flex-wrap w-100 mt-8  gap-2 z-100">
      <div className='Q_xs_md  w-30 mb-8 pb-100 box-shadow-9-b bg-glass-20 bord-r-25 pt-4 bg-w-10 flex-col flex-justify-start tx-white'>
        <div className="pb-4 tx-lg tx-center">URL <br /> Grid</div>
        <div className="flex-col w-90 tx-lg">
          <URLGridTab state={{urlStateKeys:urlp.keysArray, urlState: urlp.gridData,baseToken:urlp.reftoken}}
            calls={{addTileToUrl}}
          />
        </div>
      </div>
      
      <div className='Q_sm w-50 z-200 box-shadow-9-b block bg-glass-50 bord-r-25 tx-center neu-concave flex-col flex-justify-start py-4'>
        <div className="pb-4">Market Summary</div>
        <div className="flex-col w-90">
          <MarketNewsStage />
        </div>
      </div>
      <div className='Q_xs_sm w-40  pos-rel block px-4  bord-r-25 tx-center tx-white mb-8 z-200'>
        <div className=' tx-center  pa-2 pb-6  bg-glass-50 h-100 bord-r-25 neu-convex flex-col flex-justify-start'
          style={{
            boxShadow:"-2px -2px 4px -2px #ffffff44",

          }}
        >
          <div className=" flex-center gap-3 py-4">
            <div className="tx-lgx Q _md_x">Favorites</div> 
            {/* <div className="Q_xs_md">Fav</div>  */}
            {!!fuelPoints && <div>
              <div className="blink_me pa-1 _ddg bord-r-50 "></div>
            </div>}
          </div>
          <div className="flex-col w-90">
            <FavoritesTab state={{
                LS_favs:lsData.LS_favs,urlStateKeys:urlp.keysArray, urlState: urlp.gridData,
                ytdObj, fuelPoints,
                pricesObj, focusSymbol, isChartLoading,
              }} 
              calls={{s__LS_favs: lsData.s__LS_favs, s__focusSymbol, s__isChartLoading, isLogsFilled}} 
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

    <ODivider className="Q_xs_xl w-90 mt-4" />
    
    <div className='z-200 mb-100 mt-8 pb-100  Q_xs_xl w-90 box-shadow-9-b block bg-glass-50 bord-r-25 tx-center neu-concave flex-col flex-justify-start pt-4'>
        <div className="pb-4">Daily Log</div>
        <div className="flex-col w-90">
          <DailyLog state={{LS_notes:lsData.LS_notes, maxChars:32}} calls={{s__LS_notes: lsData.s__LS_notes}} />
        </div>
      </div>

    </>)
}

