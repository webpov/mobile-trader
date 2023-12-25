"use client";
import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


export const WorldModelTextured = ({state}:any) => {
  const $cloudsWireframe:any = useRef()

  useFrame(()=>{
    if (!$cloudsWireframe.current) return

    $cloudsWireframe.current.rotation.y += 0.0001
  })

  return (<>
    <Sphere args={[.74,16,8]} castShadow receiveShadow ref={$cloudsWireframe} >
      <meshStandardMaterial wireframe={true} emissive={"#333f33"} />
    </Sphere>
    {!!state && !!state.showWorld &&
      <EarthTextured />
    }
  </>);
};

export const EarthTextured = ({state}:any) => {
  const bump2 = useTexture("./textures/bump2.jpg");
  const earth_jpg = useTexture("./textures/earthmap1k.jpg");
  
  return (<>
    <Sphere args={[0.7, 64, 64]} onClick={(e:any)=>{e.stopPropagation()}}>
      <meshStandardMaterial map={earth_jpg} displacementScale={.32} displacementMap={bump2} />
    </Sphere>
  </>);
};
