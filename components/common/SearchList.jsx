import { CODESNIPET_DATABASE_ID, POST_DATABASE_ID, PROJECT_DATABASE_ID } from "@/config";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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

export default SearchList;
