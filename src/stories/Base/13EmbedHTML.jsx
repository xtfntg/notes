import * as THREE from "three";
import React, { useRef, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  OrthographicCamera,
  useMask,
  Mask,
  Html,
  ContactShadows,
  Environment,
} from "@react-three/drei";

export function Scene(props) {
  const { nodes, materials } = useGLTF("/mac-draco.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0, -0.04, 0.41]} rotation-x={-0.425}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube008.geometry}
            material={materials.aluminium}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube008_1.geometry}
            material={materials["matte.001"]}
          />
          <mesh castShadow receiveShadow geometry={nodes.Cube008_2.geometry}>
            <Html
              style={{
                width: "334px",
                height: "216px",
                background: "#f0f0f0",
                borderRadius: "3px",
                overflowY: "auto",
                padding: "0",
              }}
              rotation-x={-Math.PI / 2}
              position={[0.3, 0.039, 0.15]}
              transform
              occlude
            >
              <div
                style={{
                  padding: "10px",
                  width: "668px",
                  height: "432px",
                  transform: "scale(0.5)",
                  transformOrigin: "top left",
                }}
                //该stopPropagation()方法可防止调用同一事件的传播。传播意味着向上冒泡到父元素或向下捕获到子元素。

                onPointerDown={(e) => e.stopPropagation()}
              >
                <p>111111111</p>
                <br />
                <p>111111111</p>
                <br />
                <p>111111111</p>
                <br />
                <p>111111111</p>
                <br />
                <p>111111111</p>
                <br />
                <p>111111111</p>
                <br />
                <p>111111111</p>
                <br />
                <p>111111111</p>
                <br />
                <p>111111111</p>
                <br />
                <p>111111111</p>
                <br />
                <p>111111111</p>
                <br />
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.touchbar.geometry}
        material={materials.touchbar}
        position={[0, -0.03, 1.2]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.aluminium}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material={materials.trackpad}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.keyboard.geometry}
        material={materials.keys}
        position={[1.79, 0, 3.45]}
      />
    </group>
  );
}

export const EmbedHTML = () => {
  const style = {
    width: "600px",
    height: "400px",
    background: "#f87",
    /* pointerEvents: "none", */
  };
  return (
    <Canvas style={style} camera={{ position: [-5, 0, -15], fov: 55 }}>
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <group rotation={[0, Math.PI, 0]} position={[0, 0, 0]}>
        <Scene />
      </group>
      <Environment preset="city" />
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  );
};
