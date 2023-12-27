import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function BookCover({
    color="#afaaaa",
    position = [0, 0, -10],
    points = null,
    length = 15.2,
    width = 5,
    wallWidth = 1,
    roofWidth = 1
} = {}) {
    const { viewport } = useThree();

    const offsetHeight = 0
    const referenceDepth = 5
    const height = 0.04
    const refHeight = referenceDepth+height
    const roofShape = useMemo(() => [
        [-width/1.2, 0 - (wallWidth / 5)+(refHeight/1.04)],
        [0, 0 - (wallWidth / 5)+(refHeight/1.02)],
        [width/1.2, 0 - (wallWidth / 5)+(refHeight/1.04)],

        [width, 0 - (wallWidth / 5)], [width + roofWidth, 0 - (wallWidth / 5)], [width + roofWidth, refHeight-height*4],

        [width, refHeight-height],
        [0, refHeight],
        [-width, refHeight-height],
        
        [-width - roofWidth, refHeight-height*4], [-width - roofWidth, 0 - (wallWidth / 5)], [-width, 0 - (wallWidth / 5)]
    ], [width, wallWidth, roofWidth]);

    // const roofShape = useMemo(() => [
    //     [0, 0],                     // Bottom-left corner
    //     [width, 0],                 // Bottom-right corner
    //     [width, height],            // Top-right corner
    //     [0, height],                // Top-left corner
    //     [0, 0]                      // Back to Bottom-left corner to close the shape
    // ], [width, height]);
    

    const shapePoints = useMemo(() => {
        let mult = 2;
        return points ? points : roofShape.map(([x, y]) => [x * mult, y * mult]);
    }, [points, roofShape]);

    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(shapePoints[0][0], shapePoints[0][1]);
        for (let i = 1; i < shapePoints.length; i++) {
            shape.lineTo(shapePoints[i][0], shapePoints[i][1]);
        }
        return shape;
    }, [shapePoints]);

    const extrudeSettings = useMemo(() => ({
        curveSegments: 1,
        steps: 1,
        depth: length,
        bevelEnabled: false
    }), [length]);

    const meshRef = useRef<any>();

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.position.set(...position);
        }
    }, [position]);

    return (
        <mesh ref={meshRef} castShadow receiveShadow>
            <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]} />
            <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
    );
}
