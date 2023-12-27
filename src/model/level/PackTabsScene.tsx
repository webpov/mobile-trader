"use client"
import { Box, RoundedBox, MapControls, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSearchParams } from "next/navigation";
import WormHoleModel from "@/model/parts/WormHoleModel";
import { LoadingFullScreen } from "@/model/tools/LoadingFullScreen";
import { useUrlParamCatcher } from "@/../script/util/hook/useUrlParamCatcher";
import * as THREE from 'three'


import { FixedScrollingCamera } from "../core/FixedScrollingCamera";
import BankRoof from "../core/BankRoof";

export default function PackTabsScene() {
  
  const $ltfChart:any = useRef()
  const $htfChart:any = useRef()


  const searchParams = useSearchParams();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [mounted, setMounted] = useState(false);
  const [selectedCubes, setSelectedCubes] = useState(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  function generateBoxPositions(count: number, interval: number, zigzagAmplitude: number=0) {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const yPosition = selectedCubes.has(i) ? 1 : 0; 
      const xPosition = (i % 2 === 0) ? -zigzagAmplitude : zigzagAmplitude;
      positions.push([xPosition, yPosition, i * interval]);
    }
    return positions;
  }
  
  const boxPositions = generateBoxPositions(15, 1,0.3);

  function toggleCubeSelection(index: number) {
    const newSelection = new Set(selectedCubes);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    setSelectedCubes(newSelection);
  }

  if (!mounted) return <LoadingFullScreen />;

  return (
    <div className={`flex-col h-100 tx-altfont-4 bg-b-10 box-shadow-i-9-b ${true ? "" : "nopointer"}`}>
      <Canvas
        style={{ maxWidth: "100vw", height: "100%" }}
        shadows
        camera={{ fov: 10, position: [0, isSmallDevice ? 16 : 13, isSmallDevice ? 16 : 13] }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <FixedScrollingCamera zThreshold={isSmallDevice ? 16 : 13} />
        {/* <OrbitControls /> */}

        <pointLight  position={[6, 8, 4]} intensity={2} distance={20} />
        
        <ambientLight intensity={0.02} />

        {boxPositions.map((position, index) => (
          <group key={index}>
            <group position={[0.48, -0.24, 0]}>
              <group scale={[0.01,0.1,0.1]} position={new THREE.Vector3(...position)} rotation={[Math.PI/2, 0, Math.PI/2]}>
                <BankRoof color={selectedCubes.has(index) ? "pink" : "grey"} />
              </group>
            </group>
              <RoundedBox
              
                castShadow
                receiveShadow
                rotation={[0, 0, 0]}
                position={new THREE.Vector3(...position)}
                args={[1, 1.5, 0.2]}
                onDoubleClick={(e:any) => {e.stopPropagation(); toggleCubeSelection(index)}}
              >
                <meshStandardMaterial color={selectedCubes.has(index) ? "red" : "white"} />
              </RoundedBox>
          </group>
        ))}




      </Canvas>
    </div>
  )
}


