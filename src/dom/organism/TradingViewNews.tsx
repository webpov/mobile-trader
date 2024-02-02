"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export const TradingViewNews = () => {
  const myRef:any = useRef();
  const [widgetCount, s__widgetCount] = useState(0)
  useEffect(()=>{
    if (!myRef.current) return
    if (!!widgetCount) return
    s__widgetCount(1)
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'
    script.async = false;
    script.innerHTML = JSON.stringify({
      "defaultColumn": "overview",
      "screener_type": "crypto_mkt",
      "displayCurrency": "USD",
      "colorTheme": "dark",
      "width": "100%",
      "height": 360,
      "locale": "en"
    })
    myRef.current.innerHTML = ''
    myRef.current.appendChild(script);
  },[])

  return (<>
  <div className="pos-abs bottom-0 left-0 bg-glass-20 flex-col gap-2 border-white bord-r-25 pb-2 bg-b-50 tx-white">
    <h1 className="tx-sm ma-0 px-6 Q_xs_px-2 pt-4 pa-0 tx-bold-2">Tradingview&apos;s Crypto <br /> Market Widget</h1>
    <h3 className="tx-sm ma-0 px-6 Q_xs_px-2 pa-0 tx-link">
        <Link className="tx-white" href="https://www.tradingview.com/widget-docs/widgets/screeners/crypto-mkt-screener/" target="_blank">
          tradingview <br /> .com/widget-docs
        </Link>
      </h3>
      </div>
    <div className="mt- w-min-300px w-100 ">
      
      <div className="tradingview-widget-container mt-2  w-100" ref={myRef}>
          {/* <div className="tradingview-widget-container__widget"></div>     */}
      </div>
    </div>
  </>);
}
export default TradingViewNews