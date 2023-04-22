import React, { Suspense, useRef, useEffect, useState } from "react";
import {
  Canvas,
  useThree,
  useLoader,
  extend,
  useFrame,
} from "@react-three/fiber";
import { OrbitControls, PositionalAudio } from "@react-three/drei";
import * as THREE from "three";
import { create } from "zustand";
import * as audio from "./audio";
import styled, { css } from "styled-components";

//1.原生Three.js写法
/* const SoundUrl = ({ url }) => {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);
  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setLoop(true);
    sound.current.play();
    camera.add(listener);
    return () => camera.remove(listener);
  }, []);
  return <positionalAudio ref={sound} args={[listener]} />;
};
 */
//2.react写法
/* const audio = new Audio("/Beyond.mp3");
function SoundReact() {
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (start) {
      audio.play();
    }
  }, [start]);
  return;
  <div></div>;
}  */

export const Sound = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };
  const ref = useRef();

  return (
    <>
      <Canvas style={style}>
        <Suspense fallback={null}>
          {/* 3.react-three/drei写法 */}
          {/*  <PositionalAudio
            ref={ref}
            autoplay
            loop
            url="/Blue.mp3"
            distance={3}
          /> */}
          <mesh>
            <boxBufferGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color="hotpink" />
            {/* 1.1组件 <SoundUrl url="/Beyond.mp3" /> */}
          </mesh>
        </Suspense>
        <OrbitControls />
      </Canvas>
      <Hud />
    </>
  );
};

//音乐控制台 创建商店=创建(设置，获取)
const useStore = create((set, get) => {
  return {
    //动作：切换声音(声音=不获取声音){设置 声音  播放音频(声音.名，1，播放)}
    actions: {
      toggleSound(sound = !get().sound) {
        set({ sound });
        playAudio(audio.Rxys, 1, true);
      },
    },
  };
});
//播放音频(音频,音量,循环)
function playAudio(audio, volume = 1, loop = false) {
  //判断 商店.获取状态.声音
  if (useStore.getState().sound) {
    //声音 当前时间 音量 循环  播放 或者暂停
    audio.currentTime = 0;
    audio.volume = volume;
    audio.loop = loop;
    audio.play();
  } else audio.pause();
}
//显示器
function Hud() {
  //转换键=创建商店（状态=状态.动作.切换声音）
  const toggle = useStore((state) => state.actions.toggleSound);
  //声音=创建商店（状态=状态.声音）
  const sound = useStore((state) => state.sound);
  return (
    <UpperLeft onClick={() => toggle()}>
      音乐控制
      <br />
      {sound ? "off" : "on"}
    </UpperLeft>
  );
}
const base = css`
  font-family: "Teko", sans-serif;
  position: absolute;
  text-transform: uppercase;
  font-weight: 900;
  font-variant-numeric: slashed-zero tabular-nums;
  line-height: 1em;
  pointer-events: none;
  color: indianred;
`;
const UpperLeft = styled.div`
  ${base}
  top: 40px;
  left: 50px;
  font-size: 2em;
  transform: skew(5deg, 5deg);
  pointer-events: all;
  cursor: pointer;
  @media only screen and (max-width: 900px) {
    font-size: 1.5em;
  }
`;
