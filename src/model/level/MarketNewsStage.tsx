"use client"
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useMemo } from "react";
import { LoadingFullScreen } from "../tools/LoadingFullScreen";
import { Box, OrbitControls, RoundedBox, Sphere, Torus } from "@react-three/drei";
import { useMediaQuery } from "usehooks-ts";
import ToggleSwitch from "../parts/ToggleSwitch";
import { WorldModelTextured } from "./WorldModelTextured";
// import { Chainlink } from "dev3-sdk"
import { Html } from "@react-three/drei";
import { getFearNGreed, getTotalMarketCap } from "../../../script/state/service/local";
import DynaText from "../core/DynaText";
import TradingViewNews from "@/dom/organism/TradingViewNews";


export const MarketNewsStage = ({state}:any) => {
  const [mounted, s__Mounted] = useState(false);

  const [theData, s__theData] = useState<any>({});

  
  const [isLightVisible, s__isLightVisible] = useState(false);
  const [isClickBlocked, s__isClickBlocked] = useState(false);
  const isMediumDevice = useMediaQuery("only screen and (max-width : 992px)");
  useEffect(() => {
    s__Mounted(true);
}, []);

  const triggerOnToggleClick = async (aSide:string, newValue:boolean) => {
    // if (isClickBlocked) { return }
    // console.log("aside newv", aSide, newValue)
    if (aSide != "main") {
      return
    }
    if (!isLightVisible) {
      // getChainlinkMarketData()
      try {
        getFearAndGreedAlternativeData()
      } catch (error) {
        console.warn("error getFearAndGreedAlternativeData()")
      }
      
      try {
        getCoinmarketcapData()
      } catch (error) {
        console.warn("error getCoinmarketcapData()")
      }
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
  const getFearAndGreedAlternativeData = async() => {
    
    const fearNGreed = await getFearNGreed()
    const innerFNG = fearNGreed.data[0]
    // console.log("fearNGreed", innerFNG)
    s__theData((oldData:any)=>({...oldData,["FNG"]: innerFNG.value}))
  }
  const getCoinmarketcapData = async() => {

      // Replace 'YOUR_API_KEY' with your actual CoinMarketCap API key
      const ttt = await getTotalMarketCap();
      // console.log("ttt", ttt)
      s__theData((oldData:any)=>({...oldData,["MCAP_USD"]: (parseInt(`${ttt.data.quote.USD.total_market_cap/1000000000}`))}))
      s__theData((oldData:any)=>({...oldData,["BTCD"]: (parseInt(`${parseFloat(ttt.data.btc_dominance)*10}`)/10)}))
      s__theData((oldData:any)=>({...oldData,["BTCD24"]: ((`${parseFloat(ttt.data.btc_dominance_24h_percentage_change).toFixed(2)}`))}))
      s__theData((oldData:any)=>({...oldData,["ETHD"]: (parseInt(`${parseFloat(ttt.data.eth_dominance)*10}`)/10)}))
      s__theData((oldData:any)=>({...oldData,["ETHD24"]: ((`${parseFloat(ttt.data.eth_dominance_24h_percentage_change).toFixed(2)}`))}))
      s__theData((oldData:any)=>({...oldData,["DERIV24"]: ((`${parseFloat(ttt.data.derivatives_24h_percentage_change).toFixed(1)}`))}))
      s__theData((oldData:any)=>({...oldData,["TOTAL24"]: ((`${parseFloat(ttt.data.quote.USD.total_market_cap_yesterday_percentage_change).toFixed(1)}`))}))
      s__theData((oldData:any)=>({...oldData,["DEFI24"]: ((`${parseFloat(ttt.data.defi_24h_percentage_change).toFixed(1)}`))}))
      s__theData((oldData:any)=>({...oldData,["DERIVOL"]: (parseInt(`${parseInt(ttt.data.quote.USD.derivatives_volume_24h)/1000000000}`))}))
      
  }
  // const getChainlinkMarketData = async () => {
  //   const ethSDK = Chainlink.instance("https://ethereum.publicnode.com", Chainlink.PriceFeeds.ETH)
  //   console.log("ethSDK.getFromOracle", Chainlink.PriceFeeds.ETH);
  //   ethSDK.getFromOracle(ethSDK.feeds.MCAP_USD).then((res:any) => {
  //     const resInMillions = res.answer.toString().slice(0, -17)
  //     // console.log("MCAP_USD.toString()", res.answer.toString().slice(0, -17));
  //     s__theData((oldData:any)=>({...oldData,["MCAP_USD"]: resInMillions}))
  //       // console.log("MCAP_USD.toString()", res.answer.toString(), (res.answer/1000));
  //   });
  //   ethSDK.getFromOracle(ethSDK.feeds.CV_INDEX).then((res:any) => {
  //     const resInMillions = res.answer.toString().slice(0, -17)
  //     console.log("resInMillionsresInMillions resInMillions", resInMillions);
  //     s__theData((oldData:any)=>({...oldData,["CV_INDEX"]: resInMillions}))
  //       // console.log("CV_INDEX.toString()", res.answer.toString(), (res.answer/1000));
  //   });
  //   ethSDK.getFromOracle(ethSDK.feeds.CONSUMER_PRICE_INDEX).then((res:any) => {
  //     const resInMillions = res.answer.toString().slice(0, -17)
  //     console.log("resInMillionsresInMillions resInMillions", resInMillions);
  //     s__theData((oldData:any)=>({...oldData,["CONSUMER_PRICE_INDEX"]: resInMillions}))
  //       // console.log("CONSUMER_PRICE_INDEX.toString()", res.answer.toString(), (res.answer/1000));
  //   });
    
  // }

  const isDataPopulated = useMemo(()=>{
    return JSON.stringify(theData) !== "{}"
  },[theData])
  const [isTab, s__isTab] = useState("3d")
  if (!mounted) return <LoadingFullScreen />;

  return (<>
    <div className={`flex-col   w-100 h-100 tx-altfont-4   ${true ? "" : "nopointer"}`}>
   
      {isDataPopulated && isLightVisible && <>
        <div className="pos-abs top-0 left-50 tx-white opaci-50 tx-lgx pa-2 pt-4">
          <div className=""><div className=" hover-jump">⚡</div></div>
          
        </div>      
      </>}
      {isTab == "3d" &&
        <Canvas style={{width:"100%",height:state?.canvasHeight || "250px"}} shadows 
        className={` ${true ? "" : "nopointer"} flex-col flex-align-stretch`}
        camera={{fov:30,position:[1,1,isMediumDevice?4.5:3.5]}}
        gl={{ preserveDrawingBuffer: true, }}
        // onCreated={(state)=>{ state.gl.setClearColor("#101319"); state.scene.fog = new Fog("#101319",8,16) }}
      >
        <OrbitControls  autoRotateSpeed={.1} autoRotate={true} 
        rotateSpeed={0.5}
          enableDamping={false}
          maxDistance={9}
          minDistance={2}
          enablePan={false}
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


{!!theData && !!theData.DERIVOL &&
<group position={[0, 0.86, -0.116]} rotation={[-Math.PI/2,Math.PI,0]}>
            <DynaText text={`Deriv Vol: ${theData.DERIVOL} B`}  color="#fff" emissive="#999"
              font={0.11}
            />
            </group>
          }


        
{!!theData && !!theData.FNG &&
<group position={[0, 0.86, 0.116]} rotation={[Math.PI/2,0,0]}>
            <DynaText text={`Fear & Greed: ${theData.FNG}`}  color="#fff" emissive="#999"
              font={0.11}
            />
            </group>
          }

          <group position={[0,-0.08,0]} rotation={[0,0,0]}>
            <Box  position={[0,0,0.73]} castShadow receiveShadow scale={0.5} args={[1.2,0.85,0.1]}
              
            >
              <meshStandardMaterial color={"#dddddd"} />
            </Box>
            
            {!!theData && theData.MCAP_USD &&
              <group position={[0, 0, .77]} rotation={[Math.PI/2,0,0]}>
  
              
  
  <DynaText text={`${theData.MCAP_USD}`}  color="#fff" emissive="#999"
                font={0.2} position={[0,0,0.05]}
              />
              <DynaText text={`Total MCAP (B)`}  color="#fff" emissive="#999"
              font={0.08} position={[0,0,-0.1]}
            />
              </group>
            }
          </group>

          

          <group position={[0,-0.08,0]} rotation={[0,Math.PI,0]}>
          <Box  position={[0,0,0.73]} castShadow receiveShadow scale={0.5} args={[1.2,0.85,0.1]}
            
          >
            <meshStandardMaterial color={"#dddddd"} />
          </Box>
          
          {!!theData && theData.TOTAL24 &&
            <group position={[0, 0, .77]} rotation={[Math.PI/2,0,0]}>

            

<DynaText text={`${theData.TOTAL24}`}  color="#fff" emissive="#999"
              font={0.2} position={[0,0,0.05]}
            />
            <DynaText text={`TOTAL 24h (%)`}  color="#fff" emissive="#999"
            font={0.06} position={[0,0,-0.1]}
          />
            </group>
          }
        </group>



        
        <group position={[0,-0.08,0]} rotation={[0,Math.PI/4*3,0]}>
          <Box  position={[0,0,0.73]} castShadow receiveShadow scale={0.5} args={[1.2,0.85,0.1]}
            
          >
            <meshStandardMaterial color={"#dddddd"} />
          </Box>
          
          {!!theData && theData.DEFI24 &&
            <group position={[0, 0, .77]} rotation={[Math.PI/2,0,0]}>

            

<DynaText text={`${theData.DEFI24}`}  color="#fff" emissive="#999"
              font={0.2} position={[0,0,0.05]}
            />
            <DynaText text={`Defi 24h (%)`}  color="#fff" emissive="#999"
            font={0.06} position={[0,0,-0.1]}
          />
            </group>
          }
        </group>

        
        <group position={[0,-0.08,0]} rotation={[0,Math.PI*1.25,0]}>
          <Box  position={[0,0,0.73]} castShadow receiveShadow scale={0.5} args={[1.2,0.85,0.1]}
            
          >
            <meshStandardMaterial color={"#dddddd"} />
          </Box>
          
          {!!theData && theData.DERIV24 &&
            <group position={[0, 0, .77]} rotation={[Math.PI/2,0,0]}>

            

<DynaText text={`${theData.DERIV24}`}  color="#fff" emissive="#999"
              font={0.2} position={[0,0,0.05]}
            />
            <DynaText text={`DERIV 24h (%)`}  color="#fff" emissive="#999"
            font={0.06} position={[0,0,-0.1]}
          />
            </group>
          }
        </group>

        
        
        <group position={[0,-0.08,0]} rotation={[0,(Math.PI/2)/2,0]}>
          <Box scale={0.5} args={[1.2,0.8,0.1]} position={[0,0,0.73]} castShadow receiveShadow>
            <meshStandardMaterial color={"#dddddd"} />
          </Box>
          {!!theData && theData.BTCD &&
            <group position={[0, 0, .77]} rotation={[Math.PI/2,0,0]}>


              <DynaText text={`${theData.BTCD}`}  color="#fff" emissive="#999"
              font={0.2} position={[0,0,0.05]}
            />
            <DynaText text={`BTCD (%)`}  color="#fff" emissive="#999"
            font={0.1} position={[0,0,-0.1]}
          />
            </group>
          }
        </group>
        
        <group position={[0,-0.08,0]} rotation={[0,-(Math.PI/2)/2,0]}>
          <Box scale={0.5} args={[1.2,0.8,0.1]} position={[0,0,0.73]} castShadow receiveShadow>
            <meshStandardMaterial color={"#dddddd"} />
          </Box>
          {!!theData && theData.ETHD &&
            <group position={[0, 0, .77]} rotation={[Math.PI/2,0,0]}>

              <DynaText text={`${theData.ETHD}`}  color="#fff" emissive="#999"
              font={0.2} position={[0,0,0.05]}
            />
            <DynaText text={`ETHD (%)`}  color="#fff" emissive="#999"
            font={0.1} position={[0,0,-0.1]}
          />

            </group>
          }
        </group>
        <group position={[0,-0.08,0]} rotation={[0,-(Math.PI/2),0]}>
          <Box scale={0.5} args={[1.2,0.8,0.1]} position={[0,0,0.73]} castShadow receiveShadow>
            <meshStandardMaterial color={"#dddddd"} />
          </Box>
          {!!theData && theData.ETHD24 &&
            <group position={[0, 0, .77]} rotation={[Math.PI/2,0,0]}>

              <DynaText text={`${theData.ETHD24}`}  color="#fff" emissive="#999"
              font={0.2} position={[0,0,0.05]}
            />
            <DynaText text={`ETHD 24h (%)`}  color="#fff" emissive="#999"
            font={0.07} position={[0,0,-0.1]}
          />

            </group>
          }
        </group>
        
        <group position={[0,-0.08,0]} rotation={[0,(Math.PI/2),0]}>
          <Box scale={0.5} args={[1.2,0.8,0.1]} position={[0,0,0.73]} castShadow receiveShadow>
            <meshStandardMaterial color={"#dddddd"} />
          </Box>
          {!!theData && theData.BTCD24 &&
            <group position={[0, 0, .77]} rotation={[Math.PI/2,0,0]}>

              <DynaText text={`${theData.BTCD24}`}  color="#fff" emissive="#999"
              font={0.2} position={[0,0,0.05]}
            />
            <DynaText text={`BTCD 24h (%)`}  color="#fff" emissive="#999"
            font={0.07} position={[0,0,-0.1]}
          />

            </group>
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

          <WorldModelTextured state={{showWorld:isLightVisible}} />
          </group>






















        {/* <Torus rotation={[Math.PI/2,0,0]} args={[5.8,6,16,24]} scale={[1.5,1.5,0.75]}>
          <meshStandardMaterial wireframe={true} emissive={"#333f33"} />
        </Torus> */}
        {/* <Torus rotation={[Math.PI/2,0,0]} args={[5.8,6,16,24]} scale={[1.5,1.5,0.75]}>
          <meshStandardMaterial wireframe={true} emissive={"#333f33"} />
        </Torus> */}
        </group>
        </Canvas> 
      }
      {isTab == "tradingview" && <>
        <div className="w-100 "><TradingViewNews /></div>
      </>}   
      <div className="pos-abs top-0 pos-rel  z-900 flex right-0  tx-white opaci-50 tx-lgx pa-2 pt-4">
    {isTab == "3d" &&
    <div className="opaci-chov--50 z-600 block" onClick={()=>s__isTab("tradingview")}>
            <div className="border-white bord-r-10  bg-glass-20 bg-b-90 px-1 py-1" >
              <div className="tx-sm">Switch to <br /> TradingView</div>
            </div>
            </div>
  }
         {isTab == "tradingview" &&
         <div className="opaci-chov--50" onClick={()=>s__isTab("3d")}>
            <div className="border-white bord-r-10  bg-glass-20 bg-b-90 px-1 py-1" >
              <div className="tx-sm">Switch to <br /> Globe Data</div>
            </div>
            </div>
  } 
    </div>      

    </div>     
  </>)
}

export default MarketNewsStage