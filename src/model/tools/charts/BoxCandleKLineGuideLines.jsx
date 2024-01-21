import { Box } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function BoxCandleKLineGuideLines({
  chopStart = 490,
  count = 500,
  temp = new THREE.Object3D(),
  fullArray = [],
  yRange = [0, 1],
  scaleSize = [1, 1, 1],
  cubeSize = 0.02,
  closingContextPrices = [],
  state,
}) {
  const refCandles = useRef(null);
  const refCandleContainer = useRef(null);
  const [vertexColorsRefresher, s__vertexColorsRefresher] = useState(false);
  const [colorArray, s__colorArray] = useState([]);
  const [posArray, s__posArray] = useState([]);
  const [candleArray, s__candleArray] = useState([]);
  // const [wickArray, s__wickArray] = useState([]);

  const fixedArray = [...Array(2).keys()]

  useEffect(() => {
    if (!refCandleContainer.current) { return }
    const fullArrayLength = fullArray.length
    if (!fullArrayLength) { return }

    
    
    const yRangeSize = yRange[1] - yRange[0];
    const minValue =  Math.min(...closingContextPrices)
    const maxValue =  Math.max(...closingContextPrices)
    const comparingRange =  maxValue - minValue


    let new_posArray = [...posArray]
    let new_colorArray = [...colorArray]
    let new_candleArray = [...candleArray]
    // let new_wickArray = [...wickArray]
    for (let i = chopStart; i < count; i++) {
      new_colorArray[i] = Math.random() > 0.5 ? "#ff0000" : "#00ff00"

      if (!fullArray[i]) {
        new_colorArray[i] = "#777777"
        new_posArray[i] = 0
        new_candleArray[i] = 0.1
        // new_wickArray[i] = 0.3
        continue
      }
      const candleOpen = fullArray[i][4]
      const candleClose = fullArray[i][1]
      const lowlow = fullArray[i][3] - minValue
      const highhighDiff = fullArray[i][2] - lowlow
    // console.log("fullArray[i]", fullArray[i])
    const upTrend = candleOpen > candleClose
      const candleStart = upTrend ? candleClose : candleOpen
      const lowestValueElevation = candleStart - minValue
      const priceDiff = !upTrend ? candleOpen - candleClose : candleClose - candleOpen

    
      const candleColor = !upTrend ? "#ff9900" : "#0099ff";
      new_colorArray[i] = candleColor
      
      const yElevation = lowestValueElevation * yRange[1] / comparingRange
      const yWickElevation = lowlow * yRange[1] / comparingRange

    
      const candleBodyHeight = priceDiff  * yRange[1] / comparingRange
      // const wickBodyHeight = highhighDiff  * yRange[1] / comparingRange
      new_posArray[i] = yElevation
      new_candleArray[i] = Math.abs(candleBodyHeight)+0.01
      // new_wickArray[i] = Math.abs(wickBodyHeight)
    }
    s__colorArray(new_colorArray)
    s__posArray(new_posArray)
    s__candleArray(new_candleArray)
    // console.log("new_posArray", new_posArray)
    // console.log("new_candleArray", new_candleArray)
    // s__wickArray(new_wickArray)
  }, [fullArray, closingContextPrices, chopStart]);
  
  


  return (<>
    <group position={[0, 0, 0]}  visible={!!fullArray.length} ref={refCandleContainer}>
      {!!posArray.length && !!candleArray.length && !!fullArray.length && !!candleArray.length &&
       fixedArray.map((arrItem,index)=>{
          
          if (!posArray[index]) {return (<group key={index}></group>)}
          if (index < chopStart) {return (<group key={index}></group>)}
          const forcedChopOffset = ((500-fullArray.length)*cubeSize)
          return (<group key={index}>
            <group position={[(index*cubeSize - (count * cubeSize) || 0)+forcedChopOffset,0,0]}>
              <group position={[0,0,0]}>
                <Box args={[cubeSize*200,candleArray[index] || 0,cubeSize]} castShadow receiveShadow 
                  position={[0,posArray[index] || 0,0]}>
                    <meshStandardMaterial color={colorArray[index]}
                      emissiveIntensity={0.75} emissive={colorArray[index]} />
                </Box>
              </group>
            </group>
            {/* <group position={[((index*cubeSize - (count * cubeSize))  || 0)+forcedChopOffset,0,0]}>
              <Box args={[cubeSize/3,candleArray[index]*2 || 0,cubeSize/3]} castShadow receiveShadow 
                position={[0,posArray[index] || 0,0]}>
                  <meshStandardMaterial color={colorArray[index]} emissiveIntensity={0.25} emissive={colorArray[index]} />
              </Box>
            </group> */}

        </group>)
      })}
    </group>
    </>);
}

export default BoxCandleKLineGuideLines;

























function generateOrangeToBlueColorArray(numberOfElements) {
  // Create an empty array to store the hex color strings.
  const colorArray = [];

  // Start with the orange hex color string.
  let currentColor = "#FFA500";

  // Iterate over the number of elements to generate.
  for (let i = 0; i < numberOfElements; i++) {
    // Add the current color to the array.
    colorArray.push(currentColor);

    // Gradually blend the current color from orange to blue.
    currentColor = blendColors(currentColor, "#0000FF", i / (numberOfElements - 1));
  }

  // Return the array of hex color strings.
  return colorArray;
}

// Blends two hex color strings together.
function blendColors(color1, color2, ratio) {
  // Convert the hex color strings to RGB values.
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  // Calculate the blended RGB values.
  const blendedRgb = {
    red: rgb1.red * (1 - ratio) + rgb2.red * ratio,
    green: rgb1.green * (1 - ratio) + rgb2.green * ratio,
    blue: rgb1.blue * (1 - ratio) + rgb2.blue * ratio,
  };

  // Convert the blended RGB values back to a hex color string.
  return rgbToHex(blendedRgb);
}

// Converts a hex color string to RGB values.
function hexToRgb(hexColor) {
  const red = parseInt(hexColor.substring(1, 3), 16);
  const green = parseInt(hexColor.substring(3, 5), 16);
  const blue = parseInt(hexColor.substring(5, 7), 16);

  return { red, green, blue };
}

// Converts RGB values to a hex color string.
function rgbToHex(rgb) {
  const red = rgb.red.toString(16).padStart(2, "0");
  const green = rgb.green.toString(16).padStart(2, "0");
  const blue = rgb.blue.toString(16).padStart(2, "0");

  return `#${red}${green}${blue}`;
}


//   useEffect(() => {
//     const distanceBetweenCandles = cubeSize * 3; 
//     const yRangeSize = yRange[1] - yRange[0];
//     const minValue =  Math.min(...closingContextPrices)
//     const maxValue =  Math.max(...closingContextPrices)

//     let colors = new Float32Array(count * 3); 
    
//     for (let i = chopStart; i < count; i++) {
//       const scaleValues = [
//         cubeSize * scaleSize[0],
//         cubeSize * scaleSize[1],
//         cubeSize * scaleSize[2],
//       ];
//       temp.scale.set(...scaleValues);
//       const x = i * (distanceBetweenCandles / 2);
//       const y =
//         ((fullArray[i][3] - minValue) * yRangeSize) /
//           (maxValue - minValue) +
//         yRange[0];
    
//       const candleBodyHeight =
//         ((fullArray[i][2] - fullArray[i][3]) /
//           (maxValue - minValue)) *
//         yRangeSize;
//       const candleY = y + candleBodyHeight / 2;
//       temp.scale.set(cubeSize * scaleSize[0] / 3, candleBodyHeight, cubeSize * scaleSize[1]/2 * (i == 499 ? 10 : 1));
//       temp.position.set(x / 3, candleY, 0);
//       temp.updateMatrix();
//       refCandles.current.setMatrixAt(i + count, temp.matrix);
    
//       const currentClose = fullArray[i][4];
//       const previousClose = fullArray[i][1];
    
//       const candleColor = currentClose < previousClose ? new THREE.Color(0x990000) : new THREE.Color(0x009900);
//       if (i == 499) {
//         s__lastColor(candleColor)
//         console.log("asdasd", currentClose < previousClose ? "red 0x990000" : "green 0x009900")
//       }
//       refCandles.current.setColorAt(i + count, candleColor);
//     }
//     refCandles.current.instanceMatrix.needsUpdate = true;

//     refCandles.current.geometry.setAttribute(
//       "color",
//       new THREE.InstancedBufferAttribute(colors, 3)
//     );
//   }, [fullArray, closingContextPrices, chopStart]);
