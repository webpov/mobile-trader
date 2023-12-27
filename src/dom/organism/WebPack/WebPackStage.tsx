import PackTabsScene from "@/model/level/PackTabsScene";

export default function WebPackStage({}:any) {
    return (<>
        
    <div className='pos-fix top-0 w-100 flex-col noverflow h-100vh z-2 ' style={{width: '100vw',}}>
      <div className={`${true ? "_ddg" : "_ddr"} h-50 w-100 bord-r-100p spin-60 blur opaci-10 `} 
        style={{filter:"blur(200px)"}}
      >
      </div>
    </div>
    {"chart" == "chart" && <>
      <div className='flex-row  tx-white  Q_lg_x  w-95 z-10'>
        {/* <div className='Q_lg_x w-10'></div> */}
        <h1 className=" flex-1 mb-0 pb-0  block">
          <a href="/web/pack" className="tx-white nodeco">
            WebPack
          </a>
        </h1>
      </div>
      <div className='flex-row pos-rel flex-align-stretch  w-100 Q_xs_lg z-10 tx-white'>
        <a href="/web/pack" className="flex-col tx-white nodeco">
          <h2 className="mb-0 pb-0 flex-center bg-w-10 px-6 gap-2 box-shadow-i-9-b pt-2 bord-r-25 pb-3">
            WebPack
          </h2>
        </a>
      </div>
    </>}

    
    <div className='flex-row flex-align-stretch tx-white w-95 z-10' >
        <div className='Q_md_x mt-4 w-10 box-shadow-9-b bg-glass-20 bord-r-25 pt-4 neu-convex flex-col flex-justify-start'>
          <div className="pb-4 tx-center">Important <small>Links</small> </div>
          <div className="flex-col w-90">
            <a href="/" className="flex-col tx-white nodeco">
            <h2 className="mb-0 pb-0 flex-col bg-w-10 px-2 gap-2 box-shadow-9-b pt-2 bord-r-15 pb-3">
              <div>POV</div>
            </h2>
          </a>
            <a href="/" className="flex-col tx-white nodeco">
            <h2 className="mb-0 pb-0 flex-col bg-w-10 px-2 gap-2 box-shadow-9-b pt-2 bord-r-15 pb-3">
              <div>QUB</div>
            </h2>
          </a>
          <hr className="w-50 mt-6" />
            <a href="/" className="flex-col tx-white nodeco">
            <h2 className="mb-0 pb-0 flex-col bg-w-10 px-2 gap-2 box-shadow-9-b pt-2 bord-r-15 pb-3">
              <div>Home</div>
              <small>(Trade)</small>
            </h2>
          </a>
          </div>
        </div>
      <div className='tx-roman flex flex-align-stretch flex-1 mt-4 flex-center pos-rel' >
        {"chart" == "chart" && <>
          <div className="w-95  pos-rel bord-r-25 h-100" style={{minHeight:"75vh"}}>
            <div className='bord-r-25 w-100 noverflow bg-b-50 bg-glass-50  h-100'
              style={{boxShadow:"inset 5px 8px 5px #ffffff10, 4px 4px 10px #000000"}}
            >
                <PackTabsScene />
            </div>
            </div>
        </>}
        </div>
        </div>
    </>)
}