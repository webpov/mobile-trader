"use client"

import ModelGameStage from "@/model/level/ModelGameStage"
import { useUrlParamCatcher } from "@/../script/util/hook/useUrlParamCatcher"
import useChartConfig from "../../../script/util/hook/useChartConfig"
import useLocalStorageCatcher from "../../../script/util/hook/useLocalStorageCatcher"
import { TradeHistory } from "./TradeHistory"
import { FavoritesTab } from "./FavoritesTab"
import { DailyLog } from "./DailyLog"
import { SymbolNameHeader } from "./SymbolNameHeader"
import { useState } from "react"
import { FavSymbols } from "./FavSymbols"
import useSyncedKLines from "../../../script/util/hook/useSyncedKLines"

export default function AppFrameStage({}:any) {
  const lsData:any = useLocalStorageCatcher()
  const urlp = useUrlParamCatcher()
  const chartConfig = useChartConfig({})
  const [isLocalStorageModalOpen, s__isLocalStorageModalOpen] = useState(false)

  const addTileToUrl = (tileCode:string, posCode:string) => {
    urlp.addTile(tileCode, posCode)
  }

  const {
      fuelPoints, s__fuelPoints,
      ytdObj, s__ytdObj,
      pricesObj, s__pricesObj,
      isChartLoading, s__isChartLoading,
      ltfList, s__ltfList,
      ltfClosingList, s__ltfClosingList,
      htfList, s__htfList,
      htfClosingList, s__htfClosingList,
      // fullmidtermList, s__fullmidtermList,
  } = useSyncedKLines({state:{
    favs: lsData.LS_favs,
    symbol:urlp.symbol,
    ltf:urlp.ltf,
    htf:urlp.htf,
  }})
  
  return (<>


    {isLocalStorageModalOpen &&
      <div className="pos-abs z-100 w-100vw h-100vh bg-glass-10 bg-b-50 flex-col tx-white">
        
        <button className="pos-abs top-0 left-0 nodeco pa-3 opaci-chov--50 bg-b-90 noborder bord-r-50 tx-white tx-lx"
            onClick={()=>{window.location.reload()}}
          >
            WebPOV
          </button>
        <button className="pos-abs top-0 right-0 pa-3 opaci-chov--50 bg-b-90 noborder bord-r-50 tx-white tx-lx"
            onClick={()=>{s__isLocalStorageModalOpen(false)}}
          >
            X
          </button>
        <div>
          {lsData.LS_favs && <>
            <FavSymbols state={{LS_favs:lsData.LS_favs}} calls={{s__LS_favs: lsData.s__LS_favs}} />
          </>}
        </div>
      </div>
    }
  
    <div className='pos-abs w-100 flex-col noverflow h-100vh z-2 ' style={{width: '100vw',}}>
      <div className={`${chartConfig.isTrendUp ? "_ddg" : "_ddr"} h-50 w-100 bord-r-100p spin-60 blur opaci-10 `} 
        style={{filter:"blur(200px)"}}
      >
      </div>
    </div>
    <div className='flex-row  tx-white  Q_lg_x  w-90 z-10'>
      <div className='Q_lg_x w-10'></div>
      <h1 className=" flex-1 mb-0 pb-0 pl-100 block"><SymbolNameHeader label={urlp.symbolToken0} /></h1>
    </div>
    <div className='flex-row flex-align-stretch  w-100 Q_xs_lg z-10 tx-white'>
      <h2 className="mb-0 pb-0"><SymbolNameHeader label={urlp.symbolToken0} /></h2>
    </div>
    <div className='flex-row flex-align-stretch tx-white w-90 z-10'>
      <div className='Q_lg_x w-10 box-shadow-9-b bg-glass-20 bord-r-25 pt-4 neu-convex flex-col flex-justify-start'>
        <div className="pb-4">Watch List</div>
        <div className="flex-col w-90">
          <TradeHistory state={{urlStateKeys:urlp.keysArray, urlState: urlp.gridData,baseToken:urlp.reftoken}}
            calls={{addTileToUrl}}
          />
        </div>
      </div>
      <div className=' flex-1 mt-4 flex-center pos-rel'>
        <div className="w-90   bord-r-25 " >
          <div className='bord-r-25 w-100 noverflow bg-b-50 bg-glass-50  '
            style={{boxShadow:"inset 5px 8px 5px #ffffff10, 4px 4px 10px #000000"}}
          >
            <ModelGameStage config={chartConfig} state={{
              ltfClosingList, ltfList, isChartLoading,
            }} children={<></>} />
          </div>
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
        <div className="pos-abs " style={{bottom:"-25px", left:"10%"}}>
          <details className="">
            <summary className="flex opaci-chov--50 pos-abs bottom-0">
              <button className=" bg-b-90 py-1 bord-r-50 tx-mdl noclick">
                ⚙️
              </button>
            </summary>
            <div className="pa-2 bg-b-90 bord-r-10 mb-8 bg-glass-10 box-shadow-9-b">
              <div className="flex-col w-200px">
                {/* <button className="flex tx-mdl pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={()=>{
                  chartConfig.s__isGizmoVisible(!chartConfig.isGizmoVisible)
                }}>
                  <div>Use Gizmo</div>
                  <div className={`${chartConfig.isGizmoVisible ? "tx-green" : "tx-red"} tx-altfont-4`}>{chartConfig.isGizmoVisible ? "True" : "False"}</div>
                </button> */}
                <button className="flex tx-mdl pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={()=>{
                  chartConfig.s__isTrendUp(!chartConfig.isTrendUp)
                }}>
                  <div>Trend Up</div>
                  <div className={`${chartConfig.isTrendUp ? "tx-green" : "tx-red"} tx-altfont-4`}>{chartConfig.isTrendUp ? "True" : "False"}</div>
                </button>

                
              {!!fuelPoints && 
                <div className="flex pointer ">
                  <button className="opaci-chov--50 bg-b-90 py-1 bord-r-50 tx-mdl tx-white px-3 " 
                    onClick={()=>s__fuelPoints(0)}
                  >
                    Stop
                  </button>
                </div>
              }
              
              </div>
            </div>
          </details>
        </div>
      </div>
      <div className='Q_xl_x w-20 box-shadow-9-b block bg-glass-50 bord-r-25 tx-center neu-concave flex-col flex-justify-start pt-4'>
        <div className="pb-4">Daily Log</div>
        <div className="flex-col w-90">
          <DailyLog state={{LS_notes:lsData.LS_notes}} calls={{s__LS_notes: lsData.s__LS_notes}} />
        </div>
      </div>
      <div className='Q_sm_x w-20 pos-rel block px-4  bord-r-25 tx-center'>
        <div className=' tx-center bg-glass-50 h-100 bord-r-25 neu-convex pt-4 flex-col flex-justify-start'>
          <div className="pb-4 flex-center gap-3">
            <div className="Q_md_x">Favorites</div> 
            <div className="Q_xs_md">Fav</div> 
            {!!fuelPoints && <div>
              <div className="blink_me pa-1 _ddg bord-r-50 "></div>
            </div>}
          </div>
          <div className="flex-col w-90">
            <FavoritesTab state={{
                LS_favs:lsData.LS_favs,urlStateKeys:urlp.keysArray, urlState: urlp.gridData,
                ytdObj, fuelPoints,
                pricesObj, 
              }} 
              calls={{s__LS_favs: lsData.s__LS_favs}} 
            />
          </div>
          <button className="pos-abs top-0 right-0 pa-1 opaci-chov--50 bg-b-90 noborder bord-r-50 tx-lgx"
            onClick={()=>{s__isLocalStorageModalOpen(!isLocalStorageModalOpen)}}
          >
            ⚙️
          </button>
        </div>
      </div>
    </div>
    <div className=' flex-1 flex flex-align-start mt-6 tx-white w-90 z-10'>
      <div className='Q_lg_x w-10  block bg-glass-20 bord-r-25 tx-center  neu-concave'>
        <details className="w-100  ">
          <summary className="flex py-4 opaci-chov--50">
            <div className="px-8">Account</div>
          </summary>
          <div>
            <h6>Test</h6>
          </div>
        </details>
      </div>
      
      <div className='flex-1 flex-wrap gap-3 mt-8 pb-8'>
        <div className="flex-center">
          <button className="opaci-chov--50 neu-convex tx-white tx-lx  pa-3 px-2 bord-r-l-25 border-green tx-altfont-1">
            BUY
          </button>
          <button className="opaci-chov--50 neu-convex tx-white tx-mdl  pa-2 bord-r-r-25 border-green">
            ⚙️
          </button>
        </div>
        <div className="flex-center">
          <button className="opaci-chov--50 neu-convex tx-white tx-lx  pa-3 px-2 bord-r-l-25 border-red tx-altfont-1">
            SELL
          </button>
          <button className="opaci-chov--50 neu-convex tx-white tx-mdl  pa-2 bord-r-r-25 border-red">
            ⚙️
          </button>
        </div>
        <button className="opaci-chov--50 neu-convex tx-white tx-lg  pa-3 py-5 bord-r-25 border-blue tx-bold-8 tx-altfont-1 underline">
          Refresh
        </button>
      </div>
      <div className='Q_xl_x w-20 mt-4 box-shadow-9-b block bg-glass-50 bord-r-25 tx-center py-4 neu-convex'>
        Live Orders
      </div>
      <div className='Q_sm_x w-10 block mt-4 px-4  bord-r-25 tx-center '>
        <button className='w-100 tx-white tx-lg tx-center bg-glass-50 h-100 bord-r-25 py-4 neu-convex opaci-chov--50 border-white tx-altfont-1'>
          🎮 <div className="Q_md_x">Games</div> 
        </button>
      </div>
    </div>
    </>)
}