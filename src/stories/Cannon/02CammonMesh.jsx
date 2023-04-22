import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Physics, Debug, usePlane, useBox } from "@react-three/cannon";
import { useControls } from "leva";

const HtmlContent = () => {
  const style = {
    height: "140px",
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
          注:1.导入物理react-three/cannon。2.创建Physics物理世界3.创建物体接触4.联接对象
          5.api进行交互
        </span>
        <br />
        <span>
          usePlane平面 useBox盒子 useCylinder柱体 useHeightfield高度场
          useParticle粒子 useSphere球体 useTrimesh三维模型
          useConvexPolyhedron凸多面体 useCompoundBody 复合体 useRaycastVehicle
          投射车 usePointToPointConstraint 点对点约束
          useConeTwistConstraint锥体扭曲约束 useDistanceConstraint距离约束
          useHingeConstraint 铰链约束 useLockConstraint使用锁约束 useSpring弹簧
          useRaycastClosest投射最近 useRaycastAny投射所有 useRaycastAll投射全部
          useContactMaterial接触材料
        </span>
        <br />
        <span>
          接口 WorkerApi工人 PublicApi公共 AtomicApi原子 QuaternionApi四元数
          VectorApi向量 ConstraintApi约束 HingeConstraintApi铰链 SpringApi弹簧
          RaycastVehiclePublicApi投射车辆公共
        </span>
        <span>
          属性 InitProps初始化 ProviderProps供应商 AtomicProps原子
          Broadphase判断物体碰撞 Triplet三维 Quad四维 VectorProps向量
          BodyProps身体 Event事件 CollideEvent碰撞事件
          CollideBeginEvent碰撞开始事件 CollideEndEvent 碰撞结束事件
          RayhitEvent投射 CylinderArgs圆柱参数 SphereArgs球体参数
          TrimeshArgs三维参数 HeightfieldArgs高度域参数
          ConvexPolyhedronArgs凸多面体参数 PlaneProps平面
          BoxProps盒子CylinderProps圆柱 ParticleProps粒子 SphereProps球
          TrimeshProps三维 HeightfieldProps高度域 ConvexPolyhedronProps凸多面体
          CompoundBodyProps复合体 ConstraintOptns约束选项
          PointToPointConstraintOpts点对点约束选项
          ConeTwistConstraintOpts锥体扭动约束选项
          DistanceConstraintOpts距离约束选项 HingeConstraintOpts铰链约束选项
          LockConstraintOpts锁定约束选项 SpringOptns弹簧选项
          车轮信息选项WheelInfoOptions RaycastVehicleProps光线投射车辆
        </span>
      </p>
      <br />
    </Html>
  );
};

const Plane = (props) => {
  const [ref] = usePlane(() => ({ mass: 0, ...props }), useRef());
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial />
    </mesh>
  );
};

const Box = (props) => {
  const [ref, api] = useBox(
    () => ({ args: [1, 1, 1], mass: 1, ...props }),
    useRef()
  );
  return (
    <mesh
      ref={ref}
      castShadow
      position={[0, 0.5, 0]}
      onPointerDown={() => api.velocity.set(0, 5, 0)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export const CammonMesh = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };
  return (
    <Canvas style={style} shadows camera={{ position: [0, 2, 4] }}>
      <HtmlContent />
      <spotLight
        position={[2.5, 5, 5]}
        angle={Math.PI / 4}
        penumbra={0.5}
        castShadow
      />

      <Physics
        allowSleep={false} //允许睡眠 当设置为 true 时，如果物理模拟对象在设定的时间段内几乎没有运动或没有运动，它们将停止被模拟。
        axisIndex={0} //轴索引
        broadphase={"Naive"} //阔步前进{无形}
        defaultContactMaterial={{ contactEquationStiffness: 1e6 }} //默认接触材料
        gravity={[0, -9.81, 0]} //重力
        isPaused={false} //已暂停
        iterations={5} //迭代次数
        maxSubSteps={10} //最大子步骤
        quatNormalizeFast={false} //归一化四元数快速
        quatNormalizeSkip={0} //归一化四元数跳过
        shouldInvalidate={true} //应该无效
        size={1000} //尺寸
        solver={"GS"} //求解器
        stepSize={1 / 60} //步长
        tolerance={0.001} //公差
      >
        <Debug color={"red"} scale={1}>
          <Plane rotation={[-Math.PI / 2, 0, 0]} />
          <Box />
        </Debug>
      </Physics>
      <OrbitControls />
    </Canvas>
  );
};
