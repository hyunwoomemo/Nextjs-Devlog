import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

const RollingBanner = ({ speed, children }) => {
  const [moveX, setMoveX] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (typeof window !== "object") return;

    if (children.length > 3) {
      const scroll = document.querySelector("#slide-wrapper").scrollWidth;
      const offset = document.querySelector("#slide-wrapper").offsetWidth;

      const check = Math.floor(scroll / offset);

      const move = setInterval(() => {
        setMoveX((prev) => prev + speed * direction);
        document.querySelector("#slide-wrapper").style.transform = `translateX(-${moveX}px)`;
      }, 100);

      if (moveX >= offset * (check - 1) + scroll - offset * check) {
        setDirection(-1);
      } else if (moveX <= 0) {
        setDirection(1);
      }

      return () => {
        clearInterval(move);
      };
    }
  }, [moveX, direction]);

  return (
    <Container id="container">
      <SlideWrapper id="slide-wrapper">
        {children.length > 1 ? (
          children.map((v, i) => {
            return <SlideItem key={i}>{v}</SlideItem>;
          })
        ) : (
          <SlideItem>{children}</SlideItem>
        )}
      </SlideWrapper>
    </Container>
  );
};

export default RollingBanner;

const Container = styled.div`
  overflow: hidden;
`;

const SlideWrapper = styled.ul`
  display: flex;
  gap: 1rem;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
  transition: all 0.3s;
`;

const SlideItem = styled.li`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    height: auto;
    background-color: #fff;
    box-shadow: 0px 0px 10px #fff;
    padding: 1rem;
    width: 70px;
    border-radius: 20px;
  }
`;
