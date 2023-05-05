import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Tab = () => {
  const router = useRouter();

  const [active, setActive] = useState(1);
  console.log(router.pathname.slice(router.pathname.lastIndexOf("/") + 1, router.pathname.length));
  const keyword = router.pathname.slice(router.pathname.lastIndexOf("/") + 1, router.pathname.length);

  useEffect(() => {
    switch (keyword) {
      case "posts":
        setActive(1);
        break;
      case "series":
        setActive(2);
        break;
      case "codesnipet":
        setActive(3);
        break;
      default:
        setActive(1);
    }
  }, [keyword]);

  return (
    <Base active={active}>
      <TabItem href="/blog/posts">Posts</TabItem>
      <TabItem href="/blog/series">Series</TabItem>
      <TabItem href="/blog/codesnipet">CodeSnipet</TabItem>
    </Base>
  );
};

const Base = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  display: flex;

  ${({ active }) =>
    active
      ? css`
          > a:nth-of-type(${active}) {
            background-color: tomato;
            color: #fff;
            border-radius: 5px;
          }
        `
      : css``}
`;

const TabItem = styled(Link)`
  padding: 3px 7px;
`;

export default Tab;
