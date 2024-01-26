"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import crypto from "crypto";
import { computeHash } from '@/../script/util/webhelp'
import { useMap, MapOrEntries, useMediaQuery, useCopyToClipboard } from 'usehooks-ts';
import { FavSymbols } from "../FavSymbols";
// import { updatePublicSecretKey } from "../../../script/state/service/local";

export function FavModalContent({ state, calls }: any) {
  
  return (<>
    <div className="flex-col w-100 bg-b-50 bord-r-25 box-shadow-9-b flex-1 ">
        
    <button className="Q_sm_x pos-abs tx-altfont-0 tx-altfont-1 px-4 ma-2 mr-0 top-0 left-0 nodeco pa-3 opaci-chov--50 bg-b-90 noborder  bord-r-50 tx-white tx-lx flex "
            style={{boxShadow:"-2px -2px 4px -2px #ffffff44"}}
            onClick={()=>{window.location.reload()}}
          >
            <div className="px-3 block"></div> <div className="tx-mdl">Stored Favorites</div>
          </button>
        <button className="Q_xs pos-abs tx-altfont-0 tx-altfont-1 px-4 ma-2 mr-0 top-0 left-0 ml-8 nodeco py-2 opaci-chov--50 bg-b-90 noborder  bord-r-50 tx-white tx-lg flex "
            style={{boxShadow:"-2px -2px 4px -2px #ffffff44"}}
            onClick={()=>{window.location.reload()}}
          >
            <div className="px-1 block"></div> <div className="tx-mdl">Stored Favorites</div>
          </button>
        <button className="pos-abs top-0 right-0 pa-3 ma-2 ml-0 opaci-chov--50 bg-b-90 noborder bord-r-50 tx-white tx-lx"
            onClick={()=>{
              let theDom:any = document.getElementById("main_scrollable_content")
              if (!theDom) { return }
              theDom.className = theDom?.className.replace("noverflow h-max-100vh","")
              calls.s__isLocalStorageModalOpen(false)
            }}
          >
            X
          </button>

        <div className="w-100 flex-col">
          {state.LS_favs && <>
            <FavSymbols
              state={{
                pricesObj: state.pricesObj,
                ltfClosingList: state.ltfClosingList,
                urlStateKeys: state.urlStateKeys,
                LS_favs:state.LS_favs,
                LS_publicSecretKeys: state.LS_publicSecretKeys,
                focusSymbol: state.focusSymbol,
                isChartLoading: state.isChartLoading,
                tradeLogsObj: state.tradeLogsObj,
                ytdObj: state.ytdObj,
                isFetchingLogs: state.isFetchingLogs,
                fuelPoints: state.fuelPoints,
              }} 
              calls={{
                triggerImportLogs: calls.triggerImportLogs,
                triggerExportLogs: calls.triggerExportLogs,
                s__fuelPoints: calls.s__fuelPoints,
                editSingleToken: calls.editSingleToken,
                s__LS_favs: calls.s__LS_favs,
                s__LS_publicSecretKeys: calls.s__LS_publicSecretKeys,
                s__isFetchingLogs: calls.s__isFetchingLogs,
                s__focusSymbol: calls.s__focusSymbol,
                s__isChartLoading: calls.s__isChartLoading,
                s__tradeLogsObj: calls.s__tradeLogsObj,
                triggerGetLogs: calls.triggerGetLogs,
                exportLogs: calls.exportLogs,
                isLogsFilled: calls.isLogsFilled,
                triggerCloneFromUrl: calls.triggerCloneFromUrl,
              }}
            />
          </>}
        </div>
      </div>
  </>);
}
