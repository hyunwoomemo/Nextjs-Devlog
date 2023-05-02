import * as React from "react";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { css } from "@emotion/css";
import { useSelector } from "react-redux";

export default function PostPagination({ numPages }) {
  const router = useRouter();
  const groupCount = 4;
  const [page, setPage] = useState(1);

  const { selectedCategory, selectedTag } = useSelector((state) => state.FilterSlice);

  useEffect(() => {
    setPage(router.query.page === undefined ? 1 : parseInt(router.query.page));
  }, [router.query.page]);

  const handlePrevClick = () => {
    const query = { page: page - 1 };
    if (selectedCategory) {
      query.category = selectedCategory;
    }
    if (selectedTag) {
      query.tag = selectedTag;
    }

    if ((page - 1) % 4 === 0 && page !== 1) {
      query.pageGroup = Math.floor((page - 2) / 4) + 1;
    }

    router.push({ pathname: "/blog/posts", query });
    setPage((prev) => prev - 1);
  };

  const handleNextClick = () => {
    const query = { page: page + 1 };
    if (selectedCategory) {
      query.category = selectedCategory;
    }
    if (selectedTag) {
      query.tag = selectedTag;
    }

    if ((page + 1) % groupCount === 1 && page !== 1) {
      query.pageGroup = Math.floor((page - 1) / groupCount) * groupCount + 5;
    }

    router.push({ pathname: "/blog/posts", query });
    setPage((prev) => prev + 1);
  };

  const handleNumberClick = (e) => {
    const query = { page: e.target.innerText };
    if (selectedCategory) {
      query.category = selectedCategory;
    }
    if (selectedTag) {
      query.tag = selectedTag;
    }

    router.push({ pathname: "/blog/posts", query });
    setPage(parseInt(e.target.innerText));
  };

  const renderPaginationItems = () => {
    const start = Math.floor((page - 1) / groupCount) * groupCount;
    const end = Math.min(numPages, start + groupCount);
    const items = [];

    for (let i = start; i < end; i++) {
      items.push(
        <PaginationItem page={page === i + 1} key={i} onClick={(e) => handleNumberClick(e)}>
          {i + 1}
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Base>
      <Pagination>
        <PrevBtn disabled={page === 1} onClick={handlePrevClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
          </svg>
        </PrevBtn>
        {renderPaginationItems()}
        <NextBtn disabled={page === numPages} onClick={handleNextClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
          </svg>
        </NextBtn>
      </Pagination>
    </Base>
  );
}

const Base = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

const Pagination = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const PaginationItem = styled.li`
  background-color: ${({ page }) => (page ? "var(--purple-color)" : undefined)};
  color: ${({ page }) => (page ? "#fff" : undefined)};
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
`;

const PrevBtn = styled.li`
  width: 25px;
  height: 25px;

  opacity: ${({ disabled }) => (disabled ? "0.2" : undefined)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : undefined)};
`;
const NextBtn = styled.li`
  width: 25px;
  height: 25px;

  opacity: ${({ disabled }) => (disabled ? "0.2" : undefined)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : undefined)};
`;
