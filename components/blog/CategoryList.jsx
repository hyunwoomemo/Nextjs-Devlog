import { choiceCategory, choiceTag } from "@/slices/FilterSlice";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryList = ({ data, posts }) => {
  const dispatch = useDispatch();
  const handleClickCategory = (category) => {
    dispatch(choiceCategory(category));
    dispatch(choiceTag());
  };

  const { selectedCategory, selectedTag } = useSelector((state) => state.FilterSlice);

  return (
    <Base>
      <CategoryItem selectedCategory={selectedCategory === undefined} onClick={() => handleClickCategory()}>{`전체 (${posts.length})`}</CategoryItem>
      {data?.map((v) => {
        const length = posts?.filter((v1) => v1.properties.category.select?.name === v).length;
        return (
          <>
            <CategoryItem selectedCategory={selectedCategory === v} onClick={() => handleClickCategory(v)}>{`${v} (${length})`}</CategoryItem>
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
`;

const CategoryItem = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: var(--categoryItem-bgc);
  white-space: nowrap;
  max-width: 100%;
  flex: 1 1 auto;

  @media (max-width: 768px) {
    padding: 10px;
  }

  ${({ selectedCategory }) =>
    selectedCategory
      ? css`
          border: 1px solid yellowgreen;
        `
      : css``}
`;
export default CategoryList;
