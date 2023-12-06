import { useEffect, useState } from "react"
import { getCurrentPrices, getFuturesPricesList, getPricesList, getRelevantChartData } from "../helper/kline";

export default function useChartConfig({urlp,state,calls}:any) {
    const [isGizmoVisible, s__isGizmoVisible] = useState<any>(false)
    const [isTrendUp, s__isTrendUp] = useState<any>(true)

  


    // useEffect(() => {
    //     console.log("state.urlp", urlp)
    // }, [urlp]);

    return {
        isGizmoVisible, s__isGizmoVisible,
        isTrendUp, s__isTrendUp,
    }
}
