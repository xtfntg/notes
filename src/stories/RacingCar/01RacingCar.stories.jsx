import React from "react";
import { RacingCar } from "./01RacingCar";
export default {
  title: "RacingCar/RacingCar",
  coment: RacingCar,
};
const RacingCarLate = () => <RacingCar />;
export const SceneImport = RacingCarLate.bind({});
