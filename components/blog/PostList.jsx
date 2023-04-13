import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostList = ({ data }) => {
  return (
    <Base>
      {data.results?.map((post) => {
        const title = post.properties.이름.title[0].plain_text;
        const summary = post.properties.summary.rich_text[0]?.plain_text;
        const imgSrc = post.cover?.file?.url || post.cover?.external.url;
        const tags = post.properties.tags.multi_select;
        const start = post.properties.WorkPeriod?.date?.start;
        const end = post.properties.WorkPeriod?.date?.end;
        const id = post.id;

        return (
          <Post href={`/blog/posts/${id}`} key={post.id}>
            <ImageItem src={imgSrc} alt="cover image" width="300" height="250" layout="fixed" objectFit="cover" quality={100} />
            <Wrapper>
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
  );
};

const Base = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 2rem;
  gap: 2rem;

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
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  align-items: center;
  background-color: var(--post-item-background);
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageItem = styled(Image)`
  border-radius: 5px 5px 0 0;
  object-fit: cover;
  width: 100%;

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
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const Summary = styled.h2``;

const Period = styled.span``;

const Tags = styled.ul`
  display: flex;
  gap: 10px;

  li {
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;
  }
`;

export default PostList;
