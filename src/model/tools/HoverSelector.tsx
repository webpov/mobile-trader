"use client"
import { Box, Cylinder, OrbitControls, Plane, Ring, RoundedBox, Sphere, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState, useMemo, forwardRef, useImperativeHandle } from "react"

type HoverSelectorProps = {
  sceneState: any; // Replace 'any' with a more specific type if available
  sceneCalls: any; // Replace 'any' with a more specific type if available
  fullSpinCount: number;
  triggerModel: ReactNode;
  s__fullSpinCount: (count: number) => void;
  isActionActive: boolean;
  s__isActionActive: (isActive: boolean) => void;
  children?: ReactNode;
};

// Define a type for the ref object
export interface HoverSelectorRef {
  triggerClickStart: (e: any) => void;
}

export const HoverSelector = forwardRef<HoverSelectorRef, HoverSelectorProps>(({
  sceneState,
  sceneCalls,
  fullSpinCount,
  triggerModel,
  s__fullSpinCount,
  isActionActive,
  s__isActionActive,
  children,
  ...props
}, ref) => {
  const $mainGroupRef = useRef<any>(null);

  const triggerClickStart = (e: any) => {
    if (!!e?.stopPropagation) {e.stopPropagation();}
    if (isActionActive || reachedEnd) {
      return;
    }
    s__isActionActive(!isActionActive);
    if (!isActionActive) {
      sceneCalls.audioNotification("neutral", "../sound/click33.wav");
    }
  };

  useImperativeHandle(ref, () => ({
    triggerClickStart,
  }));


  const ACTION_SPEED = 1
  const LERP_SPEED = 0.05;
  const [targetRotation, setTargetRotation] = useState(0);
  const [reachedEnd, s__reachedEnd] = useState(false);

  useFrame((ctx, delta)=>{
    if (!$mainGroupRef.current) { return }
    if (!isActionActive) {
      if ($mainGroupRef.current.position.y !== targetRotation) {
        const lerpedRotation = $mainGroupRef.current.position.y + (targetRotation - $mainGroupRef.current.position.y) * LERP_SPEED;
        $mainGroupRef.current.position.y =  lerpedRotation;
      } {
        if ($mainGroupRef.current.position.y > 0 && $mainGroupRef.current.position.y < 0.01){

          $mainGroupRef.current.position.y = 0
          console.log("here")
          if (reachedEnd) {
            s__reachedEnd(false)
            s__fullSpinCount(fullSpinCount+1)
          }
        } else {
          // console.log("$mainGroupRef.current.position.y", $mainGroupRef.current.position.y)
        }
      }
    return
  }
    

  const ACTION_DISTANCE = 1
  // const ACTION_DISTANCE = Math.PI * 1.95
    
    if ($mainGroupRef.current.position.y > ACTION_DISTANCE) {
      // $mainGroupRef.current.position.y = 0
      if (!reachedEnd) {
        s__reachedEnd(true)
        
        setTimeout(()=>{
          s__isActionActive(false)
          
        },2500)
      }
      
      sceneCalls.audioNotification("neutral","../sound/click58.wav")
    } else {
      $mainGroupRef.current.position.y += ACTION_SPEED * delta
    }
    // console.log("$mainGroupRef.current.position.y", $mainGroupRef.current.position.y)
  })

  return (<>
  <group onPointerDown={triggerClickStart}>
    {triggerModel}
  </group>
  <group ref={$mainGroupRef} >
    {children}
  </group>
  </>)
})