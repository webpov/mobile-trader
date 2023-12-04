"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";


export function FavSymbols({ state, calls }: any) {
  const [hydrationSafeLoad, s__hydrationSafeLoad] = useState(0);
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
  if (!hydrationSafeLoad) {
    return (<></>);
  }
  return (<>
    <div className=" w-200px  flex-col gap-1">
      {!!state.LS_favs.length &&
        <button className={`tx-white ${"tx-mdl"} opaci-chov--50 bg-w-10 bord-r-25 pa-2 mb-2`}
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
    </div>
  </>);
}
