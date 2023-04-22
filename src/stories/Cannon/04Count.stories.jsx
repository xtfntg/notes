import React from "react";

import { Count } from "./04Count";

export default {
  title: "Cannon/Count",
  component: Count,
};

const CountLate = () => <Count />;
export const CountLates = CountLate.bind({});
