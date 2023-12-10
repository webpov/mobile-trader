"use client";
import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


export const WorldModelTextured = () => {
  const earth_jpg = useTexture("./textures/earthmap1k.jpg");
  const imgTexture3 = useTexture("./textures/earth3.png");
  const bump2 = useTexture("./textures/bump2.jpg");
  const $cloudsWireframe:any = useRef()

  useFrame(()=>{
    if (!$cloudsWireframe.current) return

    $cloudsWireframe.current.rotation.y += 0.0001
  })

  return (<>
  
  <Sphere args={[.75,16,8]} castShadow receiveShadow ref={$cloudsWireframe}>
          <meshStandardMaterial wireframe={true} emissive={"#333f33"} />
        </Sphere>

    <Sphere args={[0.7, 64, 64]}>
      {/* <meshStandardMaterial  /> */}
      <meshStandardMaterial map={earth_jpg} displacementScale={.4} displacementMap={bump2} />
      
      {/* <meshStandardMaterial color={"#172017"} /> */}
    </Sphere>
  </>);
};
