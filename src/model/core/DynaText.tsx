import * as THREE from 'three'
import { Text } from '@react-three/drei';
import { MeshBasicMaterial, MeshStandardMaterial, Vector3 } from 'three';

export function FontText ({
  theFont = '/fonts/marko.ttf',
  children,
  ...props
}:any)  {

  return (
        
        
        <Text {...props} font={theFont} textAlign='left' 
        >
        {children}
      </Text>
  );
};


export function DynaText ({
  onClick= ()=> {},
  text="asd", position=new THREE.Vector3(), color , emissive="#000000", isSelected = false,font=0.35,
  textAlign="center",
  ...props
}:any)  {

  const material = new THREE.MeshStandardMaterial({ color: color, emissive: emissive });



  return (
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
  );
};
export default DynaText