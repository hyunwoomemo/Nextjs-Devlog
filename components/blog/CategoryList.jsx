import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const CategoryList = ({ data }) => {
  return (
    <Base>
      <CategoryItem href={"/blog"}>전체</CategoryItem>
      {data.map((v) => {
        return (
          <>
            <CategoryItem href={`/blog/categories/${v}`}>{v}</CategoryItem>
          </>
        );
      })}
    </Base>
  );
};

const Base = styled.div`
  display: grid;
  padding: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CategoryItem = styled(Link)`
  box-sizing: border-box;
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: var(--categoryItem-bgc);
  white-space: nowrap;
  max-width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
export default CategoryList;