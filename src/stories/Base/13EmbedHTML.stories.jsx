import React from "react";

import { EmbedHTML } from "./13EmbedHTML";
import { EmbedHTMLMask } from "./13EmbedHTMLMask";

export default {
  title: "Basis/EmbedHTMLMask",
  component: EmbedHTMLMask,
};

const EmbedHTMLLate = () => <EmbedHTML />;
export const EmbedHTMLLates = EmbedHTMLLate.bind({});

const EmbedHTMLMaskLate = () => <EmbedHTMLMask />;
export const EmbedHTMLMaskLates = EmbedHTMLMaskLate.bind({});
