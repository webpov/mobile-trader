"use client"
import { Plane, useGLTF } from "@react-three/drei";

export default function WormHoleModel({sceneState, sceneCalls,  ...props}: any) {
  const { scene: biglandscape01 } = useGLTF('../models/wormhole.glb')
  return (<>
    <Plane args={[10,10,5,5]} rotation={[Math.PI/2,0,0]} position={[0,1.5,0]}>
          <meshStandardMaterial wireframe={true} emissive={"#222"} />
        </Plane>
  <Plane args={[10,10,5,5]} rotation={[Math.PI/2,0,0]} position={[0,4.5,0]}>
        <meshStandardMaterial wireframe={true} emissive={"#222"} />
      </Plane>
    <group scale={[1,1,1]} position={[0,4,0]}>
      
      {/* <primitive object={biglandscape01} children-0-material-wireframe={true} 
        children-0-material-emissive={"#444"} 
        children-0-material-color={"#000000"} 
      /> */}
    </group>
  </>)
}
