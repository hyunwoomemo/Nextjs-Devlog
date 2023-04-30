import React from "react";

import Lottie from "react-lottie-player";
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import lottieJson from "@/public/aboutAnimation.json";
import styled from "@emotion/styled";

export default function AboutAnimation() {
  return (
    <Base>
      <Lottie loop animationData={lottieJson} play />
    </Base>
  );
}

const Base = styled.div`
  width: 50%;
`;
