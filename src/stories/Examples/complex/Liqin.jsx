import React, { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html, Text, Mask, useMask } from "@react-three/drei";
import { useBox, useTrimesh, useSphere } from "@react-three/cannon";
import { useDragConstraint } from "./Drag";
import { proxy, useSnapshot } from "valtio";
import clamp from "lodash-es/clamp";
import pingSound from "/ping.mp3";
import { Screen } from "./Screen";

const ping = new Audio(pingSound);
const state = proxy({
  count: 0,
  api: {
    pong(velocity) {
      ping.currentTime = 0;
      ping.volume = clamp(velocity / 20, 0, 1);
      ping.play();
      if (velocity > 4) ++state.count;
    },
    reset: () => (state.count = 0),
  },
});

export const Liqin = (props, { position }) => {
  const { nodes, materials } = useGLTF("/Liqin.glb");
  const stencil = useMask(1, true);
  const [cup, api] = useSphere(
    () => ({
      args: [0.15, 12],
      mass: 1, //质量
      position,
      linearDamping: 0.9, //线性阻尼
      angularDamping: 1, //角度阻尼
      ...props,

      /*  shapes: [
        { type: "Box", mass: 50, position: [0, 0, 0], args: [5, 0.5, 5] },
      ], */
    }),
    useRef(null)
  );

  const bind = useDragConstraint(cup);
  return (
    <group ref={cup} {...bind} dispose={null}>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.yuamhuan002.geometry}
          material={materials.jiang}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.yuamhuan002_1.geometry}
          material={materials.red}
        />
      </group>
    </group>
  );
};

export function Shopping({ portal, ...props }) {
  const { count } = useSnapshot(state);
  const { nodes, materials } = useGLTF("/gwc.glb");
  const [ref, api] = useTrimesh(
    () => ({
      args: [
        nodes.box009.geometry.attributes.position.array,
        nodes.box009.geometry.index.array,
      ],
      mass: 0,

      onCollide: (e) => state.api.pong(e.contact.impactVelocity),
    }),
    useRef(null)
  );

  return (
    <group dispose={null} {...props}>
      <Text
        anchorX="center"
        anchorY="middle"
        position={[0, 1, 0]}
        fontSize={0.2}
        children={count}
      />
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.box009.geometry}
        material={materials.mesh1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.box009_1.geometry}
        material={materials.mesh2}
      />
      <Mask
        id={1}
        colorWrite={false}
        depthWrite={false}
        castShadow
        receiveShadow
        position={[0, 0.64, 0.6]}
      >
        <mesh castShadow receiveShadow geometry={nodes.mesh1001.geometry}>
          <Html
            style={{
              width: "200px",
              height: "100px",
              background: "#f0f0f0",
              borderRadius: "3px",
              overflowY: "auto",
              padding: "0",
            }}
            rotation-x={-Math.PI / 5}
            position={[0.23, 0, 0.15]}
            transform
            occlude
            scale={0.1}
            portal={portal}
            zIndexRange={[-1, 0]}
          >
            <div
              style={{
                padding: "10px",
                width: "800px",
                height: "1200px",
                transform: "scale(0.5)",
                transformOrigin: "top left",
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Screen />
            </div>
          </Html>
        </mesh>
      </Mask>
    </group>
  );
}

export const Box = (props) => {
  const [BoxRef] = useBox(() => ({
    args: [0.5, 0.5, 0.5],
    mass: 0,
    linearDamping: 0.95,
    angularDamping: 0.95,
    ...props,
  }));
  const bind = useDragConstraint(BoxRef);
  return (
    <mesh {...props}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial />
    </mesh>
  );
};
