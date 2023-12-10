"use client"
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { LoadingFullScreen } from "../tools/LoadingFullScreen";
import { Box, OrbitControls, RoundedBox, Torus } from "@react-three/drei";
import { useMediaQuery } from "usehooks-ts";
import ToggleSwitch from "../parts/ToggleSwitch";


export const MarketNewsStage = () => {
  const [mounted, s__Mounted] = useState(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  useEffect(() => {
    s__Mounted(true);
}, []);


  if (!mounted) return <LoadingFullScreen />;

  return (<>
    <div className={`flex-col w-100 tx-altfont-4 bg-b-10 box-shadow-i-9-b ${true ? "" : "nopointer"}`}>

      
      
      <Canvas style={{width:"100%",height:"250px"}} shadows 
        className={` ${true ? "" : "nopointer"}`}
        camera={{fov:20,position:[1,1.5,isSmallDevice?9:5]}}
        gl={{ preserveDrawingBuffer: true, }}
        // onCreated={(state)=>{ state.gl.setClearColor("#101319"); state.scene.fog = new Fog("#101319",8,16) }}
      >
        <OrbitControls  autoRotateSpeed={.25} autoRotate={true} rotateSpeed={0.15}
          enableDamping={false}
          maxDistance={9}
          minDistance={2}
          enablePan={false}
          // dampingFactor={.01} 
          maxPolarAngle={Math.PI/2+0.7} minPolarAngle={Math.PI/2-0.7}
          // minAzimuthAngle={Math.PI/4}
          // maxAzimuthAngle={Math.PI/4*3}
        />
        <ambientLight args={["#ffffff", 0.015]} />
        <pointLight position={[3,2,0.75]} args={["#ffffff", 0.3, 10]} />
        <pointLight position={[-2,2,-2]} args={["#ffffff", 0.1, 10]} />
        <RoundedBox>
          <meshStandardMaterial color={"#ffffff"} />
        </RoundedBox>
        <Box args={[0.2,0.2,0.1]} position={[0,-0.25,0.5]}>
          <meshStandardMaterial color={"#ffffff"} />
        </Box>

        <group position={[0,0.2,0.5]}>
          <ToggleSwitch />
        </group>

        <Torus rotation={[Math.PI/2,0,0]} args={[5.7,6,16,24]} scale={[1.5,1.5,0.75]}>
          <meshStandardMaterial wireframe={true} emissive={"#333f33"} />
        </Torus>
      </Canvas>        
    </div>        
    </>)
}

export default MarketNewsStage