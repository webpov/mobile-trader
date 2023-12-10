"use client"
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { LoadingFullScreen } from "../tools/LoadingFullScreen";
import { Box, OrbitControls, RoundedBox, Sphere, Torus } from "@react-three/drei";
import { useMediaQuery } from "usehooks-ts";
import ToggleSwitch from "../parts/ToggleSwitch";
import { WorldModelTextured } from "./WorldModelTextured";

export const MarketNewsStage = () => {
  const [mounted, s__Mounted] = useState(false);
  const [isLightVisible, s__isLightVisible] = useState(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  useEffect(() => {
    s__Mounted(true);
}, []);

  const triggerOnToggleClick = (aSide:string, newValue:boolean) => {
    console.log("aside newv", aSide, newValue)
    if (aSide != "main") {
      return
    }
    s__isLightVisible(!isLightVisible)
  }

  if (!mounted) return <LoadingFullScreen />;

  return (<>
    <div className={`flex-col w-100 tx-altfont-4 bg-b-10 box-shadow-i-9-b ${true ? "" : "nopointer"}`}>

      
      
      <Canvas style={{width:"100%",height:"250px"}} shadows 
        className={` ${true ? "" : "nopointer"}`}
        camera={{fov:20,position:[1,1,4.5]}}
        gl={{ preserveDrawingBuffer: true, }}
        // onCreated={(state)=>{ state.gl.setClearColor("#101319"); state.scene.fog = new Fog("#101319",8,16) }}
      >
        <OrbitControls  autoRotateSpeed={.05} autoRotate={true} rotateSpeed={0.15}
          // enableDamping={false}
          maxDistance={9}
          minDistance={2}
          // enablePan={false}
          dampingFactor={.05} 
          maxPolarAngle={Math.PI/2+0.7} minPolarAngle={Math.PI/2-0.7}
          // minAzimuthAngle={Math.PI/4}
          // maxAzimuthAngle={Math.PI/4*3}
        />
        <ambientLight args={["#ffffff", 0.015]} />
        <group position={[0,-0.25,0]} rotation={[0,0,0]}>
        <pointLight position={[1.5,2,0.75]} args={["#ffeebb", 0.4, 10]} />
        <pointLight position={[-2,2,-2]} args={["#99ccff", 0.1, 10]} />
        <RoundedBox args={[1,0.6,0.2]} position={[0,1,0]}>
          <meshStandardMaterial color={"#ffffff"} />
        </RoundedBox>
        {/* <Box args={[0.2,0.2,0.1]} position={[0,-0.25,0.5]}>
          <meshStandardMaterial color={"#ffffff"} />
        </Box> */}
        
        <group position={[0,0,0]} rotation={[0,0,0]}>
          <RoundedBox args={[0.6,0.4,0.05]} position={[0,-0.08,0.73]} castShadow receiveShadow>
            <meshStandardMaterial color={"#dddddd"} />
          </RoundedBox>
        </group>
        
        <group position={[0,0,0]} rotation={[0,(Math.PI/2)/2,0]}>
          <RoundedBox args={[0.6,0.4,0.05]} position={[0,-0.08,0.73]} castShadow receiveShadow>
            <meshStandardMaterial color={"#dddddd"} />
          </RoundedBox>
        </group>
        
        <group position={[0,0,0]} rotation={[0,-(Math.PI/2)/2,0]}>
          <RoundedBox args={[0.6,0.4,0.05]} position={[0,-0.08,0.73]} castShadow receiveShadow>
            <meshStandardMaterial color={"#dddddd"} />
          </RoundedBox>
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
          <ToggleSwitch calls={{onClick: (newVal:boolean)=>{triggerOnToggleClick("main", newVal)}}} />
          
          {isLightVisible &&
            <pointLight position={[0,0,0.7]} args={["#ffffff", .3, 1.5]} castShadow />
          }
        </group>
          
        <Sphere args={[.75,16,8]} castShadow receiveShadow>
          <meshStandardMaterial wireframe={true} emissive={"#333f33"} />
        </Sphere>
          <WorldModelTextured />
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