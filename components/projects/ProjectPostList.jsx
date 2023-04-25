import React from "react";
import styled from "@emotion/styled";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import Link from "next/link";
import Image from "next/image";

const ProjectPostList = ({ closeEvent, active, data, title }) => {
  const selectData = data.results.filter((v) => v.properties.프로젝트명?.rich_text[0]?.plain_text === title);
  console.log(selectData);

  return (
    <Base active={active}>
      <Header>
        <Title>포스트 ({selectData.length})</Title>
        <CloseBtn onClick={closeEvent}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </CloseBtn>
      </Header>
      <Container>
        {selectData?.map((post) => {
          const category = post.properties.category.select?.name;
          const title = post.properties.Name.title[0].plain_text;
          const summary = post.properties.summary.rich_text[0]?.plain_text;
          const imgSrc = post.cover?.file?.url || post.cover?.external.url;
          const tags = post.properties.tags.multi_select;
          const id = post.id;
          const num = post.properties.projectNum.select.name;

          return (
            <Post href={`/blog/posts/${id}`} key={post.id}>
              <Wrapper>
                <TitleWrapper>
                  <Num>{num}</Num>
                  <PostTitle>{title}</PostTitle>
                </TitleWrapper>
                <Category>{category}</Category>
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
      </Container>
    </Base>
  );
};

const Base = styled.div`
  background-color: var(--project-post-bgc);
  border-radius: 30px 30px 0 0;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  position: absolute;
  z-index: 9;
  height: 90vh;
  width: 100vw;
  bottom: 0;
  padding: 2rem;
  transform: translateY(100%);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
  transition: all 0.3s;

  transform: ${({ active }) => (active ? "translateY(0)" : undefined)};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1``;

const CloseBtn = styled.div`
  width: 24px;
  height: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const Post = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
  transition: all 0.3s;
  padding: 0 10px;
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

const TitleWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Num = styled.div`
  padding: 4px 6px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: var(--text-color);
  color: var(--main-background);
`;

const PostTitle = styled.h1`
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

  li {
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }
`;

export default ProjectPostList;
