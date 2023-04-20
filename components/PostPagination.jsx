import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

export default function PostPagination({ numPages }) {
  console.log(numPages);
  const router = useRouter();
  const handleChange = (e) => {
    router.push(`/blog/${e.target.innerText}`);
  };
  return (
    <Base spacing={2}>
      <Pagination count={numPages} color="secondary" onChange={(e) => handleChange(e)} />
    </Base>
  );
}

const Base = styled(Stack)`
  padding: 2rem;
  display: flex;
  justify-content: center;

  ul {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
