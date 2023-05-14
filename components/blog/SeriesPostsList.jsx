import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect } from "react";
import { CountFilterData, MakeFilterData } from "@/slices/FilterSlice";

const SeriesPostsList = ({ posts }) => {
  return (
    <Base>
      {posts
        ?.filter((v) => v.properties.미완료?.checkbox !== true)
        ?.map((post, i) => {
          const category = post.properties.category.select?.name;
          const title = post.properties.Name.title[0].plain_text;
          const summary = post.properties.summary.rich_text[0]?.plain_text;
          const imgSrc = post.cover?.file?.url || post.cover?.external.url;
          const tags = post.properties.tags.multi_select;
          const id = post.id;
          const createdDate = dayjs(new Date(post.created_time)).format("YYYY-MM-DD");
          const series = post.properties.시리즈?.select?.name;

          return (
            <Post href={`/blog/posts/${id}`} key={post.id}>
              <Wrapper>
                <Title data-order={`${i + 1}. `}>{title}</Title>
                <Summary>{summary}</Summary>
                <CreatedDate>{createdDate}</CreatedDate>
                <Tags>
                  {tags.map((tag) => {
                    let background;
                    if (typeof window === "object" ? window.localStorage.getItem("theme") !== "light" : undefined) {
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
`;

const Post = styled(Link)`
  display: flex;
  border-radius: 10px;
  background-color: var(--post-item-background);
  transition: all 0.3s;
  width: 100%;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Wrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const Category = styled.p`
  color: gray;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Series = styled.div`
  line-height: 18px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: bold;
  position: relative;
  align-self: flex-start;
  word-break: break-all;
  color: var(--main-text-color);

  @media (min-width: 769px) {
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

  &:before {
    content: attr(data-order);
  }
`;

const Summary = styled.h2`
  color: gray;
  line-height: 16px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const CreatedDate = styled.p`
  color: gray;
  font-size: 12px;
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

export default SeriesPostsList;
