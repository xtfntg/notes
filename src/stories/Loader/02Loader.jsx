import React, { Suspense, useState } from "react";
import { useProgress, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./02Loader.scss";

export const LoadingScreen = ({ started, onStarted }) => {
  const { progress } = useProgress();
  return (
    <div className={`loadingScreen ${started ? "started" : ""}`}>
      <div className="progress">
        <div
          className="value"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <div className="board">
        <h1 className="title">Please help me!</h1>
        <button
          className="button"
          disabled={progress < 100}
          onClick={onStarted}
        >
          Start
        </button>
      </div>
    </div>
  );
};

const Box = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial />
    </mesh>
  );
};

export const Loader = () => {
  const [start, setStart] = useState(false);

  const style = { width: "600px", height: "400px" };
  return (
    <>
      <Canvas style={style}>
        <color attach="background" args={["#171720"]} />
        <Suspense fallback={null}>
          {start} && <Box />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />
    </>
  );
};
