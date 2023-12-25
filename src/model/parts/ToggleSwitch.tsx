"use client"
import { Box, Cylinder, OrbitControls, Plane, Ring, RoundedBox, Sphere, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, useRef, Suspense, useEffect, useState, useMemo } from "react"

export default function ToggleSwitch({calls, state, config={}, ...props}: any) {
  const lastCylinderRef:any = useRef();
  const [currentState, s__currentState] = useState(false)
  const triggerToggleClick = (e:any) => {
    e.stopPropagation()
    if (state.isClickBlocked) {
      return
    }
    if (!currentState && config.isConfirmationNeeded) {
      const promptRes = prompt("Confirm action? (y/n)","y")
      
      if (!promptRes) {
        return
      }
    }
    s__currentState(!currentState)
    if (!!calls) {
      calls.onClick(!currentState)
    }
  }

  // const [currentState, s__currentState] = useState(false)

  const triggerWheel = (e:any) => {
    e.stopPropagation()
    // console.log("eeeee", e)
    if (e.wheelDeltaY > 0) {
      if (!currentState) {
        triggerToggleClick(e)
      }
    }
    if (e.wheelDeltaY < 0) {
      if (currentState) {
        triggerToggleClick(e)
      }
    }
  }

  return (<>
  <group {...props} /* onClick={triggerToggleClick} */ /* onWheel={triggerWheel} */
  onClick={triggerToggleClick}>
  {/* onPointerDown={triggerToggleClick}> */}

      
      <Box args={[0.05,0.05,0.34]} position={[0,0,0]} castShadow receiveShadow
      rotation={[!currentState?.5:-0.5,0,0]}
        
      >
          <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box args={[0.07,0.15,0.15]} position={[0,0,0]} receiveShadow castShadow
      >
          <meshStandardMaterial color="#dddddd" />
      </Box>
      <Box args={[0.2,0.3,0.1]} position={[0,0,0]} receiveShadow castShadow
      >
          <meshStandardMaterial color="#cccccc" />
      </Box>

      {/* <spotLight castShadow intensity={currentState ? 1 : 0.2} args={[0xfffaf6, .2, 40]} position={[3, 3, -1]} /> */}

  </group >
  </>)
}
