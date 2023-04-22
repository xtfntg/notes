import * as THREE from "three";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useHelper } from "@react-three/drei";
import { CameraHelper } from "three";
function Camera() {
  const camera = useRef();
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState(true);
  const vec = new THREE.Vector3();
  useHelper(camera, CameraHelper);

  //方法1
  useFrame((state) => {
    const step = 0.05;
    zoom ? vec.set(focus.x, focus.y, focus.z + 0.2) : vec.set(0, 0, 3);
    state.camera.position.lerp(vec, step);
    /*  state.camera.position.set(0, 1, 1); */
    state.camera.lookAt(0, 0, 0);

    state.camera.updateProjectionMatrix();
  });

  return (
    <perspectiveCamera
      makeDefault={false}
      position={[0, 0, 3]}
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

export const CameraLookAt = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#191E28" };
  return (
    <Canvas style={style}>
      <Camera />
      <Box />
      <OrbitControls />
    </Canvas>
  );
};
