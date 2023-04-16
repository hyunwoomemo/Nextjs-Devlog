import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const ChoiceCategory = ({ category }) => {
  return (
    <Base>
      <Wrapper href="/blog/categories">
        카테고리 | <span>{category || "전체"}</span>
      </Wrapper>
    </Base>
  );
};

const Base = styled.div`
  padding: 1rem 2rem;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Wrapper = styled(Link)`
  display: inline-block;
  border: 1px solid gray;
  padding: 10px 14px;
  background-color: var(--categoryItem-bgc);
  box-shadow: 0px 0px 3px gray;
  border-radius: 5px;

  > span {
    color: var(--purple-color);
  }
`;

export default ChoiceCategory;
