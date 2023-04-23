import React from "react";
import Modal from "./Modal";
import styled from "@emotion/styled";

const Search = ({ active }) => {
  return <Base active={active}>검색</Base>;
};

const Base = styled.div`
  z-index: 999;
  background-color: red;
  height: ${({ active }) => (active ? "50vh" : "0")};
  transition: all 0.3s;
  overflow: hidden;
`;

export default Search;
