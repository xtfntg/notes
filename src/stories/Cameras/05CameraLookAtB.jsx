import * as THREE from "three";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useHelper } from "@react-three/drei";
import { CameraHelper } from "three";
function Camera() {
  const camera = useRef();
  useHelper(camera, CameraHelper);

  //方法2
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (camera.current) {
      camera.current.lookAt(0, 0, 0);
      camera.current.position.x = Math.sin(t) * 4;
      camera.current.position.z = Math.cos(t) * 4;
    }
  });

  return (
    <perspectiveCamera
      makeDefault={false}
      position={[0, 3, 3]}
      near={1}
      far={4}
      ref={camera}
    />
  );
}

function Box() {
  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}

export const CameraLookAtB = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#191E28" };
  return (
    <Canvas style={style}>
      <Camera />
      <Box />
      <OrbitControls />
    </Canvas>
  );
};
