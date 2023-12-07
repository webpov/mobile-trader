import { useLocalStorage } from "usehooks-ts"



export default function useLocalStorageCatcher() {
  const [LS_notes, s__LS_notes] = useLocalStorage("dailyLog",[])
  const [LS_favs, s__LS_favs] = useLocalStorage("favSymbols",[])
  
  const [LS_publicSecretKeys, s__LS_publicSecretKeys] = useLocalStorage("publicSecretKeys","")

  return {
    LS_notes, s__LS_notes,      
    LS_favs, s__LS_favs,      
    LS_publicSecretKeys, s__LS_publicSecretKeys,
  }
}