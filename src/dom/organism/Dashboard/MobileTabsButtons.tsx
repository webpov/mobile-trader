
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
          <button className={` bg-glass-10 bg-w-10 neu-convex tx-white tx-lx  pa-2 bord-r-25 noborder ${borderIfSelected("chart")}`}
            onClick={()=>triggerChangeTab("chart")}
          >
            📈
          </button>
        <div className="flex-center">
          <button className={` bg-glass-10 bg-w-10 neu-convex tx-white tx-lx  pa-2 bord-r-25 noborder ${borderIfSelected("notes")}`}
            onClick={()=>triggerChangeTab("notes")}
          >
            📖
          </button>
        </div>
        <div className="flex-center">
          <button className={` bg-glass-10 bg-w-10 neu-convex tx-white tx-lx  pa-2 bord-r-25 noborder ${borderIfSelected("market")}`}
            onClick={()=>triggerChangeTab("market")}
          >
            📱
          </button>
        </div>
          <button className={` bg-glass-10 bg-w-10 neu-convex tx-white tx-lx  pa-2 bord-r-25 noborder ${borderIfSelected("favs")}`}
            onClick={()=>triggerChangeTab("favs")}
          >
            ✨
          </button>
      </div>
    </>)
  }

  export default MobileTabsButtons