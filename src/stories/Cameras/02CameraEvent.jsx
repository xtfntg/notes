import React, { useRef, useEffect, useResource } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { PerspectiveCamera } from "three";

const CameraHelper = () => {
  const camera = new PerspectiveCamera(60, 1, 1, 5);
  return (
    <group position={[0, 1, 4]}>
      <cameraHelper args={[camera]} />
    </group>
  );
};

/* 
function TestCamHelper() {
  const [ref, camera] = useResource();
  return (
    <>
      <perspectiveCamera
        ref={ref}
        aspect={1200 / 600}
        radius={(1200 + 600) / 4}
        fov={45}
        position={[0, 0, 2]}
        onUpdate={(self) => self.updateProjectionMatrix()}
      />
      {camera && <cameraHelper args={camera} />}
    </>
  );
} */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
//光标
const cursor = {
  x: 0,
  y: 0,
};
const mesh = {
  position: null,
};

const Box = () => {
  const box = useRef();
  mesh.position = box;
  return (
    <mesh ref={box}>
      <boxGeometry args={[1, 1, 1, 5, 5, 5]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};
const Camera = () => {
  const camera = useRef();
  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
  });
  useFrame(() => {
    if (camera.current && mesh.position.current) {
      camera.current.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
      camera.current.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
      camera.current.position.y = cursor.y * 3;

      camera.current.lookAt(mesh.position.current.position);
    }
  });
  return (
    <perspectiveCamera
      ref={camera}
      fov={60}
      aspect={sizes.width / sizes.height}
      near={0.1}
      far={100}
    >
      <Box />
    </perspectiveCamera>
  );
};

export const CameraEvent = () => {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#8b614d",
  };
  return (
    <Canvas style={style}>
      <Camera />
      <pointLight
        castShadow
        intensity={10}
        position={[10, 10, 10]}
        color={"#7e1671"}
      />

      <Stats />
      <CameraHelper />
      <OrbitControls />
    </Canvas>
  );
};
