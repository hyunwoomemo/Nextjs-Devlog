import React, { useEffect } from "react";
import Portal from "../common/Portal";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
import { useDispatch, useSelector } from "react-redux";
import { choiceCategory, choiceTag, close } from "@/slices/FilterSlice";
import { useRouter } from "next/router";
import { GrPowerReset } from "react-icons/gr";

const Filter = ({ posts }) => {
  const router = useRouter();
  const category = posts.map((v) => v.properties.category.select?.name).filter((v, i, arr) => arr.indexOf(v) === i);

  const dispatch = useDispatch();
  const { selectedCategory, selectedTag, filterOpen } = useSelector((state) => state.FilterSlice);
  // filter true 인 경우 body 스크롤 방지
  useEffect(() => {
    if (typeof window !== "object") return;

    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  console.log(selectedTag);

  const handleSave = () => {
    let query = {};

    if (selectedCategory) {
      query.category = selectedCategory;
    }

    if (selectedTag) {
      query.tag = selectedTag;
    }

    router.push({
      pathname: "/blog/posts",
      query: query,
    });
    dispatch(close());
  };

  useEffect(() => {
    return () => {
      dispatch(close());
    };
  }, [dispatch]);

  return (
    <Portal selector="#portal">
      <Base filter={filterOpen}>
        <Wrapper>
          <CategoryList data={category} posts={posts} />
          <TagList posts={posts} />
        </Wrapper>
        <Action>
          <GrPowerReset />
          <SaveBtn onClick={handleSave}>적용</SaveBtn>
        </Action>
      </Base>
    </Portal>
  );
};

const Base = styled.div`
  width: 100vw;
  backdrop-filter: blur(5px);
  position: absolute;
  z-index: 10;
  transition: all 0.3s;
  background-color: var(--main-background);
  height: calc(100vh - 65px);
  overflow-y: auto;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1100px;
  ${({ filter }) =>
    filter
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;
const Wrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  height: 100%;

  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Action = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 200px;
  height: 100px;
  font-size: 12px;
  white-space: nowrap;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  > svg:first-of-type {
    width: 40px;
    height: 40px;
  }
`;

const SaveBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: var(--main-background);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Filter;
