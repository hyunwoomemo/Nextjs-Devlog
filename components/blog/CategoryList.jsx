import { choiceCategory, choiceTag } from "@/slices/FilterSlice";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryList = ({ data, posts }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClickCategory = (category) => {
    dispatch(choiceCategory(category));
    dispatch(choiceTag());
  };

  const { selectedCategory, selectedTag } = useSelector((state) => state.FilterSlice);

  return (
    <Base>
      <CategoryItem selectedCategory={selectedCategory === undefined && !router.query.category} onClick={() => handleClickCategory()}>{`전체 (${posts.length})`}</CategoryItem>
      {data?.map((v) => {
        const length = posts?.filter((v1) => v1.properties.category.select?.name === v).length;
        return (
          <>
            <CategoryItem selectedCategory={selectedCategory === v || router.query.category === v} onClick={() => handleClickCategory(v)}>{`${v} (${length})`}</CategoryItem>
          </>
        );
      })}
    </Base>
  );
};

const Base = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  border: 1px solid gray;
  padding: 1rem;
  border-radius: 10px;
  position: relative;

  &:after {
    content: "Category";
    position: absolute;
    top: -10px;
    background-color: var(--main-background);
    padding: 0 10px;
  }
`;

const CategoryItem = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: var(--categoryItem-bgc);
  white-space: nowrap;
  max-width: 100%;
  flex: 1 1 auto;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 12px;
  }

  ${({ selectedCategory }) =>
    selectedCategory
      ? css`
          background-color: var(--primary-color);
          color: #fff;
        `
      : css``}
`;
export default CategoryList;
