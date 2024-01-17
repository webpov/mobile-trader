
export const BuySellButtons = () => {
  const confirmRedirect = (url:string) => {
    if (window.confirm("Do you want to open WebQub in a new tab? \n\n URL: wqub.vercel.app")) {
      window.open(url, "_blank");
    }
  };


    return  (
      <>
        <div className="flex-wrap gap-3">
          <div className="flex-center">
            <a onClick={() => confirmRedirect("https://wqub.vercel.app")} style={{ textDecoration: 'none' }}>
              <button className="opaci-chov--50 neu-convex tx-white tx-lx pa-3 px-2 bord-r-l-25 border-green tx-altfont-1">
    BUY
  </button>
</a>
          <button onClick={() => confirmRedirect("https://wqub.vercel.app")} className="hover-27 opaci-chov--50 neu-convex tx-white tx-mdl  pa-2 bord-r-r-25 border-green">
            ⚙️
          </button>
        </div>
        <div className="flex-center">
            <a onClick={() => confirmRedirect("https://wqub.vercel.app")} style={{ textDecoration: 'none' }}>
  <button className="opaci-chov--50 neu-convex tx-white tx-lx pa-3 px-2 bord-r-l-25 border-red tx-altfont-1">
    SELL
  </button>
</a>
          <button onClick={() => confirmRedirect("https://wqub.vercel.app")} className="hover-31 opaci-chov--50 neu-convex tx-white tx-mdl  pa-2 bord-r-r-25 border-red">
            ⚙️
          </button>
        </div>
        <button 
  className="opaci-chov--50 neu-convex tx-white tx-lg pa-3 py-3 bord-r-25 border-blue tx-bold-8 tx-altfont-1 "
  onClick={() => window.location.reload()}
>
🔄
</button>
      </div>
    </>)
  }

  export default BuySellButtons