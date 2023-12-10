"use client";
import { Sphere, useTexture } from "@react-three/drei";


export const WorldModelTextured = () => {
  const imgTexture = useTexture("./textures/earth3.png");
  return (<>
    <Sphere args={[0.7, 16, 8]}>
      <meshStandardMaterial map={imgTexture} />
      {/* <meshStandardMaterial color={"#172017"} /> */}
    </Sphere>
  </>);
};
