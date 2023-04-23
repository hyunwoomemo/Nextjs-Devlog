import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import styled from "@emotion/styled";
import SearchList from "./SearchList";

const Search = ({ active, posts }) => {
  console.log(posts);
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const keywordLength = posts?.filter(
    (v) => v.properties.Name.title[0].plain_text.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || v.properties.tags.multi_select.map((v) => v.name.toLowerCase()).includes(keyword.toLowerCase())
  );
  return (
    <Base active={active} id="base">
      <SearchInput placeholder="검색어를 입력하세요" onChange={handleSearch}></SearchInput>
      {keyword ? <SearchList data={posts} keyword={keyword} /> : undefined}
    </Base>
  );
};

const Base = styled.div`
  height: ${({ active }) => (active ? `50vh` : "0")};
  transition: all 0.3s;
  margin-top: 2rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SearchInput = styled.input`
  background-color: var(--tag-background);
  border: 0;
  padding: 1rem;
  width: 100%;
  border-radius: 10px;
`;

const SearchResult = styled.div``;

export default Search;
