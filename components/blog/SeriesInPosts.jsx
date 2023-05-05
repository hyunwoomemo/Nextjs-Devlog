import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SeriesInPosts = ({ seriesPosts, seriesName }) => {
  console.log(seriesPosts, seriesName);
  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <Container>
      <Base show={show}>
        <Header>
          <Title>{`🗂️ ${seriesName}`}</Title>
          <AccordionBtn onClick={() => setShow(!show)} show={show}>
            목록 보기
          </AccordionBtn>
        </Header>
        <Wrapper show={show}>
          {seriesPosts.map((v, i) => {
            return (
              <SeriesItem href={`/blog/posts/${v.id}`} key={v.id} data-order={`${i + 1}. `} current={v.id === router.query.id}>
                {v.properties.Name?.title[0]?.plain_text}
              </SeriesItem>
            );
          })}
        </Wrapper>
      </Base>
    </Container>
  );
};

const Base = styled.div`
  transition: height 0.3s;
  background-color: var(--toc-bgc);
  border-radius: 5px;

  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }

  ${({ show }) =>
    show
      ? css``
      : css`
          height: 100px;
        `}
`;

const Container = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  word-break: keep-all;
  line-height: 20px;

  @media (min-width: 769px) {
    font-size: 18px;
  }
`;

const AccordionBtn = styled.div`
  padding: 1rem 0;
  font-size: 14px;
  text-decoration: underline;

  @media (min-width: 769px) {
    font-size: 16px;
  }
`;

const Wrapper = styled.div`
  transition: all 0.3s;
  transform-origin: 0 0;
  ${({ show }) =>
    show
      ? css`
          transform: scaleY(1);
        `
      : css`
          transform: scaleY(0);
        `}

  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const SeriesItem = styled(Link)`
  color: var(--primary-color);
  &:before {
    content: attr(data-order);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  line-height: 18px;
`;

export default SeriesInPosts;
