import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const Loading = () => {
  return (
    <Base>
      <Outter></Outter>
      <Circle>
        <InnerCircle></InnerCircle>
      </Circle>
    </Base>
  );
};

export default Loading;

const Base = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const fadeIn = keyframes`
  0% {
    transition: 0.2s;
    opacity: 1;
  }
  50% {
    transition: 0.2s;
    opacity: 0;
  }
  100% {
    transition: 0.2s;
    opacity: 1;
  }
`;

const Outter = styled.div`
  width: 120px;
  height: 120px;
  border: 4px solid var(--text-color);
  border-radius: 100%;
  position: relative;
  margin: 24px auto;
  opacity: 0;
  animation: ${fadeIn} 3s infinite ease-in-out;
`;

const cur = keyframes`
   from {
   transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Circle = styled.div`
  position: relative;
  margin: -135px auto;
  width: 100px;
  height: 100px;
  border: 4px solid var(--text-color);
  border-radius: 100%;
  border-left: none;
  border-right: none;
  border-bottom: none;
  animation: ${cur} 1.8s infinite linear;
`;

const cur2 = keyframes`
  from {
   transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

const InnerCircle = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  border: 4px solid var(--text-color);
  border-radius: 100%;
  border-left: none;
  border-right: none;
  border-top: none;
  margin: 10px auto;
  animation: ${cur2} 0.8s infinite linear;
`;
