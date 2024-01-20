import Image from 'next/image'
export const MobileTabsButtons = ({state, calls}:any) => {

    const borderIfSelected = (aTab:string) => {
        if (!state) { return "" }
        if (state.activeMobileTab == aTab) {
            return "border-white "
        }
        return "opaci-chov--75 "
    }   
    const triggerChangeTab = (aTab:string) => {
        if (!calls) { return "" }
        if (state.activeMobileTab == aTab) {
            return
        }
        calls.s__activeMobileTab(aTab)
    }
    return (<>
      <div className="flex-wrap gap-2  ">
        <div className="flex-col gap-1">
          
      <a href="https://webpov.vercel.app/" className="nodeco block opaci-chov--50 tx-white  flex-row Q_xs_flex-col top-0 tx-md tx-bold-8 tx-ls-1 ">
      <img src="/webpovlogo.jpg" className="border-white spin-60 bord-r-100p" width="50" height="50"  />
        {/* <span className="tx-altfont-5">Web</span>
        <span className="">Trade</span> */}
    </a>
    <a href="https://wpack.vercel.app/">
      <Image alt='pack' src="/www.jpg" className=" bord-r-100p" width="50" height="50"  />
            </a>
        </div>
          <button className={`flex-col bg-glass-10 bg-w-10 neu-convex tx-white   pa-2 bord-r-25 noborder ${borderIfSelected("chart")}`}
            onClick={()=>triggerChangeTab("chart")}
          >
            <div className="tx-lx">📈</div>
            <div>Chart</div>
          </button>
        <div className="flex-center">
          <button className={`flex-col bg-glass-10 bg-w-10 neu-convex tx-white   pa-2 bord-r-25 noborder ${borderIfSelected("notes")}`}
            onClick={()=>triggerChangeTab("notes")}
          >
            <div className="tx-lx">📖</div>
            <div>Notes</div>
          </button>
        </div>
        {/* <div className="flex-center">
          <button className={`flex-col bg-glass-10 bg-w-10 neu-convex tx-white   pa-2 bord-r-25 noborder ${borderIfSelected("market")}`}
            onClick={()=>triggerChangeTab("market")}
          >
            <div className="tx-lx">📱</div>
            <div>Market</div>
          </button>
        </div> */}
          <button className={`flex-col bg-glass-10 bg-w-10 neu-convex tx-white   pa-2 bord-r-25 noborder ${borderIfSelected("favs")}`}
            onClick={()=>triggerChangeTab("favs")}
          >
            <div className="tx-lx">✨</div>
            <div>Favorites</div>
          </button>
      </div>
    </>)
  }

  export default MobileTabsButtons