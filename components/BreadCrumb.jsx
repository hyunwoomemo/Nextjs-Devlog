import { POST_DATABASE_ID, TOKEN } from "@/config";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "./Modal";

const BreadCrumb = ({ data }) => {
  console.log(data);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const filterData = data?.results.map((v) => v.properties.category?.select?.name).filter((v1, i, arr) => arr.indexOf(v1) === i);
  console.log(filterData);

  return (
    <Base style={{ display: router.pathname === "/" ? "none" : "block" }}>
      <BreadCrumbWrapper>
        <BreadCrumbItem href="/">home</BreadCrumbItem>
        <BreadCrumbItem href={router.pathname.indexOf("blog") > -1 ? "/blog" : "/projects"}>{router.pathname.indexOf("blog") > -1 ? "blog" : "projects"}</BreadCrumbItem>
        <BreadCrumbModalItem href="/blog" onClick={() => setIsOpen(true)}>
          전체 게시글
        </BreadCrumbModalItem>
        <Modal isOpen={isOpen} onClose={handleClose} position="center">
          <ModalBody>
            {filterData?.map((d, i) => {
              return <li key={i}>{d}</li>;
            })}
          </ModalBody>
        </Modal>
      </BreadCrumbWrapper>
    </Base>
  );
};

const Base = styled.div`
  padding: 2rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
`;

const BreadCrumbWrapper = styled.ul`
  display: flex;
  gap: 1rem;
`;

const BreadCrumbItem = styled(Link)`
  &:after {
    content: "/";
    margin-left: 1rem;
  }
`;

const BreadCrumbModalItem = styled.div``;

const ModalBody = styled.div``;

export default BreadCrumb;
