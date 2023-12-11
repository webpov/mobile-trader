"use client";

export const ChartWindowOverlayLabels = ({ state }: any) => {
  return (<>
    <div className="Q_xs_sm_px-1 pa-3 py-2 pos-abs bg-glass-10 top-50p left-0 z-200 bg-b-50 bord-r-25 ma-1">
      <div>{JSON.stringify(state.selectedSymbolLTFSummary.minValue)}</div>
    </div>
    <div className="Q_xs_sm_px-1 pa-2 tx-sm pos-abs bg-glass-10 top-25p mt- right-0 z-200 bg-b-50 bord-r-25 ma-1 ">
      <div>{((
        parseFloat(state.selectedSymbolLTFSummary.minValue) +
        parseFloat(state.selectedSymbolLTFSummary.maxValue)
      )/2).toFixed(2)}</div>
    </div>
    <div className="Q_xs_sm_px-1 pa-3 py-2 pos-abs bg-glass-10 top-0 right-0 z-200 bg-b-50 bord-r-25 ma-1 mt-2">
      <div>{JSON.stringify(state.selectedSymbolLTFSummary.maxValue)}</div>
    </div>



    <div className="Q_xs_sm_px-1 tx-shadow-5 bg-glass-10 px-3 py-2 pos-abs top-50p mt-8 translate-y-25 right-0 z-200 bg-w-10 bord-r-25 ma-1">
      <div>{JSON.stringify(state.selectedSymbolYTDSummary.maxValue)}</div>
    </div>
    <div className="Q_xs_sm_px-1 tx-shadow-5 bg-glass-10 px-3 py-2 pos-abs bottom-0 left-0 z-200 bg-w-10 bord-r-25 mb-4 ma-1">
      <div>{JSON.stringify(state.selectedSymbolYTDSummary.minValue)}</div>
    </div>
  </>);
};
