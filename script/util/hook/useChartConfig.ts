import { useEffect, useState } from "react"
import { getCurrentPrices, getFuturesPricesList, getPricesList, getRelevantChartData } from "../helper/kline";

export default function useChartConfig({urlp,state,calls}:any) {
    const [isGizmoVisible, s__isGizmoVisible] = useState<any>(false)
    const [isTrendUp, s__isTrendUp] = useState<any>(true)
    const [isOverlayLabeled, s__isOverlayLabeled] = useState<any>(true)
    const [isChartMovable, s__isChartMovable] = useState<any>(false)
    const [isLeftSidebarVisible, s__isLeftSidebarVisible] = useState<any>(true)
    const [isNotesVisible, s__isNotesVisible] = useState<any>(true)

  


    // useEffect(() => {
    //     console.log("state.urlp", urlp)
    // }, [urlp]);

    return {
        isGizmoVisible, s__isGizmoVisible,
        isTrendUp, s__isTrendUp,
        isOverlayLabeled, s__isOverlayLabeled,
        isChartMovable, s__isChartMovable,
        isNotesVisible, s__isNotesVisible,
        isLeftSidebarVisible, s__isLeftSidebarVisible,
    }
}
