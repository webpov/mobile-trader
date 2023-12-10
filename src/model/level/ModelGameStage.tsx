"use client"
import { Box, GizmoHelper, GizmoViewcube, MapControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode, useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import WormHoleModel from "@/model/parts/WormHoleModel";
import { Fog } from "three";
import { LoadingFullScreen } from "@/model/tools/LoadingFullScreen";
import TiltShiftEffects from "@/model/tools/tiltshift";
import useSyncedKLines from "@/../script/util/hook/useSyncedKLines";
import { useUrlParamCatcher } from "@/../script/util/hook/useUrlParamCatcher";
import { BoxCandleKLine } from '@/model/tools/charts/BoxCandleKLine'
import HistoryLogs from "../tools/charts/HistoryLogs";
import { RelativeBoundaryLines } from "./RelativeBoundaryLines";


export default function ModelGameStage({config, state, calls,  children}:{config:any,state:any, calls:any, children:ReactNode}) {
  const searchParams = useSearchParams()
  const urlp = useUrlParamCatcher()
  const isDOF = searchParams.has('dof')
  const noAutoRotate = searchParams.has('norotate') || true
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [mounted, s__Mounted] = useState(false);


  const CHOP_AMOUNT = 400
  const lastOfLTF = useMemo(()=>{
    
    return [...state.ltfClosingList] // .slice(-CHOP_AMOUNT) 
  },[state.ltfClosingList])
  const lastOfHTF = useMemo(()=>{
    
    return [...state.htfClosingList] // .slice(-CHOP_AMOUNT) 
  },[state.htfClosingList])


  const semiFixedViewConfig = {
    
    minAzimuthAngle:0,
    maxAzimuthAngle:0,
    minPolarAngle:0.5,
    maxPolarAngle:0.88,
  }
  const htf_latestUnix = useMemo(()=>{
    if (!state.htfList) return 1
    if (!state.htfList[499]) return 1
    return state.htfList[499][0]
  },[state.htfList])
  const htf_oldestUnix = useMemo(()=>{
    if (!state.htfList) return 1
    if (!state.htfList[0]) return 1
    return state.htfList[0][0]
    // return state.htfList[CHOP_AMOUNT][0]
  },[state.htfList])
  const selectedTradeLogs = useMemo(()=>{
    if (!state.tradeLogsObj) { return null }
    if (!state.focusSymbol) { return null }

    return state.tradeLogsObj[state.focusSymbol]
  },[state.tradeLogsObj, state.focusSymbol])
  useEffect(() => {
      s__Mounted(true);
  }, []);

  if (!mounted) return <LoadingFullScreen />;

  return (
    <div className={`flex-col h-100 tx-altfont-4 bg-b-10 box-shadow-i-9-b ${config.isChartMovable ? "" : "nopointer"}`}>

      
      
      <Canvas style={{maxWidth:"100vw",height:"100%"}} shadows 
        className={` ${config.isChartMovable ? "" : "nopointer"}`}
        camera={{fov:10,position:[0,isSmallDevice?30:25,isSmallDevice?30:25]}}
        gl={{ preserveDrawingBuffer: true, }}
        // onCreated={(state)=>{ state.gl.setClearColor("#101319"); state.scene.fog = new Fog("#101319",8,16) }}
      >
        {/* <OrbitControls  autoRotateSpeed={.25} autoRotate={!noAutoRotate} 
          enableDamping={false}
          // dampingFactor={.01} 
          maxPolarAngle={1.65} minPolarAngle={1.125}
          minAzimuthAngle={Math.PI/4}
          maxAzimuthAngle={Math.PI/4*3}
        /> */}
        <MapControls 
          enableDamping={false}
          enablePan={config.isChartMovable}
          enableZoom={config.isChartMovable}
          enableRotate={config.isChartMovable}
          rotateSpeed={0.1}

          minAzimuthAngle={!config.isChartMovable ? 0 : 0}
          maxAzimuthAngle={!config.isChartMovable ? 0 : 0}
          minPolarAngle={!config.isChartMovable ? Math.PI/4 : 0.5}
          maxPolarAngle={!config.isChartMovable ? Math.PI/4 : 0.88}

          // {...(config.isChartMovable ? semiFixedViewConfig : {})}
        />
        <ambientLight intensity={0.02} />
        <pointLight position={[2,-1.7,0]} intensity={2} distance={4} />
        {/* <pointLight position={[-1,1,-3]} intensity={0.05} /> */}
        {config.isGizmoVisible &&
          <group>
            <GizmoHelper   alignment="bottom-left" margin={[50, 50]} >
            <GizmoViewcube
              
              color="gray"
              
              strokeColor="white"
              textColor="black"
              
              hoverColor="#999"
              opacity={1}
              
            />
          </GizmoHelper>
        </group>
        }

      
        <group rotation={[-Math.PI/4,0,0]}>
          <group position={[-0.75,0,0]} >
            {/* <Box > <meshStandardMaterial color="white" /> </Box> */}
            <group position={[0,-2, 0]} > <WormHoleModel /> </group>



              
            {!state.isChartLoading && 
              <group position={[2,-0.7 ,0]}>
                <BoxCandleKLine cubeSize={.025} closingContextPrices={lastOfLTF} 
                  yRange={[0,3.6]}
                  // chopStart={500-CHOP_AMOUNT}
                  chopStart={0}
                  fullArray={state.ltfList} 
                />
                          
              <Box args={[7, 0.02, 0.02]} position={[-3, 1.7, 0]}>
                <meshStandardMaterial color="white" emissive={"#555"} />
              </Box>
              </group>
              }



              {!state.isChartLoading && 
                <group position={[2,-2.9 ,0]}>
                  <BoxCandleKLine cubeSize={.02} closingContextPrices={lastOfHTF} 
                    yRange={[0,1.8]}
                    // chopStart={500-CHOP_AMOUNT}
                    chopStart={0}
                    fullArray={state.htfList} 
                  />
                  <RelativeBoundaryLines state={{
                    symbol: state.focusSymbol,
                    yRange:[0,1.8],
                  favs: state.favs,
                  summaryDetails: state.selectedSymbolYTDSummary,
                  }} />

                  {!!selectedTradeLogs && <>
                    <group rotation={[0,-Math.PI/2,0]} position={[-0.05,0.05,1]} scale={[1,1.7,9.8]}>  {/* 1.97 */}
                    <HistoryLogs

                      calls={{refetchLogs:()=>{}}}
                      state={{orderLogs: selectedTradeLogs, }}
                      minValue={state.selectedSymbolYTDSummary.minValue}
                      maxValue={state.selectedSymbolYTDSummary.maxValue}
                      latestUnix={htf_latestUnix} oldestUnix={htf_oldestUnix}
                    />
                    </group>
                  </>}
                </group>
                }
          </group>    
        </group>
      </Canvas>
    </div>
  )
}


