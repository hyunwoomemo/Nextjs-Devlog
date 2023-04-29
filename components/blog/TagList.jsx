import { choiceTag } from "@/slices/FilterSlice";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TagList = ({ posts }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleChoiceTag = (tag) => {
    dispatch(choiceTag(tag));
  };

  const { selectedCategory, selectedTag } = useSelector((state) => state.FilterSlice);
  const tagData = selectedCategory
    ? posts
        ?.filter((post) => post.properties.category.select.name === selectedCategory)
        .map((v) => v.properties.tags.multi_select.map((v1) => v1.name))
        .flat()
        .filter((v, i, arr) => arr.indexOf(v) === i)
    : posts
        ?.map((v) => v.properties.tags.multi_select.map((v1) => v1.name))
        .flat()
        .filter((v2, i, arr) => arr.indexOf(v2) === i);

  return (
    <Base>
      <TagItem selectedTag={selectedTag.length === 0} onClick={() => handleChoiceTag()}>{`전체 (${
        selectedCategory ? posts?.filter((v) => v.properties.category.select.name === selectedCategory).length : posts?.length
      } ) `}</TagItem>
      {tagData?.map((v) => {
        const length = posts.map((post) => post.properties.tags.multi_select.map((tag) => tag.name)).filter((item) => item.includes(v) === true).length;
        return (
          <>
            <TagItem selectedTag={selectedTag.includes(v)} key={v.id} onClick={() => handleChoiceTag(v)}>{`${v} (${length})`}</TagItem>
          </>
        );
      })}
    </Base>
  );
};

const Base = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border: 1px solid gray;
  padding: 1rem;
  border-radius: 10px;
  position: relative;

  &:after {
    content: "Tag";
    position: absolute;
    top: -10px;
    background-color: var(--main-background);
    padding: 0 10px;
  }
`;

const TagItem = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: var(--categoryItem-bgc);
  white-space: nowrap;
  max-width: 100%;
  flex: 1 1 auto;

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 12px;
  }

  ${({ selectedTag }) =>
    selectedTag
      ? css`
          background-color: var(--primary-color);
          color: #fff;
        `
      : css``}
`;
export default TagList;
