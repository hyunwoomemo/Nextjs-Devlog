import React, { useEffect } from "react";
import Portal from "../common/Portal";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
import { useDispatch, useSelector } from "react-redux";
import { GrPowerReset } from "react-icons/gr";
import { choiceCategory, choiceTag, close } from "@/slices/FilterSlice";
import { useRouter } from "next/router";

const Filter = ({ posts }) => {
  const category = posts?.map((v) => v.properties.category.select?.name).filter((v, i, arr) => arr.indexOf(v) === i);
  const dispatch = useDispatch();
  const router = useRouter();

  const { filterOpen, selectedCategory, selectedTag } = useSelector((state) => state.FilterSlice);
  // filter true 인 경우 body 스크롤 방지
  useEffect(() => {
    if (typeof window !== "object") return;

    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // 선택한 필터 초기화
  const handleFilterReset = () => {
    dispatch(choiceCategory());
    dispatch(choiceTag());
    router.push({
      pathname: "/blog/posts",
    });
  };

  // 선택한 필터 저장
  const handleFilterSave = () => {
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

  const handleClose = () => {
    dispatch(close());
    dispatch(choiceCategory());
    dispatch(choiceTag());
  };

  return (
    <Portal selector="#portal">
      <Base filter={filterOpen}>
        <FilterHeader>
          <Reset>
            <GrPowerReset onClick={handleFilterReset} />
          </Reset>
          <Title>카테고리 / 태그</Title>
          <Close onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Close>
        </FilterHeader>
        <Wrapper>
          <CategoryList data={category} posts={posts} />
          <TagList posts={posts} />
        </Wrapper>
        <FilterSaveBtn show={filterOpen} onClick={handleFilterSave}>
          적용
        </FilterSaveBtn>
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
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  height: 100vh;
  max-width: 1100px;
  display: flex;
  flex-direction: column;

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

const FilterHeader = styled.header`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #0000001c;
`;

const Reset = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  align-items: center;
  width: 25px;
  > svg {
    width: 100%;
    height: 100%;

    > path {
      stroke: var(--text-color);
    }
  }

  @media (max-width: 768px) {
    width: 20px;
  }
`;
const Title = styled.div`
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const Close = styled.div`
  width: 25px;

  @media (max-width: 768px) {
    width: 20px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 1100px;
  height: 50vh;

  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }

  display: flex;
  flex-direction: column;
  gap: 3rem;
  flex: 1 1 auto;
`;

const ChoicedFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 12px;
  }

  transition: all 0.3s;

  ${({ active }) =>
    active
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
`;

const ChoicedItem = styled.div`
  padding: 6px 10px;
  background-color: #c0e25a;
  border-radius: 5px;
`;

const FilterSaveBtn = styled.div`
  display: flex;
  gap: 10px;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 90%;
  padding: 10px 0;
  border-radius: 20px;
  margin: 10px 0;

  background-color: var(--primary-color);
  color: #fff;
`;

export default Filter;
