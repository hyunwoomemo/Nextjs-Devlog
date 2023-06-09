import styled from "@emotion/styled";
import PostList from "../blog/PostList";
import RecentPostsList from "./RecentPostsList";
import { useEffect, useRef, useState } from "react";
import RecentProjectList from "./RecentProjectList";
import Link from "next/link";

const RecentPost = ({ data, projects }) => {
  const slideRef = useRef();
  const [slideWidth, setSlideWidth] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    setSlideWidth(slideRef.current.clientWidth);
  }, []);

  const handlePrev = () => {
    setSlideIdx((prev) => prev - 1);
  };
  const handleNext = () => {
    setSlideIdx((prev) => prev + 1);
  };

  useEffect(() => {
    if (typeof window !== "object") return;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setSlideWidth(slideRef.current.clientWidth);
  };

  return (
    <>
      <Base>
        <Header>
          <Title>{slideIdx === 0 ? "Post" : "Project"}</Title>
          <ReadMore href={slideIdx === 0 ? "/blog/posts" : "/projects"}>read more</ReadMore>

          <ArrowWrapper>
            <PrevBtn onClick={handlePrev} disabled={slideIdx === 0}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </PrevBtn>
            <NextBtn onClick={handleNext} disabled={slideIdx === 1}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </NextBtn>
          </ArrowWrapper>
        </Header>
        <Wrapper>
          <SlideWrapper ref={slideRef} move={slideIdx * slideWidth} minWidth={slideWidth}>
            <SlideItem>
              <RecentPostsList data={data} />
            </SlideItem>
            <SlideItem>
              <RecentProjectList projects={projects} />
            </SlideItem>
          </SlideWrapper>
        </Wrapper>
      </Base>
    </>
  );
};

const Base = styled.div`
  max-width: 1100px;
  margin: 3rem auto;
  width: 100%;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 24px;
  color: var(--main-text-color);

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ArrowWrapper = styled.div`
  display: flex;
  gap: 3rem;
  cursor: pointer;
`;

const PrevBtn = styled.div`
  width: 30px;

  display: ${({ disabled }) => (disabled ? "none" : "block")};
`;

const NextBtn = styled.div`
  width: 30px;

  display: ${({ disabled }) => (disabled ? "none" : "block")};
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  transform: translateX(0);
  display: flex;
  flex-wrap: nowrap;
  transition: all 0.3s;
  transform: ${({ move }) => (move ? `translateX(-${move}px)` : undefined)};

  > div {
    min-width: ${({ minWidth }) => (minWidth ? `${minWidth}px` : undefined)};
  }
`;

const SlideItem = styled.div``;

const ReadMore = styled(Link)`
  margin-right: auto;
  margin-left: 10px;
  font-size: 16px;
  color: var(--primary-color);
  vertical-align: bottom;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default RecentPost;
