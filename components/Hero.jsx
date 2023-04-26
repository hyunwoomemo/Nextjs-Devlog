import styled from "@emotion/styled";
import React from "react";
import Animation from "./Animation";

const Hero = () => {
  return (
    <Base>
      <Wrapper>
        <Text>
          <H1>안녕하세요, 이현우입니다.</H1>
          <H2></H2>
          <MoreBtn>더 보러가기</MoreBtn>
        </Text>
        <Lottie>
          <Animation />
        </Lottie>
      </Wrapper>
    </Base>
  );
};

const Base = styled.div`
  margin-top: 5rem;
  display: flex;

  @media (min-width: 1280px) {
    max-width: 1280px;
    margin: 0 auto;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 1rem;
  }
`;

const Text = styled.div`
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const H1 = styled.h1`
  font-size: 36px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;
const H2 = styled.h2`
  color: slategray;
  line-height: 20px;
  word-break: keep-all;
  @media (max-width: 768px) {
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 60%;
    font-size: 14px;
  }
`;

const MoreBtn = styled.div`
  background-color: rgb(79 70 229);
  align-self: flex-start;
  padding: 10px;
  border-radius: 5px;
  color: #fff;

  @media (max-width: 768px) {
    align-self: center;
    font-size: 14px;
  }
`;

const Lottie = styled.div`
  width: 40%;
  max-width: 600px;

  @media (max-width: 768px) {
    width: 70%;
  }
`;

export default Hero;
