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



import BookCover from "../core/BookCover";
import DynaText from "../core/DynaText";

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
  const theData_names = [
    "Jump",
  "Run",
  "Swim",
  "Dance",
  "Sing",
  "Write",
  "Cook",
  "Paint",
  "Laugh",
  "Sleep",
  "Explore",
  "Climb",
  "Read",
  "Drive",
  "Fly",
  "Study",
  "Play",
  "Create",
  "Surf",
  "Hike",
  "testname8",
  "testname9",
  "testname10",
  "testname11",
  "testname12",
  "testname13",
  "testname14",
  "testname15",
  "testname16",
  "testname17",
  "testname18",
  "testname19",
  ]
  const theData_links = [
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
    "https://wtrade.vercel.app/?a0=%7B%22symbol%22%3A%22BTCUSDT%22%2C%22token0%22%3A%22BTC%22%2C%22posCode%22%3A%22a0%22%7D&a1=%7B%22symbol%22%3A%22ETHUSDT%22%2C%22token0%22%3A%22ETH%22%2C%22posCode%22%3A%22a1%22%7D&a2=%7B%22symbol%22%3A%22LINKUSDT%22%2C%22token0%22%3A%22LINK%22%2C%22posCode%22%3A%22a2%22%7D&a3=%7B%22symbol%22%3A%22INJUSDT%22%2C%22token0%22%3A%22INJ%22%2C%22posCode%22%3A%22a3%22%7D&b0=%7B%22symbol%22%3A%22SOLUSDT%22%2C%22token0%22%3A%22SOL%22%2C%22posCode%22%3A%22b0%22%7D&b1=%7B%22symbol%22%3A%22MATICUSDT%22%2C%22token0%22%3A%22MATIC%22%2C%22posCode%22%3A%22b1%22%7D",
  ]
  const openLinkInNewTab = (index:number) => {
    const url = theData_links[index]
    if (url.startsWith("http")) {
      window.open(url, "_blank");
    } else {
      window.open(`https://${url}`, "_blank");
    }
  }
  const openLinkInThisTab = (index:number) => {
    
    const url = theData_links[index]
    if (url.startsWith("http")) {
      window.location.href = url
    } else {
      window.location.href = `https://${url}`
    }
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
        onClick={()=>openLinkInThisTab(index)}
      >
        
        <Box args={[.88,1.28, 0.02]} position={[1, 0, 0.1]} castShadow receiveShadow>
              <meshStandardMaterial color="grey" />
            </Box>
        {[...Array(5)].map((_, row) => (
          <group key={row}>
            <Box args={[0.15, 0.12, 0.02]} position={[0.7, 0.5 - 0.25 * row, 0.13]} castShadow receiveShadow>
              <meshStandardMaterial color={['red', 'green', 'blue', 'yellow', 'purple'][row]} />
            </Box>
            <Box args={[.85, 0.2, 0.05]} position={[1, 0.5 - 0.25 * row, 0.1]} castShadow receiveShadow>
              <meshStandardMaterial color="black" />
            </Box>
          </group>
        ))}
      </group>
    )}
    
    <group position={[0, 0, 0.13]} rotation={[0,0,0]}>
    <group position={new THREE.Vector3(...position)} rotation={[Math.PI/2,0,0]}>
  
    <DynaText text={`${theData_names[index] || 'Book'}`} color="#000" emissive="#000"
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


