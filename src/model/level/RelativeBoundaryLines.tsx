"use client";
import { Box } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";



export const RelativeBoundaryLines = ({ state, calls }: any) => {
  const $floorLine: any = useRef();
  const $topLine: any = useRef();
  const [refreshCounter, s__refreshCounter] = useState(0);

  const selectedFav: any = useMemo(() => {
    if (!state.favs) return null;
    if (!state.favs.length) return null;
    const selectedSymbolData = state.favs.filter((item: any) => {
      return item.symbol == state.symbol;
    });
    return selectedSymbolData[0];
  }, [state.favs, state.symbol,]);
  const relativeYHeight = useMemo(() => {
    if (!state.summaryDetails) return 0;
    if (!state.yRange) return 0;
    if (!state.yRange.length) return 0;
    if (!selectedFav) return 0;
    if (!$floorLine.current) return 0;
    if (!$topLine.current) return 0;


    const worldRelativeHeight = state.yRange[1];

    const priceAbsHeight = state.summaryDetails.maxValue - state.summaryDetails.minValue;
    const absMinValue = selectedFav.floor - state.summaryDetails.minValue;
    let absMaxValue = selectedFav.roof - state.summaryDetails.minValue;
    if (absMaxValue < 0) { absMaxValue = -(absMaxValue - priceAbsHeight); }
    const localizedFloorHeight = absMinValue * worldRelativeHeight / priceAbsHeight;
    const localizedRoofHeight = absMaxValue * worldRelativeHeight / priceAbsHeight;

    $floorLine.current.position.y = localizedFloorHeight;
    $topLine.current.position.y = localizedRoofHeight;
  }, [state.summaryDetails, selectedFav, $topLine, $floorLine, state.yRange, refreshCounter]);

  useEffect(() => {
    s__refreshCounter(refreshCounter + 1);
  }, []);



  return (<>
    {/* GUIDE */}
    <Box args={[5, 0.02, 0.02]} position={[-3, 0, 0]}>
      <meshStandardMaterial color="white" emissive={"#555"} />
    </Box>
    <Box args={[5, 0.01, 0.03]} position={[-2, 0, 0]} ref={$floorLine}>
      <meshStandardMaterial emissive="#0099ff" />
    </Box>




    <Box args={[5, 0.02, 0.02]} position={[-3, state.yRange ? state.yRange[1] : 0, 0]}>
      <meshStandardMaterial color="white" emissive={"#333"} />
    </Box>
    <Box args={[5, 0.01, 0.03]} position={[-2, 0, 0]} ref={$topLine}>
      <meshStandardMaterial emissive="#ffaa00" />
    </Box>

  </>);
};
