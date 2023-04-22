import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, TorusKnot, useGLTF } from "@react-three/drei";
import { Physics, useTrimesh, Debug, useSphere } from "@react-three/cannon";

const WeirdCheerio = ({ position }) => {
  const [ref] = useSphere(
    () => ({ args: [0.1, 0.1], mass: 10, position }),
    useRef(null)
  );
  /*  const [radius] = args; */
  return (
    <TorusKnot ref={ref} args={[0.1, 0.1 / 2]}>
      <meshNormalMaterial />;
    </TorusKnot>
  );
};

const Bowl = ({ rotation }) => {
  const { nodes, materials } = useGLTF("/bowl.glb");
  /* 1.2函数式写法 从1.1基本写法从新编写*/
  const {
    attributes: {
      position: { array: vertices },
    },
    index: { array: indices },
  } = nodes.bowl.geometry;

  const [ref] = useTrimesh(
    /*1.1正常写法 args: [ nodes.bowl.geometry.attributes.position.array,
        nodes.bowl.geometry.index.array] */
    () => ({ args: [vertices, indices], mass: 0, rotation }),
    useRef(null)
  );
  return (
    <mesh ref={ref} geometry={nodes.bowl.geometry}>
      <meshStandardMaterial color={"white"} wireframe={false} />
    </mesh>
  );
};

function Controls() {
  return (
    <div>
      <button>暂停</button>
      <br />
      <button>开始</button>
    </div>
  );
}

const DivStyle = {
  color: "white",
  fontSize: "1.2em",
  left: 50,
  position: "absolute",
  top: 20,
};
export const Trimesh = () => {
  const style = { width: "600px", height: "400px" };
  return (
    <>
      <Canvas style={style} shadows frameloop="demand">
        <color attach="background" args={["#171720"]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Physics shouldInvalidate={false}>
          <Debug color="red" scale={1}>
            <Bowl rotation={[0, 0, 0]} />
            <WeirdCheerio position={[0.3, 11, 0]} />
            <WeirdCheerio position={[0, 10, 0]} />
            <WeirdCheerio position={[0.4, 9, 0.7]} />
            <WeirdCheerio position={[0.2, 13, 1]} />
          </Debug>
        </Physics>
        <OrbitControls />
      </Canvas>
      <div style={DivStyle}>
        <pre>
          <Controls />
        </pre>
      </div>
    </>
  );
};
