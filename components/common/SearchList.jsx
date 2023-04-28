import { CODESNIPET_DATABASE_ID, POST_DATABASE_ID, PROJECT_DATABASE_ID } from "@/config";
import SearchContext from "@/context/SearchContext";
import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import slugify from "slugify";
import SearchPostList from "./SearchPostList";

const SearchList = ({ data, keyword }) => {
  const codesnipetId = CODESNIPET_DATABASE_ID;
  const postsId = POST_DATABASE_ID;
  const projectId = PROJECT_DATABASE_ID;
  const filterData = data?.filter(
    (v) =>
      v.properties.Name.title[0].plain_text.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
      v.properties.tags.multi_select.map((v) => v.name.toLowerCase()).includes(keyword.toLowerCase()) ||
      v.properties.summary?.rich_text[0]?.plain_text.toLowerCase().indexOf(keyword.toLowerCase()) > -1
  );

  const postsData = filterData.filter((v) => v.parent.database_id.replaceAll("-", "") === postsId);
  const projectData = filterData.filter((v) => v.parent.database_id.replaceAll("-", "") === projectId);
  const codesnipetData = filterData.filter((v) => v.parent.database_id.replaceAll("-", "") === codesnipetId);

  console.log(postsData);
  console.log(postsId);
  const [colorEffect, setColorEffect] = useState(false);

  useEffect(() => {
    setColorEffect(true);

    setTimeout(() => {
      setColorEffect(false);
    }, 300);
  }, [filterData.length]);

  return (
    <>
      {filterData.length > 0 ? (
        <Result>
          There are <ResultNumber colorEffect={colorEffect}>{filterData.length}</ResultNumber> search results
        </Result>
      ) : (
        <Result>검색 결과가 없습니다.</Result>
      )}
      <SearchPostList data={postsData} keyword={keyword} parent="포스트" />
      <SearchPostList data={codesnipetData} keyword={keyword} parent="코드 조각들" />
      <SearchPostList data={projectData} keyword={keyword} parent="프로젝트" />
    </>
  );
};

const Result = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;

const ResultNumber = styled.span`
  color: ${({ colorEffect }) => (colorEffect ? "purple" : undefined)};
  font-size: ${({ colorEffect }) => (colorEffect ? "18px" : undefined)};
  transition: all 0.3s;
`;

const Base = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
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

export default SearchList;
