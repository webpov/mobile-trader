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



import BankRoof from "../core/BankRoof";

export const FixedScrollingCamera = ({zThreshold=12}:{zThreshold?:number}) => {
  const { camera, scene } = useThree();
  const lightRef = useRef<any>(); // Ref for the light

  // Function to handle camera movement
  const moveCamera = (deltaZ: number) => {
      if (camera.position.z + deltaZ < zThreshold) {return}
      camera.position.z += deltaZ;

      // Move the light at half the speed of the camera
      if (lightRef.current) {
          lightRef.current.position.z += deltaZ / 1.5;
      }
  };

  const prevTouchY = useRef<number>(0);
  const prevMouseY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      moveCamera(e.deltaY * 0.003); // Adjust sensitivity as needed
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [camera]);

// Handle touch events for swipes (inverted for mobile)
useEffect(() => {
  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();  // Prevent default behavior like pull-to-refresh
    prevTouchY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();  // Prevent default behavior like pull-to-refresh
    const deltaY = prevTouchY.current - e.touches[0].clientY; // Inverted direction
    moveCamera(deltaY * 0.01); // Adjust sensitivity as needed
    prevTouchY.current = e.touches[0].clientY;
  };

  window.addEventListener('touchstart', handleTouchStart, { passive: false });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  return () => {
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchmove', handleTouchMove);
  };
}, [camera]);


  // Handle mouse drag events
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      prevMouseY.current = e.clientY;
      isDragging.current = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaY = prevMouseY.current - e.clientY;
        moveCamera(deltaY * 0.01);
        prevMouseY.current = e.clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [camera]);

  useFrame(() => {
    // Lock all other camera angles here if needed
  });

  return (<>
      <group>
          <pointLight ref={lightRef} position={[6, 8, 4]} intensity={2} distance={20} />
      </group>
  </>); 
};

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
  const boxPositions = generateBoxPositions(15, 1, 0.3);
  function toggleCubeSelection(index:any) {
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
        <ambientLight intensity={0.02} />
        <pointLight position={[6, 8, 4]} intensity={2} distance={20} />

        {boxPositions.map((position, index) => (
    <group key={index}>
      <RoundedBox
        castShadow
        receiveShadow
        position={new THREE.Vector3(...position)}
        args={[1, 1.5, 0.2]}
        onClick={() => handleDoubleTap(index)} // Replace onDoubleClick with onClick
      >
        <meshStandardMaterial color={selectedCubes.has(index) ? "red" : "white"} />
      </RoundedBox>
      {/* Other components like BankRoof can be added here if needed */}
    </group>
  ))}
      </Canvas>
    </div>
  );
}


