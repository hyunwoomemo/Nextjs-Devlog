import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SearchPostList = ({ data, keyword, parent }) => {
  const [fold, setFold] = useState(false);

  const handleFold = () => {
    setFold(!fold);
  };
  return (
    <Container>
      <PostCategory>
        <CategoryText>{parent}</CategoryText>
        <CategoryLength>{data.length}</CategoryLength>
        <ActionBtn onClick={handleFold}>
          {fold ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </ActionBtn>
      </PostCategory>
      <Base fold={fold}>
        {data?.map((post) => {
          const category = post.properties?.category?.select?.name;
          const highlightedCateogry = category?.replace(new RegExp(keyword, "gi"), `<mark>${keyword}</mark>`);
          const title = post.properties?.Name.title[0].plain_text;
          const highlightedTitle = title.replace(new RegExp(keyword, "gi"), `<mark>${keyword}</mark>`);
          const imgSrc = post.cover?.file?.url || post.cover?.external.url;
          const summary = post.properties.summary?.rich_text[0]?.plain_text;
          const highlightedSummary = summary?.replace(new RegExp(keyword, "gi"), `<mark>${keyword}</mark>`);
          const tags = post.properties.tags?.multi_select;
          const id = post.id;
          const projectName = post.properties.프로젝트명?.rich_text[0]?.plain_text;
          const highlightedProjectName = projectName?.replace(new RegExp(keyword, "gi"), `<mark>${keyword}</mark>`);
          const createdDate = dayjs(new Date(post.created_time)).format("YYYY-MM-DD");
          let parentDb;
          switch (parent) {
            case "포스트":
              parentDb = "posts";
              break;

            case "코드 조각들":
              parentDb = "codesnipet";
              break;

            case "프로젝트":
              parentDb = "projects";
              break;
          }

          return (
            <Post href={parentDb === "projects" ? `/${parentDb}/${id}` : `/blog/${parentDb}/${id}`} key={post.id}>
              <Wrapper>
                {imgSrc ? <ImageItem src={imgSrc} alt="cover image" width="300" height="250" layout="fixed" objectFit="cover" quality={100} /> : <DefaultImg>Hyunwoomemo&apos;s Devlog</DefaultImg>}
                <CreatedDate>{createdDate}</CreatedDate>
                <Title dangerouslySetInnerHTML={{ __html: highlightedTitle }}></Title>
                {!projectName ? <Category dangerouslySetInnerHTML={{ __html: highlightedCateogry }}></Category> : <Category dangerouslySetInnerHTML={{ __html: highlightedProjectName }}></Category>}
                <Summary dangerouslySetInnerHTML={{ __html: highlightedSummary }}></Summary>

                <Tags>
                  {tags?.map((tag) => {
                    let background;
                    if (typeof window === "object" ? window.localStorage.getItem("theme") === "dark" : undefined) {
                      background = darkThemeTagColor;
                    } else {
                      background = lightThemeTagColor;
                    }
                    const tagColor = background[tag.color];
                    const highlightedTag = tag.name.replace(new RegExp(keyword, "gi"), `<mark>${keyword}</mark>`);
                    return <li key={tag.id} style={{ backgroundColor: tagColor }} dangerouslySetInnerHTML={{ __html: highlightedTag }}></li>;
                  })}
                </Tags>
              </Wrapper>
            </Post>
          );
        })}
      </Base>
    </Container>
  );
};

const Container = styled.div`
  border-bottom: 1px solid gray;

  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;

const PostCategory = styled.div`
  display: flex;
  font-size: 20px;
  gap: 10px;
  align-items: center;
  padding: 1rem 0;
  margin: 1rem 0;
`;

const CategoryText = styled.div``;
const CategoryLength = styled.div`
  padding: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--text-color);
  color: var(--main-background);
  font-size: 14px;
`;
const ActionBtn = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  > svg {
    width: 30px;
  }
`;

const Base = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  transition: all 0.3s;
  transform-origin: top;
  overflow: hidden;

  @media (max-width: 768px) {
  }

  @media (min-width: 769px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  ${({ fold }) =>
    fold
      ? css`
          transform: scaleY(0);
          height: 0;
        `
      : css`
          transform: scaleY(1);
          height: auto;
          padding: 1rem 0;
        `}
`;

const Post = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: var(--post-item-background);
  transition: all 0.3s;
`;

const DefaultImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 20px;
  width: 100%;
  height: 100%;
  color: var(--text-color);
  font-size: 20px;

  @media (max-width: 768px) {
    height: 150px;
    font-size: 14px;
  }

  @media (min-width: 769px) {
    height: 250px;
  }
`;

const ImageItem = styled(Image)`
  border-radius: 5px 5px 0 0;
  object-fit: cover;
  width: 100%;

  @media (max-width: 768px) {
    height: 150px;
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

export default SearchPostList;
