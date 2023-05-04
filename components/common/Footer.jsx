import ThemeContext from "@/context/ThemeContext";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

export default function Footer() {
  const router = useRouter();
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    if (typeof window !== "object") return;
    setCurrentTheme(window.localStorage.getItem("theme"));
    document.body.dataset.theme = window.localStorage.getItem("theme");
  }, [themeMode]);

  const handleTheme = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
    window.localStorage.setItem("theme", window.localStorage.getItem("theme") === "dark" ? "light" : "dark");
  };

  const { filterOpen } = useSelector((state) => state.FilterSlice);

  return (
    <Base hide={filterOpen || router.pathname === "/about" || (router.pathname.indexOf("/projects") > -1 && router.query.id)}>
      <Wrapper>
        <LinkWrapper>
          <LinkItem href="https://github.com/hyunwoomemo">
            <AiFillGithub />
          </LinkItem>
          <LinkItem href="/about">
            <CgProfile />
          </LinkItem>
        </LinkWrapper>
        <Left>
          <Link href="/">
            <span>Hyunwoomemo&apos;s Devlog</span>
          </Link>
          <Copyright>© 2023. hyunwoo.lee. All rights reserved</Copyright>
        </Left>
        <ToggleBtn dark={currentTheme === "dark"} onClick={handleTheme}>
          {currentTheme === "dark" ? <BsMoonFill /> : <BsFillSunFill />}
        </ToggleBtn>
      </Wrapper>
    </Base>
  );
}

const Base = styled.footer`
  align-items: center;
  border-top: 1px solid var(--border-bottom-color);
  margin-top: auto;

  ${({ hide }) =>
    hide
      ? css`
          display: none;
        `
      : undefined}
`;

const Wrapper = styled.div`
  padding: 1rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 10px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  justify-content: center;
  flex: 1 1 auto;

  > a {
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const Copyright = styled.p`
  font-size: 12px;
  color: var(--primary-color);
  line-height: 16px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const LinkWrapper = styled.ul`
  display: flex;
  margin-left: auto;
  margin: 0 1rem;
  gap: 10px;
  > div {
    background-color: #fff;
    padding: 5px;
    width: 44px;
    height: 44px;
    border-radius: 5px;
  }
`;

const ToggleBtn = styled.div`
  cursor: pointer;
  margin: 0 1rem;
  @media (max-width: 768px) {
    display: none;
  }

  color: ${({ dark }) => (dark ? "yellow" : "orange")};
  display: ${({ isCSR }) => (isCSR ? "flex" : "none")};

  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main-background);
  border-radius: 5px;
`;

const LinkItem = styled(Link)`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  svg {
    width: 100%;
    height: 100%;
    > g {
      fill: var(--text-color);
    }

    > path {
      fill: var(--text-color);
    }
  }
`;
