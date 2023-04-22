//案例网址https://codesandbox.io/s/hinge-constraint-with-cannon-hooks-rgccxz?file=/src/App.js:808-814
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import {
  Physics,
  useSphere,
  useBox,
  useHingeConstraint,
  Debug,
} from "@react-three/cannon";
import { useEffect } from "react";
//2.球体
const Ball = () => {
  const [ref] = useSphere(
    () => ({
      args: [0.25],
      position: [0.5, 4, 0],
      mass: 1,
    }),
    useRef(null)
  );
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.25]} />
      <meshStandardMaterial />
    </mesh>
  );
};
//4.物体参数
const container = [
  {
    size: [12, 0.25, 12],
    position: [0, -0.125, 0],
    color: 0xbb00bb,
    key: "C01",
    name: "floor",
  },
  {
    size: [12, 2, 0.25],
    position: [0, 1, -6],
    color: 0x590055,
    key: "C02",
    name: "wall",
  },
  {
    size: [0.25, 2, 12],
    position: [6, 1, 0],
    color: 0xffff00,
    key: "C03",
    name: "wall",
  },
  {
    size: [12, 2, 0.25],
    position: [0, 1, 6],
    color: 0xaa0000,
    key: "C04",
    name: "wall",
  },
  {
    size: [0.25, 2, 12],
    position: [-6, 1, 0],
    color: 0x00aaaa,
    key: "C05",
    name: "wall",
  },
];
//5.参数循环多个墙体
const Container = () => {
  return (
    <group>
      {container.map((props) => (
        <ContainerWall {...props} />
      ))}
    </group>
  );
};
//3.四周墙体
const ContainerWall = ({ size, position, color, name }) => {
  const [ref] = useBox(() => ({
    args: size,
    position,
  }));
  return (
    <mesh ref={ref} name={name}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
};
//6.桨
const Paddle = ({ position, speed, color }) => {
  const [doorFrameRef] = useBox(
    () => ({
      args: [0.25, 2, 0.25],
      position,
    }),
    useRef(null)
  );
  const [doorRef] = useBox(
    () => ({
      args: [1.75, 2, 0.25],
      position: [position[0] + 1.25, position[1], position[2]],
      mass: 1,
    }),
    useRef(null)
  );
  const [, , hingeApi] = useHingeConstraint(doorRef, doorFrameRef, {
    //碰撞连接
    collideConnected: false,
    axisA: [0, 1, 0],
    axisB: [0, 1, 0],
    pivotA: [-1.05, 0, 0],
    pivotB: [0, 0, 0],
  });
  useEffect(() => {
    //启用电机
    hingeApi.enableMotor();
  }, []);
  useEffect(() => {
    //正向速度是逆时针
    hingeApi.setMotorSpeed(speed);
  }, [speed]);
  return (
    <>
      <mesh ref={doorFrameRef}>
        <boxGeometry args={[0.25, 2, 0.25]} />
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </mesh>
      <mesh ref={doorRef}>
        <boxGeometry args={[1.75, 2, 0.25]} />
        <meshStandardMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </>
  );
};
//1.画布
export const Hinge = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };

  return (
    <Canvas style={style} camera={{ fov: 55, position: [0, 10, 12] }}>
      <Physics>
        <Debug scale={1} color="green">
          <Ball />
          <Paddle position={[0, 1.1, 0]} speed={2} color="cyan" />
          <Paddle position={[-3, 1.1, -3]} speed={1} color="blue" />
          <Paddle position={[3, 1.1, -3]} speed={1} color="red" />
          <Paddle position={[3, 1.1, 3]} speed={1} color="green" />
          <Paddle position={[-3, 1.1, 3]} speed={2} color="yellow" />
          <Container />
        </Debug>
      </Physics>
      <OrbitControls />
      <hemisphereLight args={[0x606060, 0x404040]} />
      <directionalLight position={[1, 1, 1]} />
    </Canvas>
  );
};
