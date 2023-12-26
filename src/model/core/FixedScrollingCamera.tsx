"use client"

import { MapControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const FixedScrollingCamera = ({zThreshold=12}:{zThreshold?:number}) => {
    const { camera } = useThree();
    const prevTouchY = useRef<number>(0);
    const prevMouseY = useRef<number>(0);
    const isDragging = useRef<boolean>(false);
  
    // Function to handle camera movement
    const moveCamera = (deltaZ: number) => {
        if (camera.position.z + deltaZ < zThreshold) {return}
        // console.log("camera.position.z", camera.position.z)
        if (camera.position.z < zThreshold) {
      
            return camera.position.z = zThreshold
        }
      camera.position.z += deltaZ;
    };
  
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
        prevTouchY.current = e.touches[0].clientY;
      };
  
      const handleTouchMove = (e: TouchEvent) => {
        const deltaY = prevTouchY.current - e.touches[0].clientY; // Inverted direction
        moveCamera(deltaY * 0.01); // Adjust sensitivity as needed
        prevTouchY.current = e.touches[0].clientY;
      };
  
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
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
  
    return null; // This component does not render anything
  };
  
  export default FixedScrollingCamera