import React, { useRef, useEffect, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

const HtmlContent = () => {
  const style = {
    height: "50px",
    padding: "3px",
    /*  borderRadius: "3px", */
    fontSize: "10px",
    border: "1px solid #888888",
    backgroundColor: "#36292f",
    color: "#f97d1c",
    lineHeight: "20px",
  };
  return (
    <Html style={style} fullscreen={true}>
      <p>
        <span>
          注:运行时读取或修改组件实例的属性。useRef是它是可变的。与更改属性或状态不同
          跟踪应用程序渲染
        </span>
        <br />
        <span>
          步骤:
          🤸1加载useRef🤸2加载运行组件参数useRef🤸3传导运行属性ref🤸4运行属性设置运动方式
        </span>
      </p>
      <br />
    </Html>
  );
};

const Box = (props) => {
  const ref = useRef(0);
  //1.1副作用组件 获取数据、判断、事件、直接更新 DOM 和计时器
  useEffect(() => {});
  //2.1使用更改后的副作用组件
  useLayoutEffect(() => {});

  useFrame(() => {
    ref.current.rotation.x += 0.01;
  });
  return (
    /* 1.3传导运行属性 */
    <mesh {...props} ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshMatcapMaterial color={"#f4ce69"} />
    </mesh>
  );
};

export const UseEffectHook = () => {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#856d72",
  };
  return (
    <Canvas
      style={style}
      camera={{ fov: 75, near: 0.1, far: 1000, position: [5, 5, 5] }}
    >
      <HtmlContent />
      <Box position={[-1.5, 0, 0]} scale={[1, 1, 1]} />
      <Box position={[1.5, 0, 0]} scale={[1, 1, 1]} />

      <OrbitControls />
    </Canvas>
  );
};
