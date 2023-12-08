"use client";

import { useEffect, useState } from "react";


export function FavoritesTab({ state, calls }: any) {
  const [hydrationSafeLoad, s__hydrationSafeLoad] = useState(0);

  const triggerCloneFromUrl = ()=>{
    const returnObj:any = []
    state.urlStateKeys.map((aKey:string)=>{
      returnObj.push({...state.urlState[aKey], posCode: aKey})
    })
    // console.log("state.urlStateKeys", state.urlStateKeys)
    // console.log("state.urlState", state.urlState)

    // const returnValues = Object.keys(state.urlState).map((item,index)=>({...item, posCode:}))
    calls.s__LS_favs(returnObj)
  }

  useEffect(() => {
    s__hydrationSafeLoad(hydrationSafeLoad + 1);
  }, []);

  const triggerChangeSymbol = (aSymbol:string) => {
    if (state.focusSymbol == aSymbol) { return }
    calls.s__isChartLoading(true)
    calls.s__focusSymbol(aSymbol)
  }

  
  if (!hydrationSafeLoad) {
    return (<></>);
  }
  if (!state.LS_favs || (!!state.LS_favs && !state.LS_favs.length)) {
    return (<>
      <div className="pt-8 tx-bold-8 opaci-10 tx-ls-2 tx-lg"> Not <br /> Found</div>
      {state.urlStateKeys && !!state.urlStateKeys.length && 
        <button onClick={triggerCloneFromUrl}
          className="mt-8 border-white pa-1 px-2 opaci-chov--50 bg-w-10 tx-white noborder bord-r-10 tx-ls-2 tx-md tx-center"
        >
          Clone Url Config
        </button>
      }
    </>);
  }
  return (<>
    <div className=" w-100  flex-col gap-1">

      {state.LS_favs.map((item: any, index: number) => {
        if (!state?.pricesObj) {return (<></>)}
        if (!state?.ytdObj) {return (<></>)}
        if (!state?.ytdObj[item.symbol]) {return (<></>)}

        const liveDiff = state.pricesObj[item.symbol] - state.ytdObj[item.symbol].output.lastOpen
        const liveChangePercent = (liveDiff) / state.pricesObj[item.symbol] * 100
        return (<><div key={`${index}---`} className="Q_xs_md py-2 pt-3 w-100"></div><div key={index} className=" w-100">
          <div className=" opaci-chov--50 pos-rel bord-r-10 pa-3 flex flex-justify-between "
            onClick={()=>{triggerChangeSymbol(item.symbol)}}
            style={{ background: "linear-gradient(45deg, #ffffff03, #ffffff11", ...({border: state.focusSymbol == item.symbol ? "1px dotted white" : ""}) }}
          >
            <div className="tx-bold-9 tx-start Q_lg_x">
              {item.token0}
            </div>
            <div className="pos-abs top-0 tx-bold-9 tx-start Q_xs_lg bg-w-10 bord-r-10 px-3 py-1 translate-y--75 tx-bold-8 tx-sans tx-ls-3">
              {item.token0}
            </div>
            
            {!!state.pricesObj && <>
              <div className="tx-mdl tx-roman flex-center gap-1 flex-1">
                <div className="opaci-20 Q_lg_x"> $ </div>
                <div className="tx-center">{state.pricesObj[item.symbol]}</div>
              </div>
            </>}
            {/* {!!state.ytdObj && <>
              <div className="tx-lg tx-roman flex-center gap-1">
                <div className="opaci-20"> $ </div>
                {parseFloat(state.ytdObj[item.symbol].output.lastOpen).toFixed(2)}
              </div>
            </>} */}
            {!!state.ytdObj && <>
              <div className={`Q_md_x tx-lg box-shadow-9-b pa-1 bord-r-10 bg-w-10 tx-sans flex-center gap-1
                ${liveChangePercent < 0 ? "tx-red" : "tx-green"}`}>
                {parseInt(`${liveChangePercent*100}`)/100}
                {/* <div className="opaci-20"> % </div> */}
              </div>
              <div className={`Q_xs_md tx-smd box-shadow-9-b pa-1 bord-r-10 bg-b-90 tx-sans flex-center gap-1
                pos-abs right-0 translate-x-50
                ${liveChangePercent < 0 ? "tx-red" : "tx-green"}`}>
                {parseInt(`${liveChangePercent*100}`)/100}
                {/* <div className="opaci-20"> % </div> */}
              </div>
            </>}
            {!state.pricesObj && <>
              <div>
                -
              </div>
            </>}
          </div>
        </div></>);
      })}
    </div>
  </>);
}
