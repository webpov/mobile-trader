"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import crypto from "crypto";
import { computeHash } from '@/../script/util/webhelp'

export function FavSymbols({ state, calls }: any) {
  const [hydrationSafeLoad, s__hydrationSafeLoad] = useState(0);
  const [livePassword, s__livePassword] = useState("");
  const pathname = usePathname()


    const triggerClearFavs =()=>{
      calls.s__LS_favs([])
    }
  useEffect(() => {
    s__hydrationSafeLoad(hydrationSafeLoad + 1);
  }, []);
  const triggerExportAsUrl = () => {
    let returnString = ""
    state.LS_favs.map((item:any)=>{
      returnString += `&${item.posCode}=${JSON.stringify({symbol:item.symbol})}`
    })
    let baseUrl = window.location.href.split("?")[0]
    returnString = `${baseUrl}?${returnString.substring(1)}`
    prompt("Export as URL", returnString)
  }


  const triggerSetKeys = () => {
    let publicKey = prompt("Enter public key", "")
    if (!publicKey) { return }
    let secretKey = prompt("Enter secret key", "")
    if (!secretKey) { return }
    let personalCodeKey = prompt("Enter password", "")
    if (!personalCodeKey) { return }
    let wHash = computeHash(`${publicKey}:${secretKey}`, crypto.createHash)
    
  }

  const trigger__publicSecretKeys= (e:any) => {
    console.log("e", e.target.value)
    calls.s__LS_publicSecretKeys(e.target.value)
  }
  const trigger__livePassword= (e:any) => {
    console.log("e", e.target.value)
    s__livePassword(e.target.value)
  }
  const triggerSaveKeys= (e:any) => {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeee")
    if (!state.LS_publicSecretKeys) { return }
    console.log("hhhhhhhhhhhhhhhh")
    if (!livePassword) { return }
    console.log("uuuuuuuuuuuuu")

    const theHash = ""
    let wHash:string = computeHash(state.LS_publicSecretKeys, livePassword, crypto.createHash)
    s__livePassword("")
    console.log("wHash", wHash)
    calls.s__LS_publicSecretKeys(wHash)
  }

  if (!hydrationSafeLoad) {
    return (<></>);
  }
  return (<>
    <div className=" w-90  flex-col gap-1" >
      {!!state.LS_favs.length &&
        <button className={`tx-white ${"tx-mdl"} opaci-chov--50 bg-w-10 bord-r-25 pa-2 mb-2 translate-y--50`}
          onClick={triggerExportAsUrl}
        >
          Export as URL
        </button>
      }
      {state.LS_favs.map((item: any, index: number) => {
        return (<div key={index} className=" w-100">
          <button className=" opaci-chov--50 bord-r-10 pa-3 w-100 noborder tx-white "
            style={{ background: "linear-gradient(45deg, #ffffff03, #ffffff11" }}
          >
            <div className="tx-bold-9  flex flex-justify-between">
              <div className="tx-lg tx-altfont-1">{index + 1}</div>
              <div>{item.token0}</div>
              <div>{!!item.floor && <>
                {item.floor}
              </>}</div>
              <div>{!!item.roof && <>
                {item.roof}
              </>}</div>
            </div>
          </button>
        </div>);
      })}
      {!!state.LS_favs.length &&
        <button className={`tx-white ${"tx-lgx"} opaci-chov--50 bg-w-10 bord-r-25 pa-2 mt-2`}
          onClick={triggerClearFavs}
        >
          Clear
        </button>
      }
      {!state.LS_favs.length &&
        <div className={`tx-white ${"tx-lgx"} opaci-50 tx-lx bg-w-10 bord-r-25 pa-2 mt-2 tx-center`}
          // onClick={triggerClearFavs}
        >
          Not Found
        </div>
      }
      <details className="w-100  flex-col flex-justify-center flex-align-center pb-8">
        <summary className="flex-col opaci-chov--50">
          <hr className="w-90 mt-8" />
          <button className="flex-col bg-trans noborder tx-white tx-mdl py-3 noclick">
            Account Keys
          </button>
        </summary>
        <div className="flex-wrap flex-justify-center gap-2 w-100 flex-align-center">
          <div className="flex-center w-100">
            <input className="bord-r-25 px-3 py-1 bg-w-10 w-100 tx-white tx-center"
              onChange={trigger__publicSecretKeys}
              value={state.LS_publicSecretKeys}
              placeholder="Public:Secret" type="text" 
            />
          </div>
          <div className="flex-center w-80">
            <input className="bord-r-25 px-3 py-1 bg-w-10 w-100 tx-mdl tx-white tx-center"
              onChange={trigger__livePassword}
              value={livePassword}
              placeholder="Password" type="text" 
            />
          </div>
          <div className="w-100 flex-center">
            <button className="tx-lg px-3 py-1 bord-r-10 mt-1 opaci-chov--50"
              onClick={triggerSaveKeys}
            >
              Save
            </button>
          </div>
        </div>
      </details>
    </div>
  </>);
}
