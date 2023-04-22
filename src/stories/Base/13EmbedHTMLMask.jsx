import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Mask, useMask, OrbitControls, Text } from "@react-three/drei";

function Embed() {
  return (
    <div>
      <h1>这样的嵌套</h1>
      <p>能不能嵌套到物体中</p>
    </div>
  );
}

function Masks() {
  const stencil = useMask(1, true);
  return (
    <>
      <Mask
        id={1}
        colorWrite={false}
        depthWrite={false}
        castShadow
        receiveShadow
        position={[0, 0, 1]}
      >
        <planeGeometry args={[1, 2]} />
        <meshBasicMaterial color={"red"} />
        <Html
          style={{
            position: "relative",
            background: "url(./bg.jpg)",
            backgroundSize: "cover",
            width: "1750px",
            height: "1250px",
            color: "#000",
            overflow: " scroll",
          }}
          scale={40}
          transform
          zIndexRange={[1, 0]}
        >
          <Embed />
        </Html>
      </Mask>
    </>
  );
}

export const EmbedHTMLMask = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };
  return (
    <Canvas
      style={style}
      camera={{ fov: 50, near: 0.01, far: 100000, position: [0, 0, 1500] }}
    >
      <Masks />
      <OrbitControls />
    </Canvas>
  );
};
