import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const TagList = ({ data, posts }) => {
  return (
    <Base>
      <TagItem href={"/blog/posts"}>{`전체 (${posts.length})`}</TagItem>
      {data.map((v) => {
        const length = posts.map((post) => post.properties.tags.multi_select.map((tag) => tag.name)).filter((item) => item.includes(v) === true).length;
        return (
          <>
            <TagItem href={`/blog/posts?tags=${v}`}>{`${v} (${length})`}</TagItem>
          </>
        );
      })}
    </Base>
  );
};

const Base = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  gap: 10px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TagItem = styled(Link)`
  box-sizing: border-box;
  display: flex;
  padding: 1rem;
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
export default TagList;
