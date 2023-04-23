import { POST_DATABASE_ID, TOKEN } from "@/config";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "./Modal";

const BreadCrumb = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  if (router.pathname === "/") return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  const filterData = data?.map((v) => v.properties.category?.select?.name).filter((v1, i, arr) => arr.indexOf(v1) === i);

  return (
    <Base style={{ display: router.pathname === "/" || router.pathname.indexOf("codesnipet") > -1 ? "none" : "block" }}>
      <BreadCrumbWrapper>
        <BreadCrumbItem href="/">home</BreadCrumbItem>
        <BreadCrumbItem href={router.pathname.indexOf("blog") > -1 ? "/blog" : "/projects"}>{router.pathname.indexOf("blog") > -1 ? "blog" : "projects"}</BreadCrumbItem>
        <BreadCrumbItem
          href={`/blog/posts/categories/${
            data?.map((v) => [v.id, v.properties.category?.select?.name, v.properties?.Name?.title[0]?.plain_text]).filter((v1, i, arr) => v1[0] === router.query.id)[0][1]
          }`}
        >
          {router.query.id
            ? data?.map((v) => [v.id, v.properties.category?.select?.name, v.properties?.Name?.title[0]?.plain_text]).filter((v1, i, arr) => v1[0] === router.query.id)[0][1]
            : router.query.category
            ? router.query.category
            : router.pathname.lastIndexOf("categories") === 6
            ? "카테고리 선택"
            : "전체 게시글"}
        </BreadCrumbItem>
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
  padding: 1rem 2rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BreadCrumbWrapper = styled.ul`
  display: flex;
  gap: 10px;

  > span {
    &:before {
      content: "📄";
      font-size: 12px;
    }
  }
`;

const BreadCrumbItem = styled(Link)`
  color: var(--purple-color);
  &:after {
    content: ">";
    color: var(--text-color);
    margin-left: 10px;
    font-size: 12px;
  }

  &:last-of-type:after {
    content: "";
  }
`;

const ModalBody = styled.div``;

export default BreadCrumb;
