"use client";

import { StandardTokens } from "../../../script/constant/klines";
import { PANEL_KEY_LIST } from "../../../script/util/hook/useUrlParamCatcher";


export function TradeHistory({ state, calls }: any) {
  const triggerAddTileToUrl = (e:any) => {
    const newSymbol:any = prompt("Enter symbol","ETH"+state.baseToken)?.toUpperCase()
    if (!newSymbol) { return }

    const pairsArray = StandardTokens.map((item)=>(item+state.baseToken))
    // console.log("newSymbol: "+ newSymbol, pairsArray)
    if (!pairsArray.includes(newSymbol)) { return }

    let firstAvailablePanel = PANEL_KEY_LIST.find((aPanelKey:string)=>(
      (!state.urlStateKeys.includes(aPanelKey)) 
        // firstAvailablePanel = aPanelKey
      
    ))
    // console.log("first panel is ", firstAvailablePanel)

    // alert("newSymbol: "+ newSymbol)
    calls.addTileToUrl(newSymbol, firstAvailablePanel)
  }

  if (!state.urlStateKeys || (!!state.urlStateKeys && !state.urlStateKeys.length)) {
    return (<>
      {/* <div className="pt-8 tx-bold-8 opaci-10 tx-ls-2 tx-lg"> Not <br /> Found</div> */}
      
      {
        <button onClick={triggerAddTileToUrl}
          className="mt-8 border-white pa-1 px-2 opaci-chov--50 bg-w-10 tx-white noborder bord-r-10 tx-ls-2 tx-md tx-center"
        >
          Add
        </button>
      }
    </>);
  }
  return (<>
    <div className=" w-100  flex-col gap-1">

      {state.urlStateKeys.map((item: any, index: number) => {
        return (<div key={index} className=" w-100">
          <div className=" opaci-chov--50 bord-r-10 pa-3 "
            style={{ background: "linear-gradient(45deg, #ffffff03, #ffffff11" }}
          >
            <div className="tx-bold-9">
              {state.urlState[item] && <>
                {state.urlState[item].token0}
              </>}
            </div>
          </div>
        </div>);
      })}
      {state.urlStateKeys.length && <div className="pos-abs bottom-0 pb-2 flex-center gap-1">
          <a className=" opaci-chov--50" href="/">
            <button className="tx-white bg-b-10 bord-r-10 px-2 pointer">
              Clear
            </button>
          </a>
          <button onClick={triggerAddTileToUrl} className=" opaci-chov--50 tx-white bg-b-10 bord-r-10 px-2">
            Add
          </button>
          
        </div>
      }
    </div>
  </>);
}
