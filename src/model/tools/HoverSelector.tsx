"use client"
import { Box, Cylinder, OrbitControls, Plane, Ring, RoundedBox, Sphere, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState, useMemo, forwardRef, useImperativeHandle } from "react"


export function HoverSelector({sceneState, sceneCalls,fullSpinCount, triggerModel, s__fullSpinCount, isActionActive,s__isActionActive,children, ...props}: any) {
  const $mainGroupRef:any = useRef()
  const triggerClickStart = (e:any) => {
    e.stopPropagation()
    if (isActionActive || reachedEnd) { return
    }
      // alert()
    s__isActionActive(!isActionActive)
    if (!isActionActive) {
      sceneCalls.audioNotification("neutral","../sound/click33.wav")
      // setTargetRotation(Math.PI/2)
    }
  }

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
          
        },1500)
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
}