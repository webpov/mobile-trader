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



import BookCover from "../../core/BookCover";
import DynaText from "../../core/DynaText";
import FixedScrollingCamera from "../../core/FixedScrollingCamera";
import { TIERPACK_LINKS, TIERPACK_NAMES } from "./DEFAULT_PACKS";

export default function PackTabsScene() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [mounted, setMounted] = useState(false);
  const [selectedCubes, setSelectedCubes] = useState(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);


  const [lastTap, setLastTap] = useState(0);

  function handleDoubleTap(index:number) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
      // Double tap detected
      toggleCubeSelection(index);
    }
    setLastTap(currentTime);
  }

  function generateBoxPositions(count: number, interval: number, zigzagAmplitude: number=0) {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const yPosition = selectedCubes.has(i) ? 1 : 0; 
      const xPosition = (i % 2 === 0) ? -zigzagAmplitude : zigzagAmplitude;
      positions.push([xPosition, yPosition, i * interval]);
    }
    return positions;
  }
  const boxPositions = generateBoxPositions(14, 1, 0.3);
  function toggleCubeSelection(index:any) {
    const newSelection = new Set(selectedCubes);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    setSelectedCubes(newSelection);
  }
  const openLinkInNewTab = (index:number) => {
    const url = TIERPACK_LINKS[index]
    if (url.startsWith("http")) {
      window.open(url, "_blank");
    } else {
      window.open(`https://${url}`, "_blank");
    }
  }
  const openLinkInThisTab = (index:number) => {
    
    const url = TIERPACK_LINKS[index]
    if (url.startsWith("http")) {
      window.location.href = url
    } else {
      window.location.href = `https://${url}`
    }
  }
  if (!mounted) return <LoadingFullScreen />;

  return (
    <div id="packFrame" className={`flex-col h-100 tx-altfont-4 bg-b-10 box-shadow-i-9-b ${true ? "" : "nopointer"}`}>
      <Canvas
        
        style={{ maxWidth: "100vw", height: "100%" }}
        shadows
        camera={{ fov: 10, position: [0, isSmallDevice ? 16 : 13, isSmallDevice ? 16 : 13] }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <FixedScrollingCamera zThreshold={isSmallDevice ? 16 : 13} />
        <ambientLight intensity={0.02} />
        {/* <pointLight position={[6, 8, 4]} intensity={2} distance={20} /> */}
        {boxPositions.map((position, index) => (
  <group key={index} position={[-0.5,0,0]}>
    <RoundedBox
      castShadow
      receiveShadow
      position={new THREE.Vector3(...position)}
      args={[1, 1.5, 0.2]}
      onPointerDown={(e) => {e.stopPropagation(); toggleCubeSelection(index);}}
    >
      <meshStandardMaterial color={!selectedCubes.has(index) ? "lightgrey" : "white"} />
    </RoundedBox>
    {selectedCubes.has(index) && (
      <group position={new THREE.Vector3(...position)}
        onPointerDown={()=>openLinkInThisTab(index)}
        
      >
        
        <Box args={[.88,1.28, 0.02]} position={[1, 0, 0.1]} castShadow receiveShadow>
              <meshStandardMaterial color="grey" />
            </Box>
        {[...Array(5)].map((_, row) => {
           const selectedATier = TIERPACK_LINKS[index];
  
           const urlParams = new URLSearchParams(
            new URL(selectedATier, window.location.href).search
          )
           const Atokens:any = [];
           const Btokens:any = [];
           const Ctokens:any = [];
           const Dtokens:any = [];
           urlParams.forEach((value, key) => {
            if (key.toLowerCase().startsWith('a')) {
              try {
                const jsonValue = JSON.parse(value);
                if (jsonValue && jsonValue.symbol) {
                  Atokens.push(jsonValue.symbol);
                }
              } catch (e) {
                // Handle any parsing errors
              }
            }
            if (key.toLowerCase().startsWith('b')) {
              try {
                const jsonValue = JSON.parse(value);
                if (jsonValue && jsonValue.symbol) {
                  Btokens.push(jsonValue.symbol);
                }
              } catch (e) {
                // Handle any parsing errors
              }
            }
            if (key.toLowerCase().startsWith('c')) {
              try {
                const jsonValue = JSON.parse(value);
                if (jsonValue && jsonValue.symbol) {
                  Ctokens.push(jsonValue.symbol);
                }
              } catch (e) {
                // Handle any parsing errors
              }
            }
            if (key.toLowerCase().startsWith('d')) {
              try {
                const jsonValue = JSON.parse(value);
                if (jsonValue && jsonValue.symbol) {
                  Dtokens.push(jsonValue.symbol);
                }
              } catch (e) {
                // Handle any parsing errors
              }
            }
          });
          
           const tokenStringA = Atokens.join(', ');
           const tokenStringB = Btokens.join(', ');
           const tokenStringC = Ctokens.join(', ');
           const tokenStringD = Dtokens.join(', ');

          
          return(
          <group key={row}>
            <Box args={[0.15, 0.12, 0.02]} position={[0.7, 0.5 - 0.25 * row, 0.13]} castShadow receiveShadow>
              <meshStandardMaterial color={['red', 'gold', 'green', 'blue',  'purple'][row]} />
            </Box>
            <Box args={[.85, 0.2, 0.05]} position={[1, 0.5 - 0.25 * row, 0.1]} castShadow receiveShadow>
              <meshStandardMaterial color="black" />
            </Box>
            <group position={[0.96,0.5,0]}>
            <DynaText text={`${tokenStringA}`} color="#fff" emissive="#fff" textAlign="start"
              font={0.07} position={[0,0,0.13]} rotation={[0,0,0]}
            />
          </group>
            <group position={[0.96,0.25,0]}>
            <DynaText text={`${tokenStringB}`} color="#fff" emissive="#fff" textAlign="start"
              font={0.07} position={[0,0,0.13]} rotation={[0,0,0]}
            />
          </group>
            <group position={[0.96,0,0]}>
            <DynaText text={`${tokenStringC}`} color="#fff" emissive="#fff" textAlign="start"
              font={0.07} position={[0,0,0.13]} rotation={[0,0,0]}
            />
          </group>
            <group position={[0.96,-0.25,0]}>
            <DynaText text={`${tokenStringD}`} color="#fff" emissive="#fff" textAlign="start"
              font={0.07} position={[0,0,0.13]} rotation={[0,0,0]}
            />
          </group>
          </group>
        )})}
      </group>
    )}
    
    <group position={[0, 0, 0.13]} rotation={[0,0,0]}>
    <group position={new THREE.Vector3(...position)} rotation={[Math.PI/2,0,0]}>
  
    <DynaText text={`${TIERPACK_NAMES[index] || 'Book'}`} color="#000" emissive="#000"
                  font={0.2} position={[0,0,-0.5]}
        />
              
  
  <DynaText text={`#${index}`}  color="#666" emissive="#000"
                font={0.5} position={[0,0,0.5]}
              />
        <DynaText text={`Tier Pack`}  color="#333" emissive="#000"
              font={0.1} position={[0,0,0.2]}
            />
              </group>
              </group>


    <group position={[0.48, -0.24, 0]}>
      <group scale={[0.01,0.1,0.1]} position={new THREE.Vector3(...position)} rotation={[Math.PI/2, 0, Math.PI/2]}>
        <BookCover color={!selectedCubes.has(index) ? "grey" : "lightgrey"} />
      </group>
    </group>
  </group>
))}

      </Canvas>
    </div>
  );
}


