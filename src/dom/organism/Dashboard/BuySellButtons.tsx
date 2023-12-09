
export const BuySellButtons = () => {
    return (<>
      <div className="flex-wrap gap-3  ">
        <div className="flex-center">
          <button className="opaci-chov--50 neu-convex tx-white tx-lx  pa-3 px-2 bord-r-l-25 border-green tx-altfont-1">
            BUY
          </button>
          <button className="opaci-chov--50 neu-convex tx-white tx-mdl  pa-2 bord-r-r-25 border-green">
            ⚙️
          </button>
        </div>
        <div className="flex-center">
          <button className="opaci-chov--50 neu-convex tx-white   pa-3 px-2 bord-r-l-25 border-red tx-altfont-1">
            <div className="tx-lx">SELL</div>
          </button>
          <button className="opaci-chov--50 neu-convex tx-white tx-mdl  pa-2 bord-r-r-25 border-red">
            ⚙️
          </button>
        </div>
        <button className=" opaci-chov--50 neu-convex tx-white tx-lg  pa-3 py-5 bord-r-25 border-blue tx-bold-8 tx-altfont-1 underline">
          Refresh
        </button>
      </div>
    </>)
  }

  export default BuySellButtons