"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import crypto from "crypto";
import { computeHash } from '@/../script/util/webhelp'
import { useMap, MapOrEntries, useMediaQuery, useCopyToClipboard } from 'usehooks-ts';
import { FavSymbols } from "../FavSymbols";
// import { updatePublicSecretKey } from "../../../script/state/service/local";
import { StandardTokensGradients } from "@/../script/constant/klines";
import { PANEL_KEY_LIST } from "../../../../script/util/hook/useUrlParamCatcher";

export function SelectedModalContent({ state, calls }: any) {
  const [selectedSymbol, s__selectedSymbol] = useState("")
  const _StandardTokensGradients:any = { ...StandardTokensGradients}

  const triggerSelectPair = (thePair:string) => {
    
    // let pricePrompt = prompt('Enter prices (Optional)')
    // if ( !pricePrompt) {
    //   return 
    // }
    
    
    let firstAvailablePanel = PANEL_KEY_LIST.find((aPanelKey:string)=>(
      (!state.urlStateKeys.includes(aPanelKey)) 
        // firstAvailablePanel = aPanelKey
      
    ))


    // alert("newSymbol: "+ newSymbol)
    calls.addTileToUrl(thePair, firstAvailablePanel)
  }


  return (<>
    <div className="flex-col w-100 bg-b-50 bord-r-25 box-shadow-9-b flex-1 ">
        
    <button className="Q_sm_x pos-abs tx-altfont-0 tx-altfont-1 px-4 ma-2 mr-0 top-0 left-0 nodeco pa-3 opaci-chov--50 bg-b-90 noborder  bord-r-50 tx-white tx-lx"
            style={{boxShadow:"-2px -2px 4px -2px #ffffff44"}}
            onClick={()=>{window.location.reload()}}
          >
            WebPOV: <small className="tx-mdl">Select a Pair</small>
          </button>
        <button className="Q_xs pos-abs tx-altfont-0 tx-altfont-1 px-4 ma-2 mr-0 top-0 left-0 nodeco pa-3 opaci-chov--50 bg-b-90 noborder  bord-r-50 tx-white tx-lg"
            style={{boxShadow:"-2px -2px 4px -2px #ffffff44"}}
            onClick={()=>{window.location.reload()}}
          >
            WebPOV: <small className="tx-mdl">Select a Pair</small>
          </button>
        <button className="pos-abs top-0 right-0 pa-3 ma-2 ml-0 opaci-chov--50 bg-b-90 noborder bord-r-50 tx-white tx-lx"
            onClick={()=>{
              let theDom:any = document.getElementById("main_scrollable_content")
              if (!theDom) { return }
              theDom.className = theDom?.className.replace("noverflow h-max-100vh","")
              calls.s__isSelectedModalOpen(false)
            }}
          >
            X
          </button>

        <div className="w-100 flex-col tx-white py-8  flex-justify-start  autoverflow-y"
          style={{maxHeight:"70vh"}}
        >
            <div className="flex-wrap h-100 gap-2">
            {!!state.pairs && state.pairs.map((item:any,index:number)=>{
              const baseToken = "usdt".toUpperCase()
              console.log("state.urlStateKeys", state.urlState)
              const theSymbolsOfUrl = state.urlStateKeys.map((aPosCode:string)=>{
                return state.urlState[aPosCode].symbol
              })
              console.log("theSymbolsOfUrl", theSymbolsOfUrl)
              const foundToken = theSymbolsOfUrl.includes(`${item}${baseToken}`.toUpperCase()) 
              console.log("state", item, foundToken)
                // conso
                // {state.urlStateKeys.includes(state.gridData[item].posCode)}
                if (foundToken) {
                  return (<div key={index}></div>)
                }
                return (<div key={index}
                    onClick={()=>{triggerSelectPair(`${item}${baseToken}`)}}
                >
                    <div className="tx-lx   bord-r-100"
                        style={{padding:"1px", 
                        background:`linear-gradient(0deg, ${_StandardTokensGradients[item] || "#998877,#447799"})`}}
                    >
                        <div className="w-150px h-150px bord-r-100 bg-black flex-center opaci-chov--75">
                            {item}
                            
                        </div>
                    </div>
                    
                </div>)
            })}
            </div>
        </div>
      </div>
  </>);
}
