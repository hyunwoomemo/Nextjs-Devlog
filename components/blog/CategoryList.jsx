import { choiceCategory, choiceTag } from "@/slices/FilterSlice";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryList = ({ data, posts }) => {
  const dispatch = useDispatch();
  const handleClickCategory = (category) => {
    dispatch(choiceCategory(category));
    dispatch(choiceTag());
  };

  const { selectedCategory } = useSelector((state) => state.FilterSlice);

  return (
    <Base>
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
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
  max-height: 170px;
  overflow-y: scroll;
  box-sizing: border-box;
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
