"use client";

import { ODivider } from "@/dom/atom/ODivider";

export const ChartWindowSubMenu = ({ chartConfig, state, calls }: any) => {
  const addLTFParam = (timeframe:string) => {
    calls.addLTFParam(timeframe)
  }
  return (<>
  <details className="">
      <summary className="flex opaci-chov--50 pos-abs bottom-0">
        <button className=" bg-b-90 py-1 bord-r-50 tx-mdl noclick">
          ⚙️
        </button>
      </summary>
      <div className="pa-2 bg-b-90 bord-r-10 mb-8 bg-glass-10 box-shadow-9-b">
        <div className="flex-col w-200px">
          {/* <button className="flex tx-mdl pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={()=>{
          chartConfig.s__isGizmoVisible(!chartConfig.isGizmoVisible)
        }}>
          <div>Use Gizmo</div>
          <div className={`${chartConfig.isGizmoVisible ? "tx-green" : "tx-red"} tx-altfont-4`}>{chartConfig.isGizmoVisible ? "True" : "False"}</div>
        </button> */}
          
          <button className="flex tx-mdl pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={() => {
            chartConfig.s__isOverlayLabeled(!chartConfig.isOverlayLabeled);
          }}>
            <div>Labels</div>
            <div className={`${chartConfig.isOverlayLabeled ? "tx-green" : "tx-red"} tx-altfont-4`}>{chartConfig.isOverlayLabeled ? "True" : "False"}</div>
          </button>
          <ODivider className="w-90 Q_lg_x" />
          <button className="Q_lg_x flex tx-mdl pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={() => {
            chartConfig.s__isLeftSidebarVisible(!chartConfig.isLeftSidebarVisible);
          }}>
            <div>Left Sidebar</div>
            <div className={`${chartConfig.isLeftSidebarVisible ? "tx-green" : "tx-red"} tx-altfont-4`}>{chartConfig.isLeftSidebarVisible ? "True" : "False"}</div>
          </button>

          <button className="flex tx-mdl Q_xl_x pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={() => {
            chartConfig.s__isNotesVisible(!chartConfig.isNotesVisible);
          }}>
            <div>Right Sidebar</div>
            <div className={`${chartConfig.isNotesVisible ? "tx-green" : "tx-red"} tx-altfont-4`}>{chartConfig.isNotesVisible ? "True" : "False"}</div>
          </button>

          <ODivider className="w-90 " />


          <button className="flex tx-mdl pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={() => {
            chartConfig.s__isTrendUp(!chartConfig.isTrendUp);
          }}>
            <div>Trend Up</div>
            <div className={`${chartConfig.isTrendUp ? "tx-green" : "tx-red"} tx-altfont-4`}>{chartConfig.isTrendUp ? "True" : "False"}</div>
          </button>
          <button className="flex tx-mdl pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={() => {
            chartConfig.s__isChartMovable(!chartConfig.isChartMovable);
          }}>
            <div>Movable Camera</div>
            <div className={`${chartConfig.isChartMovable ? "tx-green" : "tx-red"} tx-altfont-4`}>{chartConfig.isChartMovable ? "True" : "False"}</div>
          </button>
          
          <div className="flex-center gap-1">
            <label className="tx-sans" htmlFor="logRange">Size</label>
            <input id="logRange" type="range" min={10} max={95}  onClick={(e:any) => {
              calls.s__logSphereSize(100-e.target.value);
            }} />
            </div>

          <div className="flex-center "> 
            <div className="tx-xs flex-1 pr-2 tx-sans">Time <br /> frame</div>
          <button className="flex tx-mdl pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={() => {
              addLTFParam("3m")
            }}>
              <div>3m</div>
            </button>
            
            <button className="flex tx-mdl pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={() => {
              addLTFParam("15m")
            }}>
              <div>15m</div>
            </button>
          <button className="flex tx-mdl pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={() => {
              addLTFParam("1h")
            }}>
              <div>1h</div>
            </button>
            
            <button className="flex tx-mdl pa-1 w-100 flex-justify-between opaci-chov--50 bg-b-90 tx-white bord-r-10 noborder" onClick={() => {
              addLTFParam("4h")
            }}>
              <div>4h</div>
            </button>
          </div>

          {!!state.fuelPoints && <>
            <ODivider className="w-90 " />
            <div className="flex pointer ">
              <button className="opaci-chov--50 bg-b-90 py-1 bord-r-50 tx-mdl tx-white px-3 "
                onClick={() => calls.s__fuelPoints(0)}
              >
                Stop
              </button>
            </div>
          </>}
        </div>
      </div>
    </details>
  </>);
};

export default ChartWindowSubMenu