import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text, useTexture } from "@react-three/drei";
import {
  Physics,
  Debug,
  useSphere,
  usePlane,
  useBox,
} from "@react-three/cannon";

import { proxy, useSnapshot } from "valtio";
import clamp from "lodash-es/clamp";
import * as THREE from "three";
import earthImg from "/cross.jpg";
import pingSound from "/ping.mp3";

const ping = new Audio(pingSound);
const state = proxy({
  count: 0,
  api: {
    pong(velocity) {
      ping.currentTime = 0;
      ping.volume = clamp(velocity / 20, 0, 1);
      ping.play();
      if (velocity > 1) ++state.count;
    },
    reset: () => (state.count = 0),
  },
});
const Paddle = () => {
  const model = useRef();
  const { count } = useSnapshot(state);
  const { nodes, materials } = useGLTF("/pingpong.glb");
  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    args: [3.4, 1, 3.5],
    onCollide: (e) => state.api.pong(e.contact.impactVelocity),
  }));
  useFrame((state) => {
    model.current.rotation.x = THREE.MathUtils.lerp(
      model.current.rotation.x,
      0,
      0.2
    );
    model.current.rotation.y = THREE.MathUtils.lerp(
      model.current.rotation.y,
      (state.mouse.x * Math.PI) / 5,
      0.2
    );
    api.position.set(state.mouse.x * 10, state.mouse.y * 5, 0);
    api.rotation.set(0, 0, model.current.rotation.y);
  });
  return (
    <mesh ref={ref} dispose={null}>
      <group ref={model} position={[-0.05, 0.37, 0.3]} scale={0.15}>
        <Text
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 1, 0]}
          fontSize={10}
          children={count}
        />
        <group rotation={[1.88, -0.35, 2.32]} scale={[2.97, 2.97, 2.97]}>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone003} />
          <primitive object={nodes.Bone006} />
          <primitive object={nodes.Bone010} />
          <skinnedMesh
            castShadow
            receiveShadow
            geometry={nodes.arm.geometry}
            material={materials.glove}
            skeleton={nodes.arm.skeleton}
            material-roughness={1}
          />
        </group>
        <group rotation={[0, -0.04, 0]} scale={141.94}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh.geometry}
            material={materials.wood}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1.geometry}
            material={materials.side}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_2.geometry}
            material={materials.foam}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_3.geometry}
            material={materials.lower}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_4.geometry}
            material={materials.upper}
          />
        </group>
      </group>
    </mesh>
  );
};

function Ball() {
  const map = useTexture(earthImg);
  const [ref, api] = useSphere(() => ({
    mass: 1,
    args: [0.5],
    position: [0, 5, 0],
  }));

  usePlane(() => ({
    //静止
    type: "Static",
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -10, 0],
    onCollide: () => {
      api.position.set(0, 5, 0);
      api.velocity.set(0, 5, 0);
      state.api.reset();
    },
  }));
  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry args={[0.5, 64, 64]} />
      <meshStandardMaterial map={map} />
    </mesh>
  );
}

export const Count = () => {
  const style = { width: "600px", height: "400px" };
  return (
    <Canvas style={style} shadows camera={{ position: [0, 5, 12], fov: 50 }}>
      <color attach="background" args={["#171720"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.4}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <Physics
        iterations={20}
        tolerance={0.0001}
        gravity={[0, -40, 0]}
        defaultContactMaterial={{
          friction: 0.9,
          restitution: 0.7,
          contactEquationStiffness: 1e7,
          contactEquationRelaxation: 1,
          frictionEquationStiffness: 1e7,
          frictionEquationRelaxation: 2,
        }}
      >
        <Debug color="red" scale={1.1}>
          <mesh position={[0, 0, -10]} receiveShadow>
            <planeGeometry args={[1000, 1000]} />
            <meshPhongMaterial color="#374037" />
          </mesh>
          <Ball />
          <Paddle />
        </Debug>
      </Physics>

      {/* <OrbitControls /> */}
    </Canvas>
  );
};
