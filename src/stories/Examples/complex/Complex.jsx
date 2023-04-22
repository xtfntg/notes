import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  MeshReflectorMaterial,
} from "@react-three/drei";
import {
  Physics,
  usePlane,
  useBox,
  useCompoundBody,
  Debug,
} from "@react-three/cannon";
import { Cursor, useDragConstraint } from "./Drag";
import { Liqin, Shopping, Box } from "./Liqin";

function Plane(props) {
  const [ref] = usePlane(() => ({ type: "static", ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial
        color="#878790"
        blur={[400, 400]}
        resolution={1024}
        mixBlur={1}
        mixStrength={3}
        depthScale={1}
        minDepthThreshold={0.85}
        metalness={0}
        roughness={1}
      />
    </mesh>
  );
}

export const Complex = () => {
  const domContent = useRef();
  const style = { width: "600px", height: "400px" };
  return (
    <Canvas style={style} shadows camera={{ fov: 50, position: [0.5, 2.5, 2] }}>
      <color attach="background" args={["#171720"]} />
      <fog attach="fog" args={["#171720", 60, 90]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[-20, -5, -20]} color="red" />

      <Physics
        allowSleep={false} //允许睡眠
        axisIndex={0} //轴索引
        gravity={[0, -50, 0]} //重力
      >
        {/* <Debug color="#fff" scale={1}> */}
        <Plane position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]} />
        <Cursor />
        <Liqin position={[1.5, 0.5, 0]} />
        <Shopping portal={domContent} />
        <Box position={[1.5, 0.25, 0]} />
        {/* </Debug> */}
      </Physics>
      {/* <OrbitControls /> */}
    </Canvas>
  );
};
