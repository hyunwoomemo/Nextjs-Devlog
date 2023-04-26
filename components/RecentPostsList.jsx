import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const RecentPostsList = ({ data }) => {
  return (
    <>
      <Base>
        {data?.map((post) => {
          const category = post.properties.category.select?.name;
          const title = post.properties.Name.title[0].plain_text;
          const summary = post.properties.summary.rich_text[0]?.plain_text;
          const tags = post.properties.tags.multi_select;
          const id = post.id;

          return (
            <Post href={`/blog/posts/${id}`} key={post.id}>
              <Wrapper>
                <Category>{category}</Category>
                <Title>{title}</Title>
                <Summary>{summary}</Summary>
                <Tags>
                  {tags.map((tag) => {
                    let background;
                    if (typeof window === "object" ? window.localStorage.getItem("theme") === "dark" : undefined) {
                      background = darkThemeTagColor;
                    } else {
                      background = lightThemeTagColor;
                    }
                    const tagColor = background[tag.color];
                    return (
                      <li key={tag.id} style={{ backgroundColor: tagColor }}>
                        {tag.name}
                      </li>
                    );
                  })}
                </Tags>
              </Wrapper>
            </Post>
          );
        })}
      </Base>
    </>
  );
};

const Base = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  @media (min-width: 769px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Post = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: var(--post-item-background);
  transition: all 0.3s;

  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 400px;
    width: 100%;
  }

  @media (max-width: 1200px) {
    max-width: 450px;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const Category = styled.p`
  color: gray;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Title = styled.h1`
  font-size: 14px;
  line-height: 24px;
  font-weight: bold;
  position: relative;
  align-self: flex-start;
  word-break: break-all;

  @media (min-width: 769px) {
    line-height: 30px;
    font-size: 20px;
  }

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 3px;
    background-color: greenyellow;
    border-radius: 5px;
    left: 0;
    bottom: -5px;
    transition: width 0.3s;
  }

  &:hover:after {
    width: 100%;
  }
`;

const Summary = styled.h2`
  color: gray;
  line-height: 16px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Tags = styled.ul`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  li {
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }
`;

export default RecentPostsList;
