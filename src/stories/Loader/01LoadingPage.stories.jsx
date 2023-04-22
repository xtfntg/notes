import React from "react";
import { LoadingPage } from "./01LoadingPage";

export default {
  title: "Loader/LoadingPage",
  component: LoadingPage,
};

const LoadingPageLate = () => <LoadingPage />;
export const LoadingPageLates = LoadingPageLate.bind({});
