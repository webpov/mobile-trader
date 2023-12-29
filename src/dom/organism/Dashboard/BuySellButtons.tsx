
export const BuySellButtons = () => {
    return (<>
      <div className="flex-wrap gap-3  ">
        <div className="flex-center">
        <a href="https://wqub.vercel.app" target="_blank" style={{ textDecoration: 'none' }}>
  <button className="opaci-chov--50 neu-convex tx-white tx-lx pa-3 px-2 bord-r-l-25 border-green tx-altfont-1">
    BUY
  </button>
</a>
          <button className="opaci-chov--50 neu-convex tx-white tx-mdl  pa-2 bord-r-r-25 border-green">
            ⚙️
          </button>
        </div>
        <div className="flex-center">
        <a href="https://wqub.vercel.app" target="_blank" style={{ textDecoration: 'none' }}>
  <button className="opaci-chov--50 neu-convex tx-white tx-lx pa-3 px-2 bord-r-l-25 border-red tx-altfont-1">
    SELL
  </button>
</a>
          <button className="opaci-chov--50 neu-convex tx-white tx-mdl  pa-2 bord-r-r-25 border-red">
            ⚙️
          </button>
        </div>
        <button 
  className="opaci-chov--50 neu-convex tx-white tx-lg pa-3 py-5 bord-r-25 border-blue tx-bold-8 tx-altfont-1 underline"
  onClick={() => window.location.reload()}
>
  Refresh
</button>
<a href="https://wpack.vercel.app/">
        <button 
  className="opaci-chov--50 neu-convex tx-white tx-lg pa-1 py-3 bord-r-15 border-white-50 tx-bold-8 tx-altfont-1 underline"

  
>
  Pack
</button>
</a>
      </div>
    </>)
  }

  export default BuySellButtons