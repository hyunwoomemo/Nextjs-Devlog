import { CODESNIPET_DATABASE_ID, POST_DATABASE_ID, PROJECT_DATABASE_ID } from "@/config";
import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import slugify from "slugify";

const SearchList = ({ data, keyword, fade }) => {
  const codesnipetId = CODESNIPET_DATABASE_ID;
  const postsId = POST_DATABASE_ID;
  const projectId = PROJECT_DATABASE_ID;
  return (
    <>
      <Base fade={fade}>
        {data
          ?.filter(
            (v) =>
              v.properties.Name.title[0].plain_text.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || v.properties.tags.multi_select.map((v) => v.name.toLowerCase()).includes(keyword.toLowerCase())
          )
          .map((post) => {
            const category = post.properties?.category?.select?.name;
            const title = post.properties?.Name.title[0].plain_text;
            const imgSrc = post.cover?.file?.url || post.cover?.external.url;
            const summary = post.properties.summary?.rich_text[0]?.plain_text;
            const tags = post.properties.tags?.multi_select;
            const id = post.id;
            let parentDb;
            switch (post.parent.database_id.replaceAll("-", "")) {
              case codesnipetId:
                parentDb = "codesnipet";
                break;

              case postsId:
                parentDb = "posts";
                break;

              case projectId:
                parentDb = "projects";
                break;
            }

            return (
              <Post href={parentDb === "projects" ? `/${parentDb}/${id}` : `/blog/${parentDb}/${id}`} key={post.id}>
                <Wrapper>
                  {imgSrc ? <ImageItem src={imgSrc} alt="cover image" width="150" height="120" layout="fixed" objectFit="cover" quality={100} /> : <DefaultImg>Hyunwoomemo&apos;s Devlog</DefaultImg>}
                  <Contents>
                    <Title>{title}</Title>
                    <Category>{`${parentDb} / ${category}`}</Category>
                    <Summary>{summary}</Summary>
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
                  </Contents>
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
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  grid-template-columns: 1fr;

  transition: all 0.3s;

  ${({ fade }) =>
    fade
      ? css`
          opacity: 0;
        `
      : css`
          opacity: 1;
        `}
`;

const Post = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: var(--post-item-background);
  transition: all 0.3s;
  margin: 0 auto;
  width: 100%;
`;

const DefaultImg = styled.div`
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 20px;
  width: 150px;
  height: 120px;
  color: var(--text-color);
  font-size: 14px;
  background-color: #d6d6d6;
`;

const ImageItem = styled(Image)`
  border-radius: 5px;
`;

const Wrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;

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
  margin-top: auto;
  margin-bottom: 5px;

  li {
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }
`;

export default SearchList;
