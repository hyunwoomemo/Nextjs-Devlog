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

  const filterData = data?.results.map((v) => v.properties.category?.select?.name).filter((v1, i, arr) => arr.indexOf(v1) === i);

  return (
    <Base style={{ display: router.pathname === "/" ? "none" : "block" }}>
      <BreadCrumbWrapper>
        <BreadCrumbItem href="/">home</BreadCrumbItem>
        <BreadCrumbItem href={router.pathname.indexOf("blog") > -1 ? "/blog" : "/projects"}>
          {router.pathname.indexOf("blog") > -1 ? (
            <span>
              ✏️<span>blog</span>
            </span>
          ) : (
            "🚀projects"
          )}
        </BreadCrumbItem>
        <BreadCrumbItem href="/blog/categories">
          {router.query.id
            ? data?.results.map((v) => [v.id, v.properties.category?.select?.name, v.properties?.이름?.title[0]?.plain_text]).filter((v1, i, arr) => v1[0] === router.query.id)[0][1]
            : router.query.category
            ? router.query.category
            : router.pathname.lastIndexOf("categories") === 6
            ? "카테고리 선택"
            : "전체 게시글"}
        </BreadCrumbItem>
        {/* {router.query.id ? (
          <span>
            {data?.results.map((v) => [v.id, v.properties.category?.select?.name, v.properties?.이름?.title[0]?.plain_text]).filter((v1, i, arr) => v1[0] === router.query.id)[0][2].length > 5
              ? data?.results
                  .map((v) => [v.id, v.properties.category?.select?.name, v.properties?.이름?.title[0]?.plain_text])
                  .filter((v1, i, arr) => v1[0] === router.query.id)[0][2]
                  .slice(
                    0,
                    data?.results
                      .map((v) => [v.id, v.properties.category?.select?.name, v.properties?.이름?.title[0]?.plain_text])
                      .filter((v1, i, arr) => v1[0] === router.query.id)[0][2]
                      .indexOf(" ")
                  ) + "..."
              : data?.results.map((v) => [v.id, v.properties.category?.select?.name, v.properties?.이름?.title[0]?.plain_text]).filter((v1, i, arr) => v1[0] === router.query.id)[0][2]}
          </span>
        ) : undefined} */}
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
  gap: 5px;

  > span {
    &:before {
      content: "📄";
      font-size: 12px;
    }
  }
`;

const BreadCrumbItem = styled(Link)`
  &:first-of-type:before {
    content: "🏠";
    font-size: 12px;
  }

  &:nth-of-type(2) > span {
    font-size: 12px;

    > span {
      font-size: 16px;
    }
  }

  &:nth-of-type(3) {
    color: #346996;
    &:before {
      content: "📚";
      font-size: 12px;
    }
  }

  &:after {
    content: "▪️";
    color: var(--text-color);
    margin-left: 5px;
  }

  &:last-of-type:after {
    content: "";
  }
`;

const ModalBody = styled.div``;

export default BreadCrumb;
