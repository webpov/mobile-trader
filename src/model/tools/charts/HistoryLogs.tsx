import { Box, Html, Sphere } from "@react-three/drei";
import { useState } from "react";
import { Mesh, MeshStandardMaterial } from "three";

export const HistoryLogs = ({ customChildren, customSizeRatio=10, calls, state, minValue = 15000, maxValue = 69000, latestUnix, oldestUnix }: any) => {
  const cubeSize = 0.01;
  const [clickedCubes, setClickedCubes] = useState<number[]>([]);

  const toggleCubeClick = (index: number) => {
    if (clickedCubes.includes(index)) {
      setClickedCubes(clickedCubes.filter((clickedIndex) => clickedIndex !== index));
    } else {
      setClickedCubes([...clickedCubes, index]);
    }
  };

  return (
    <>
      {!!state.orderLogs && <>
      
        {state.orderLogs.map((order: any, index: any) => {
          // Calculate the Y position based on the price relative to the min and max values
          const price = parseFloat(order.price);
          const normalizedPrice = (price - minValue) / (maxValue - minValue);
          const yPos = ((-1 + 2 * normalizedPrice) / 2) + 0.5; // Normalize to -1 to 1 range

          // Calculate the Z position based on the time of trade
          const tradeTime = new Date(order.time).getTime();
          const timeRange = oldestUnix - latestUnix; // Assuming latestUnix and oldestUnix are in milliseconds
          const zPos = ((tradeTime - latestUnix) / timeRange) 
          // console.log(yPos, normalizedPrice, zPos, tradeTime, timeRange, latestUnix)
          return (
            <group position={[0, yPos, zPos]} key={index}>
              {/* <Box args={[0.01,0.01,0.01]}></Box> */}
                    {/* <Box args={[0.01,0.01,0.01]}></Box> */}
              <group position={[0.05, 0, 0]}>
                <group onClick={() => toggleCubeClick(index)}>
                {!customChildren && <mesh >
                  <boxBufferGeometry args={[cubeSize * (parseInt(order.qty.slice(1)) / 20), cubeSize / 2 * (order.side =="Buy" ? 1 : 1.1), cubeSize / 2]} />
                  <meshStandardMaterial color={order.side == "Buy" ? "#0099ff" : "#ff00ff"}  emissive={order.side == "Buy" ? "#00ff00" : "#ff0000"}  />
                </mesh>}
                {!!customChildren && <>
                  {/* {customChildren()} */}
                  <Sphere args={[cubeSize * (parseInt(order.quoteQty) / customSizeRatio),4,4]} scale={[1,1,0.3]} >
                    <meshStandardMaterial color={order.side == "Buy" ? "#0099ff" : "#ff00ff"}  emissive={order.side == "Buy" ? "#00ff00" : "#ff0000"}  />
                  </Sphere>
                </>}
        
                </group>
                {clickedCubes.includes(index) && (
                  <>
                    <Html position={[0, -0.1, 0]} rotation={[0, 0, 0]}>
                      <div className="" style={{ color: order.side == "Buy" ? "#00ff00" : "#ff0000", fontWeight: "800", textAlign: "center" }}>
                        {order.price}
                      </div>
                    </Html>
                    <Html position={[0.1, -0.2, 0]} rotation={[0, 0, 0]}>
                      <div className="" style={{ color: order.side == "Buy" ? "#00ff00" : "#ff0000", fontSize: "10px", fontWeight: "800", textAlign: "center" }}>
                        {order.time}
                      </div>
                    </Html>
                    <Html position={[0.2, -0.3, 0]} rotation={[0, 0, 0]}>
                      <div className="" style={{ color: order.side == "Buy" ? "#00ff00" : "#ff0000", fontWeight: "800", textAlign: "center" }}>
                        {order.qty}
                      </div>
                    </Html>
                  </>
                )}
              </group>
            </group>
          );
        })}</>}
    </>
  );
};

export default HistoryLogs;
