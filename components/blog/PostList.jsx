import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import slugify from "slugify";
import PostPagination from "./PostPagination";
import { useRouter } from "next/router";

const PostList = ({ allPosts }) => {
  // data 중에서 project 포스트는 제외한다.
  /* const selectData = data.filter((v) => v.properties.project.checkbox !== true); */
  const postsPerPage = 6;

  const router = useRouter();
  const currentPage = router.query.page ? router.query.page : 1;
  const offset = (parseInt(currentPage) - 1) * postsPerPage;

  const selectedCategory = router.query.category;
  const selectedTag = router.query.tag;

  // 페이지네이션 기능을 위해서 전체 포스트 중 필터에 맞는 데이터의 총 갯수 파악 필요
  const allPostsFilter = allPosts.filter((v) => {
    if (selectedCategory && selectedTag) {
      if (selectedTag.length === 1) {
        v.properties.category.select.name === selectedCategory &&
          v.properties.tags.multi_select
            .map((v1) => v1.name)
            .flat()
            .includes(selectedTag);
      } else {
        return v.properties.category.select.name === selectedCategory && v.properties.tags.multi_select.map((v1) => v1.name).some((item) => selectedTag?.includes(item));
      }
    } else if (selectedCategory) {
      return v.properties.category.select.name === selectedCategory;
    } else if (selectedTag) {
      if (selectedTag.length === 1) {
        return v.properties.tags.multi_select
          .map((v1) => v1.name)
          .flat()
          .includes(selectedTag);
      } else {
        return v.properties.tags.multi_select.map((v1) => v1.name).some((item) => selectedTag?.includes(item));
      }
    } else {
      return v;
    }
  });

  const pagePosts = allPostsFilter.slice(offset, offset + postsPerPage);

  const categoryFilteredData = selectedCategory ? pagePosts.filter((v) => v.properties.category.select.name === selectedCategory) : pagePosts;

  const tagFilteredData = selectedTag
    ? selectedTag.length === 1
      ? categoryFilteredData.filter((v) =>
          v.properties.tags.multi_select
            .map((v1) => v1.name)
            .flat()
            .includes(selectedTag)
        )
      : categoryFilteredData.filter((v) => v.properties.tags.multi_select.map((v1) => v1.name).some((item) => selectedTag?.includes(item)))
    : categoryFilteredData;

  const filterData = tagFilteredData;
  console.log(typeof filterData);

  const numPages = Math.ceil(allPostsFilter.length / postsPerPage);
  return (
    <>
      <FilterDisplay>
        <FilterCategoryItem>{selectedCategory}</FilterCategoryItem>
        <FilterTagItem>{typeof selectedTag === "object" ? selectedTag.map((v) => v) : selectedTag}</FilterTagItem>
      </FilterDisplay>
      <Base>
        {filterData?.map((post) => {
          const category = post.properties.category.select?.name;
          const title = post.properties.Name.title[0].plain_text;
          const summary = post.properties.summary.rich_text[0]?.plain_text;
          const imgSrc = post.cover?.file?.url || post.cover?.external.url;
          const tags = post.properties.tags.multi_select;
          const id = post.id;
          const createdDate = dayjs(new Date(post.created_time)).format("YYYY-MM-DD");

          return (
            <Post href={`/blog/posts/${id}`} key={post.id}>
              {imgSrc ? <ImageItem src={imgSrc} alt="cover image" width="300" height="250" layout="fixed" objectFit="cover" quality={100} /> : <DefaultImg>Hyunwoomemo&apos;s Devlog</DefaultImg>}
              <Wrapper>
                <Category>{category}</Category>
                <Title>{title}</Title>
                <Summary>{summary}</Summary>
                <CreatedDate>{createdDate}</CreatedDate>
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
      {numPages > 0 ? <PostPagination numPages={numPages} /> : undefined}
    </>
  );
};

const FilterDisplay = styled.div`
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
  display: flex;
`;

const FilterCategoryItem = styled.div``;
const FilterTagItem = styled.div``;

const Base = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

  /*   margin: 0 auto; */

  @media (max-width: 768px) {
    max-width: 400px;
    width: 100%;
  }

  @media (max-width: 1200px) {
    max-width: 450px;
    width: 100%;
  }
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

export default PostList;
