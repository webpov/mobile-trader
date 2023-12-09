import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

const defaultPanelCell = {

}
export const PANEL_KEY_LIST = [
  'a0',
  'a1',
  'a2',
  'a3',
  'b0',
  'b1',
  'b2',
  'b3',
  'c0',
  'c1',
  'c2',
  'c3',
  'd0',
  'd1',
  'd2',
  'd3',
  'e0',
  'e1',
  'e2',
  'e3',
]
export function useUrlParamCatcher() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const reftoken = searchParams.get('reftoken') || "USDT"
  // const symbol = searchParams.get('symbol') || "BTC"+reftoken
  const ltf = searchParams.get('symbol') || "15m"
  const htf = searchParams.get('symbol') || "1d"

  
  const panel_a0 = searchParams.get('a0')
  const panel_a1 = searchParams.get('a1')
  const panel_a2 = searchParams.get('a2')
  const panel_a3 = searchParams.get('a3')
  const panel_b0 = searchParams.get('b0')
  const panel_b1 = searchParams.get('b1')
  const panel_b2 = searchParams.get('b2')
  const panel_b3 = searchParams.get('b3')
  const panel_c0 = searchParams.get('c0')
  const panel_c1 = searchParams.get('c1')
  const panel_c2 = searchParams.get('c2')
  const panel_c3 = searchParams.get('c3')
  const panel_d0 = searchParams.get('d0')
  const panel_d1 = searchParams.get('d1')
  const panel_d2 = searchParams.get('d2')
  const panel_d3 = searchParams.get('d3')
  const panel_e0 = searchParams.get('e0')
  const panel_e1 = searchParams.get('e1')
  const panel_e2 = searchParams.get('e2')
  const panel_e3 = searchParams.get('e3')

  const getPanelListFromUrlByKeys = (panelKeysArray:any) => {
    const panelListResult:any = {}
    for (let index = 0; index < panelKeysArray.length; index++) {
        const element = panelKeysArray[index];
        if (searchParams.has(panelKeysArray[index])) {
            const parsedUrlParam = JSON.parse(`${searchParams.get(panelKeysArray[index])}`)
            if (!!parsedUrlParam.symbol) {
              panelListResult[ panelKeysArray[index]] = parsedUrlParam
            }
        } else {
            panelListResult[ panelKeysArray[index]] = defaultPanelCell
        }
    }
    return panelListResult
  }
  const panelListTop = useMemo(()=>{
    const panelKeys = ["a0","a1","a2", "a3"]
    try {
        const panelListResult:any = getPanelListFromUrlByKeys(panelKeys)
        return panelListResult
      } catch (error) {
      return {}
    }
  },[panel_a0, panel_a1, panel_a2, panel_a3])
  const panelListTopKeys:any = useMemo(()=>{
    const returnVal = (
      Object.keys(panelListTop).filter((item:any)=>(JSON.stringify(panelListTop[item]) !== "{}"))
    )
      return returnVal
  },[panelListTop])



 

  const panelListMidTop = useMemo(()=>{
    const panelKeys = ["b0","b1","b2", "b3"]
    try {
        const panelListResult:any = getPanelListFromUrlByKeys(panelKeys)
        return panelListResult
      } catch (error) {
      return {}
    }

  },[panel_b0, panel_b1, panel_b2, panel_b3])
  const panelListMidTopKeys:any = useMemo(()=>{
    const returnVal = (
      Object.keys(panelListMidTop).filter((item:any)=>(JSON.stringify(panelListMidTop[item]) !== "{}"))
    )
      return returnVal
  },[panelListMidTop])









  const panelListMid = useMemo(()=>{

  },[panel_d0, panel_d1, panel_d2, panel_d3])
  const panelListMidKeys:any = useMemo(()=>{
      return []
  },[panelListTop])
  






  



















  const panelListBottom = useMemo(()=>{

  },[panel_c0, panel_c1, panel_c2, panel_c3])
  const panelListBottomKeys:any = useMemo(()=>{
      return []
  },[panelListTop])

  const panelListMidBottom = useMemo(()=>{

  },[panel_e0, panel_e1, panel_e2, panel_e3])
  
  const panelListMidBottomKeys:any = useMemo(()=>{
    return []
},[panelListTop])
    





















const keysArray = useMemo(()=>{
  const returnVal = [
    ...panelListTopKeys,
    ...panelListMidTopKeys,
    ...panelListMidKeys,
    ...panelListMidBottomKeys,
    ...panelListBottomKeys,
  ]
  return returnVal
},[panelListTopKeys, panelListBottomKeys, panelListMidTopKeys, panelListMidBottomKeys, panelListMidKeys])
  const gridData = useMemo(()=>{
    const builtObj:any = {}
    for (let index = 0; index < keysArray.length; index++) {
      const element = keysArray[index];
      // if (!panelListTop[element]) {
      //   console.log("panelListToppanelListTop", element, panelListTop)
      //   continue
      // }
      let refArray:any = {}
      switch (element[0]) {
        case 'a':
          refArray = {...panelListTop}
        break;
        case 'b':
          refArray = {...panelListMidTop}
        break;
      }
      builtObj[element] = refArray[element]
      const token0 = (
        refArray[element].symbol.includes(reftoken)
          ? refArray[element].symbol.replace(reftoken,"")
          : refArray[element].symbol
      )
      builtObj[element].token0 = token0
    }
    return builtObj
  },[keysArray])


  const pathname = usePathname()
  // const symbolToken0 = symbol.includes(reftoken) ? symbol.replace(reftoken,"") : symbol
  const addTile = (tileCode:string, posCode:string)=>{

    const newParams = new URLSearchParams(searchParams.toString())

    const cellObj:any = {symbol:tileCode}
    const promtFloor = prompt("Enter floor price", "1")
    if (!!promtFloor) { cellObj.floor = promtFloor }
    const promtRoof = prompt("Enter roof price", "10")
    if (!!promtRoof) { cellObj.roof = promtRoof }
    newParams.set(posCode, JSON.stringify(cellObj))

    const newParamsString = newParams.toString();
    router.push(`${pathname}?${newParamsString}`);
    // router.push({
    //   pathname:"/",
    //   query:{
    //     [posCode]: JSON.stringify({symbol:tileCode})
    //   }
    // })
  }

  return {
    addTile,
    // symbolToken0,
    reftoken,
    // symbol,
    ltf,
    htf,
    keysArray,
    gridData,





    



    panelListTop,
    panelListTopKeys,    
    panelListBottom,
    panelListBottomKeys,
    

    panelListMid,
    panelListMidKeys,

    
    panelListMidTop,
    panelListMidTopKeys,
    panelListMidBottom,
    panelListMidBottomKeys,    
  }
}