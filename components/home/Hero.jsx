import styled from "@emotion/styled";
import React from "react";
import Animation from "./Animation";
import Image from "next/image";

const Hero = () => {
  return (
    <Base>
      <Wrapper>
        <Text>
          <H2>프론트엔드 개발자의 기술 블로그, 다양한 주제의 새로운 지식을 기록합니다.</H2>
          <H3>A technology blog for front-end developers that documents new knowledge on various topics.</H3>
          <Visitor>
            <a href="https://hits.seeyoufarm.com">
              <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fhyunwoomemo.vercel.app&count_bg=%23f1c959&title_bg=%23c0a047&icon=next-dot-js.svg&icon_color=%23FFFFFF&title=Devlog&edge_flat=false" />
            </a>
          </Visitor>
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
  font-size: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
const H2 = styled.h2`
  color: var(--text-color);
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
const H3 = styled.h3`
  color: #70809081;
  line-height: 20px;
  font-size: 14px;
  word-break: keep-all;
  @media (max-width: 768px) {
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 60%;
    font-size: 12px;
  }
`;

const Visitor = styled.div``;

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
