import React from "react";

import { CameraLookAt } from "./05CameraLookAt";
import { CameraLookAtB } from "./05CameraLookAtB";

export default {
  title: "Cameras/CameraLookAt",
  component: CameraLookAt,
};

const CameraLookAtLate = () => <CameraLookAt />;
export const CameraLookAtLates = CameraLookAtLate.bind({});

const CameraLookAtBLate = () => <CameraLookAtB />;
export const CameraLookAtBLates = CameraLookAtBLate.bind({});
