import * as THREE from 'three'
import { Text } from '@react-three/drei';
import { MeshBasicMaterial, MeshStandardMaterial, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function FontText ({
  theFont = '/fonts/marko.ttf',
  children,
  ...props
}:any)  {

  return (
        
        // textAlign='left' 
        <Text {...props} font={theFont} 
        >
        {children}
      </Text>
  );
};


export function DynaText ({
  onClick= ()=> {}, hoverSpeed=0,
  text="asd", position=new THREE.Vector3(), color , emissive="#000000", isSelected = false,font=0.35,
  textAlign="center",
  ...props
}:any)  {

  const material = new THREE.MeshStandardMaterial({ color: color, emissive: emissive });
  const $textGroup:any = useRef()
  useFrame((state, delta) => {
    if (!$textGroup.current) {
      return
    } 
    if (!hoverSpeed) {
      return
    } 
    $textGroup.current.position.y = Math.sin(hoverSpeed*state.clock.elapsedTime) /10
  });

  return (<group ref={$textGroup}> 
      <FontText
        receiveShadow
        // castShadow
        onClick={onClick}
        material={material}
        position={position}
        rotation={props.rotation || [-Math.PI/2,0,0]}
        // rotation={[-Math.PI/2,0,0]}
        // {...props,}
        font='/font.ttf'
        fontSize={font}
        maxWidth={100}
        lineHeight={1}
        letterSpacing={-0.06}
        textAlign={textAlign}

      >
        {text}
      </FontText>
    </group>
  );
};
export default DynaText