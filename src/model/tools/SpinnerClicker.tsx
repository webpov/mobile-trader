"use client"
import { Box, Cylinder, OrbitControls, Plane, Ring, RoundedBox, Sphere, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState, useMemo, forwardRef, useImperativeHandle } from "react"


export function SpinnerClicker({sceneState, sceneCalls,fullSpinCount, triggerModel, s__fullSpinCount, isSpinActive,s__isSpinActive,children, ...props}: any) {
  const $mainGroupRef:any = useRef()
  const triggerClickStart = (e:any) => {
    e.stopPropagation()
    // alert()
    s__isSpinActive(!isSpinActive)
    if (!isSpinActive) {
      sceneCalls.audioNotification("neutral","../sound/click33.wav")
      // setTargetRotation(Math.PI/2)
    }
  }

  const SPIN_SPEED = 3
  const LERP_SPEED = 0.05;
  const [targetRotation, setTargetRotation] = useState(0);
  const [reachedEnd, s__reachedEnd] = useState(false);

  useFrame((ctx, delta)=>{
    if (!$mainGroupRef.current) { return }
    if (!isSpinActive) {
      if ($mainGroupRef.current.rotation.y !== targetRotation) {
        const lerpedRotation = $mainGroupRef.current.rotation.y + (targetRotation - $mainGroupRef.current.rotation.y) * LERP_SPEED;
        $mainGroupRef.current.rotation.y =  lerpedRotation;
      } {
        if ($mainGroupRef.current.rotation.y > 0 && $mainGroupRef.current.rotation.y < 0.01){

          $mainGroupRef.current.rotation.y = 0
          console.log("here")
          if (reachedEnd) {
            s__reachedEnd(false)
            s__fullSpinCount(fullSpinCount+1)
          }
        } else {
          // console.log("$mainGroupRef.current.rotation.y", $mainGroupRef.current.rotation.y)
        }
      }
    return
  }
    


    $mainGroupRef.current.rotation.y += SPIN_SPEED * delta
    if ($mainGroupRef.current.rotation.y > Math.PI * 1.95) {
      // $mainGroupRef.current.rotation.y = 0
      s__isSpinActive(false)
      s__reachedEnd(true)
      sceneCalls.audioNotification("neutral","../sound/click58.wav")
    }
    // console.log("$mainGroupRef.current.rotation.y", $mainGroupRef.current.rotation.y)
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