import React from "react";

import { Complex } from "./Complex";

import { Screen } from "./Screen";

export default {
  title: "Examples/Complex",
  component: Complex,
};

const ComplexLate = () => <Complex />;
export const ComplexLates = ComplexLate.bind({});

const ScreenLate = () => <Screen />;
export const ScreenLates = ScreenLate.bind({});
