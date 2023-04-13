import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [themeMode, setThemeMode] = useState("dark");

  const handleTheme = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.body.dataset.theme = themeMode;
  }, [themeMode]);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Base>
      <Wrapper>
        <Title>Hyunwoomemo</Title>
        <LinkWrapper>
          <Link href="/">홈</Link>
          <Link href="">블로그</Link>
          <Link href="/projects">프로젝트</Link>
          <Link href="">about</Link>
        </LinkWrapper>
        <Hambuger onClick={() => setIsOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zm0 4.5A.75.75 0 013.75 9h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </Hambuger>
        <ThemeToggleBtn dark={themeMode === "dark"} onClick={handleTheme}>
          {themeMode === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          )}
        </ThemeToggleBtn>
      </Wrapper>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalBody>
          <Link href="/">홈</Link>
          <Link href="">블로그</Link>
          <Link href="/projects">프로젝트</Link>
          <Link href="">about</Link>
        </ModalBody>
      </Modal>
    </Base>
  );
};

const Base = styled.header`
  position: sticky;
  padding: 2rem;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);

  @media (min-width: 1280px) {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Title = styled.h1`
  margin-right: auto;
  font-size: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const LinkWrapper = styled.ul`
  display: flex;
  gap: 1rem;
  color: slategray;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hambuger = styled.div`
  height: 100%;
  width: 30px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ThemeToggleBtn = styled.div`
  height: 100%;
  width: 24px;

  color: ${({ dark }) => (dark ? "yellow" : "#3388a9")};
`;

const ModalBody = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default Header;
