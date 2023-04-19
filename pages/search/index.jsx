import { POST_DATABASE_ID, TOKEN } from "@/config";
import styled from "@emotion/styled";
import { Client } from "@notionhq/client/build/src";
import React from "react";
import { useEffect } from "react";

const Search = () => {
  const notion = new Client({ auth: TOKEN });
  const dbId = POST_DATABASE_ID;

  useEffect(() => {
    const input = document.querySelector("#input");
    if (typeof window === undefined) return;
    window.addEventListener("input", async (e) => {
      const searchQuery = e.target.value;

      // Notion API를 사용하여 데이터베이스 검색
      const { results } = await notion.databases.query({
        database_id: dbId,
        filter: {
          and: [
            {
              property: "Name",
              title: {
                contains: searchQuery, // 검색어가 포함된 타이틀
              },
            },
          ],
        },
      });

      // 검색 결과를 출력
      list.innerHTML = "";

      results.forEach((page) => {
        const { title, url } = page.properties.Name;
        const li = document.createElement("li");
        li.innerHTML = `<a href="${url}" target="_blank">${title}</a>`;
        list.appendChild(li);
      });
    });
  }, [dbId, notion.databases]);

  return (
    <Base>
      <SearchInput id="input" type="text" placeholder="검색어를 입력하세요"></SearchInput>
    </Base>
  );
};

const Base = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding: 1rem;
`;

export default Search;
