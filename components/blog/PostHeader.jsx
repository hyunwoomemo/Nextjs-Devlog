import { POST_DATABASE_ID, TOKEN } from "@/config";
import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import SeriesInPosts from "./SeriesInPosts";

const PostHeader = ({ data }) => {
  const router = useRouter();
  const filterData = data?.filter((v) => v.id === router.query.id);

  const category = filterData[0].properties.category?.select?.name;
  const title = filterData[0].properties.Name.title[0].plain_text;
  const summary = filterData[0].properties.summary?.rich_text[0]?.plain_text;
  const imgSrc = filterData[0].cover?.file?.url || filterData[0].cover?.external.url;
  const tags = filterData[0].properties.tags?.multi_select;
  const createdDate = filterData[0]?.created_time;
  const series = filterData[0].properties.시리즈?.select?.name;

  return (
    <Base>
      <Wrapper>
        <Contents>
          <Title>{title}</Title>
          <Category>{category}</Category>
          <Tags>
            {tags?.map((tag) => {
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
          <Summary>{summary}</Summary>
          <CreatedDate>{dayjs(new Date(createdDate)).format("YYYY-MM-DD HH:mm")}</CreatedDate>
        </Contents>
      </Wrapper>
    </Base>
  );
};

const Base = styled.div`
  margin: 2rem 0;
  border-radius: 5px;
  border-bottom: 1px solid var(--border-bottom-color);
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Category = styled.p``;

const DefaultImg = styled.div`
  right: 0;
  height: 100%;
  width: 100%;
  max-height: 300px;
  opacity: 0.1;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 769px) {
    width: 30%;
    opacity: 0.5;
  }
`;

const ImageItem = styled(Image)`
  right: 0;
  height: 100%;
  width: 100%;
  max-height: 300px;
  opacity: 0.1;
  position: absolute;

  @media (min-width: 769px) {
    width: 30%;
    opacity: 0.5;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Series = styled.div``;

const Title = styled.h1`
  font-size: 32px;
  padding: 2rem 0;
  color: var(--main-text-color);

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  li {
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;
  }
`;

const Summary = styled.p`
  color: gray;
  font-size: 14px;
`;

const CreatedDate = styled.p`
  font-size: 12px;
`;

export default PostHeader;
