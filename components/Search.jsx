import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import styled from "@emotion/styled";
import SearchList from "./SearchList";
import { createPortal } from "react-dom";
import { css } from "@emotion/css";
import Portal from "./Portal";
import SearchContext from "@/context/SearchContext";

const Search = ({ posts }) => {
  const [keyword, setKeyword] = useState("");
  const [fade, setFade] = useState(false);
  const { search, setSearch } = useContext(SearchContext);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 100);
  };

  const keywordLength = posts?.filter(
    (v) => v.properties.Name.title[0].plain_text.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || v.properties.tags.multi_select.map((v) => v.name.toLowerCase()).includes(keyword.toLowerCase())
  );
  return (
    <Portal selector="#portal">
      <Base active={search} id="base">
        <Header>
          <SearchInput id="#search_input" placeholder="검색어를 입력하세요" value={keyword} onChange={handleSearch}></SearchInput>
          <CloseBtn
            onClick={() => {
              setSearch(!search);
              setKeyword("");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </CloseBtn>
        </Header>
        {keyword ? <SearchList data={posts} keyword={keyword} fade={fade} /> : undefined}
      </Base>
    </Portal>
  );
};

const Base = styled.div`
  width: 100vw;
  transition: all 0.3s;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: absolute;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  padding: 2rem;
  background-color: #fff;

  ${({ active }) =>
    active
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CloseBtn = styled.div`
  width: 30px;
  height: 30px;
  margin-left: auto;
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
