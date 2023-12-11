"use client"
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useMemo } from "react";
import { LoadingFullScreen } from "../tools/LoadingFullScreen";
import { Box, OrbitControls, RoundedBox, Sphere, Torus } from "@react-three/drei";
import { useMediaQuery } from "usehooks-ts";
import ToggleSwitch from "../parts/ToggleSwitch";
import { WorldModelTextured } from "./WorldModelTextured";
import { Chainlink } from "dev3-sdk"
import { Html } from "@react-three/drei";
import { getFearNGreed } from "../../../script/state/service/local";


export const MarketNewsStage = () => {
  const [mounted, s__Mounted] = useState(false);

  const [theData, s__theData] = useState<any>({});

  
  const [isLightVisible, s__isLightVisible] = useState(false);
  const [isClickBlocked, s__isClickBlocked] = useState(false);
  const isMediumDevice = useMediaQuery("only screen and (max-width : 992px)");
  useEffect(() => {
    s__Mounted(true);
}, []);

  const triggerOnToggleClick = (aSide:string, newValue:boolean) => {
    // if (isClickBlocked) { return }
    console.log("aside newv", aSide, newValue)
    if (aSide != "main") {
      return
    }
    if (!isLightVisible) {
      getChainlinkMarketData()
      s__isLightVisible(true)
    }
    if (isLightVisible) {
      s__isLightVisible(false)
    }

    s__isClickBlocked(true)
    setTimeout(()=>{
      s__isClickBlocked(false)
    },2500)
  }

  const getChainlinkMarketData = async () => {
    const ethSDK = Chainlink.instance("https://ethereum.publicnode.com", Chainlink.PriceFeeds.ETH)
    console.log("ethSDK.getFromOracle", Chainlink.PriceFeeds.ETH);
    ethSDK.getFromOracle(ethSDK.feeds.MCAP_USD).then((res:any) => {
      const resInMillions = res.answer.toString().slice(0, -17)
      // console.log("MCAP_USD.toString()", res.answer.toString().slice(0, -17));
      s__theData((oldData:any)=>({...oldData,["MCAP_USD"]: resInMillions}))
        // console.log("MCAP_USD.toString()", res.answer.toString(), (res.answer/1000));
    });
    ethSDK.getFromOracle(ethSDK.feeds.CV_INDEX).then((res:any) => {
      const resInMillions = res.answer.toString().slice(0, -17)
      console.log("resInMillionsresInMillions resInMillions", resInMillions);
      s__theData((oldData:any)=>({...oldData,["CV_INDEX"]: resInMillions}))
        // console.log("CV_INDEX.toString()", res.answer.toString(), (res.answer/1000));
    });
    ethSDK.getFromOracle(ethSDK.feeds.CONSUMER_PRICE_INDEX).then((res:any) => {
      const resInMillions = res.answer.toString().slice(0, -17)
      console.log("resInMillionsresInMillions resInMillions", resInMillions);
      s__theData((oldData:any)=>({...oldData,["CONSUMER_PRICE_INDEX"]: resInMillions}))
        // console.log("CONSUMER_PRICE_INDEX.toString()", res.answer.toString(), (res.answer/1000));
    });

    const fearNGreed = await getFearNGreed()
    const innerFNG = fearNGreed.data[0]
    console.log("fearNGreed", innerFNG)
    s__theData((oldData:any)=>({...oldData,["FNG"]: innerFNG.value}))
  }

  const isDataPopulated = useMemo(()=>{
    return JSON.stringify(theData) !== "{}"
  },[theData])

  if (!mounted) return <LoadingFullScreen />;

  return (<>
    <div className={`flex-col w-100 tx-altfont-4 bg-b-10 box-shadow-i-9-b ${true ? "" : "nopointer"}`}>

      {isDataPopulated && isLightVisible && <>
        <div className="pos-abs top-0 right-0 tx-blue tx-lgx pa-2 pt-4">
          <div className=""><div className="hover-4">º</div></div>
          
        </div>      
      </>}
      
      <Canvas style={{width:"100%",height:"250px"}} shadows 
        className={` ${true ? "" : "nopointer"}`}
        camera={{fov:20,position:[1,1,isMediumDevice?4.5:3.5]}}
        gl={{ preserveDrawingBuffer: true, }}
        // onCreated={(state)=>{ state.gl.setClearColor("#101319"); state.scene.fog = new Fog("#101319",8,16) }}
      >
        <OrbitControls  autoRotateSpeed={.05} autoRotate={true} 
        rotateSpeed={0.5}
          enableDamping={false}
          maxDistance={9}
          minDistance={2}
          // enablePan={false}
          // dampingFactor={.05} 
          maxPolarAngle={Math.PI/2+0.7} minPolarAngle={Math.PI/2-0.7}
          // minAzimuthAngle={Math.PI/4}
          // maxAzimuthAngle={Math.PI/4*3}
        />
        <ambientLight args={["#ffffff", 0.015]} />
        <group position={[0,-0.25,0]} rotation={[0,0,0]}>
        <pointLight position={[1.5,2,0.75]} args={["#ffeebb", 0.4, 10]} />
        <pointLight position={[-2,2,-2]} args={["#99ccff", 0.1, 10]} />
        <RoundedBox args={[1,0.3,0.2]} position={[0,0.85,0]}>
          <meshStandardMaterial color={"#ffffff"} />
        </RoundedBox>
{/* 
        <RoundedBox args={[1,0.6,0.2]} position={[0,1,0]}>
          <meshStandardMaterial color={"#ffffff"} />
        </RoundedBox> */}




        {/* <Box args={[0.2,0.2,0.1]} position={[0,-0.25,0.5]}>
          <meshStandardMaterial color={"#ffffff"} />
        </Box> */}

        
{!!theData && !!theData.FNG &&
            <Html position={[0, 0.85, 0.12]} rotation={[0, 0, 0]} transform occlude={true}
              distanceFactor={3}
            >
              <div className="tx-mdl flex-center gap-1" style={{ color: "white",  textAlign: "center",background: "transparent" }}>
                <div className="tx-xsm">Fear & Greed:</div>
                <div>{theData.FNG}</div>
              </div>
            </Html>
          }

        <group position={[0,-0.08,0]} rotation={[0,0,0]}>
          <Box  position={[0,0,0.73]} castShadow receiveShadow scale={0.5} args={[1.2,0.85,0.1]}
            
          >
            <meshStandardMaterial color={"#dddddd"} />
          </Box>
          
          {!!theData && theData.MCAP_USD &&
            <Html position={[0, 0, .77]} rotation={[0, 0, 0]} transform occlude={true}
              distanceFactor={3}
            >
              <div className="tx-mdl flex-col" style={{ color: "white",  textAlign: "center",background: "transparent" }}>
                <div className="tx-xsm">Total Cap.</div>
                <div>{theData.MCAP_USD}</div>
              </div>
            </Html>
          }
        </group>
        
        <group position={[0,-0.08,0]} rotation={[0,(Math.PI/2)/2,0]}>
          <Box scale={0.5} args={[1.2,0.8,0.1]} position={[0,0,0.73]} castShadow receiveShadow>
            <meshStandardMaterial color={"#dddddd"} />
          </Box>
          {!!theData && theData.CV_INDEX &&
            <Html position={[0, 0, .77]} rotation={[0, 0, 0]} transform occlude={true}
              distanceFactor={3}
            >
              <div className="tx-mdl flex-col" style={{ color: "white",  textAlign: "center",background: "transparent" }}>
                <div className="tx-xsm">Volatility</div>
                <div>{theData.CV_INDEX}</div>
              </div>
            </Html>
          }
        </group>
        
        <group position={[0,-0.08,0]} rotation={[0,-(Math.PI/2)/2,0]}>
          <Box scale={0.5} args={[1.2,0.8,0.1]} position={[0,0,0.73]} castShadow receiveShadow>
            <meshStandardMaterial color={"#dddddd"} />
          </Box>
          {!!theData && theData.CONSUMER_PRICE_INDEX &&
            <Html position={[0, 0, .77]} rotation={[0, 0, 0]} transform occlude={true}
              distanceFactor={3}
            >
              <div className="tx-mdl flex-col" style={{ color: "white",  textAlign: "center",background: "transparent" }}>
                <div className="tx-xsm">CPI</div>
                <div>{theData.CONSUMER_PRICE_INDEX}</div>
              </div>
            </Html>
          }
        </group>
        
        {/* <group position={[0,0,0]} rotation={[0,0,0]}>
          <group position={[0,0.5,0.3]} rotation={[Math.PI/2,0,Math.PI/2]}>
            <ToggleSwitch calls={{onClick: (newVal:boolean)=>{triggerOnToggleClick("first", newVal)}}} />
          </group>
        </group>
        <group position={[0,0,0]} rotation={[0,Math.PI/2,0]}>
          <group position={[0,0.5,0.3]} rotation={[Math.PI/2,0,Math.PI/2]}>
            <ToggleSwitch calls={{onClick: (newVal:boolean)=>{triggerOnToggleClick("sec", newVal)}}} />
          </group>
        </group>
        <group position={[0,0,0]} rotation={[0,-Math.PI/2,0]}>
          <group position={[0,0.5,0.3]} rotation={[Math.PI/2,0,Math.PI/2]}>
            <ToggleSwitch calls={{onClick: (newVal:boolean)=>{triggerOnToggleClick("third", newVal)}}} />
          </group>
        </group> */}


        <group position={[0,0.25,0.68]} rotation={[0,0,0]}>
          <ToggleSwitch
            state={{isClickBlocked}}
            calls={{onClick: (newVal:boolean)=>{triggerOnToggleClick("main", newVal)}}} 
          />
          
          {isLightVisible &&
            <pointLight position={[-0.2,-0.5,0.7]} args={["#ffffff", .3, 1.5]} castShadow />
          }
        </group>
          
        <group rotation={[0,1,0]}>

          <WorldModelTextured />
          </group>






















        {/* <Torus rotation={[Math.PI/2,0,0]} args={[5.8,6,16,24]} scale={[1.5,1.5,0.75]}>
          <meshStandardMaterial wireframe={true} emissive={"#333f33"} />
        </Torus> */}
        {/* <Torus rotation={[Math.PI/2,0,0]} args={[5.8,6,16,24]} scale={[1.5,1.5,0.75]}>
          <meshStandardMaterial wireframe={true} emissive={"#333f33"} />
        </Torus> */}
        </group>
      </Canvas>        
    </div>        
    </>)
}

export default MarketNewsStage