import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import Link from "next/link";
import ThemeContext from "@/context/ThemeContext";
import { useRouter } from "next/router";
import BackArrow from "@/public/back-arrow.svg";
import ChoiceCategory from "../blog/ChoiceCategory";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";
import Filter from "../blog/Filter";
import { useDispatch, useSelector } from "react-redux";
import { choiceCategory, choiceTag, close, open } from "@/slices/FilterSlice";

const Header = ({ data, choiceCt, headerTitle, allPosts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState("dark");

  useEffect(() => {
    if (typeof window !== "object") return;
    setCurrentTheme(window.localStorage.getItem("theme"));
    document.body.dataset.theme = window.localStorage.getItem("theme");
  }, [themeMode]);

  const title = data?.filter((v) => v.id === router.query.id)[0]?.properties.Name.title[0].plain_text;

  const categoryLength = data?.filter((v) => v.properties.category.select.name === choiceCt).length;

  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    setScrollTop(document.documentElement.scrollTop);
  };

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTheme = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
    window.localStorage.setItem("theme", window.localStorage.getItem("theme") === "dark" ? "light" : "dark");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // 활성화 탭 스타일 적용

  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (router.pathname.indexOf("/blog") > -1) {
      setActiveTab(2);
    } else if (router.pathname.indexOf("/projects") > -1) {
      setActiveTab(3);
    } else if (router.pathname.indexOf("/about") > -1) {
      setActiveTab(4);
    } else {
      setActiveTab(1);
    }
  }, [router.pathname]);

  // 포스트 필터 기능을 위한 필터 아이콘 클릭 정의
  const dispatch = useDispatch();
  const { filterOpen } = useSelector((state) => state.FilterSlice);

  const handleFilter = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    filterOpen ? dispatch(close()) : dispatch(open());
    dispatch(choiceCategory());
    dispatch(choiceTag());
  };

  return (
    <Base>
      <Wrapper>
        {router.pathname !== "/" ? (
          <BackIcon onClick={() => window.history.back()} filterOpen={filterOpen}>
            <BackArrow width={20} />
          </BackIcon>
        ) : undefined}
        {title && scrollTop > 170 ? (
          <Title onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{title}</Title>
        ) : headerTitle ? (
          <Title>
            {headerTitle === "Posts" ? (
              <>
                {`Posts (${allPosts.results.length})`}
                <FilterIcon onClick={handleFilter} filter={filterOpen}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                    />
                  </svg>
                </FilterIcon>
              </>
            ) : (
              headerTitle
            )}
          </Title>
        ) : choiceCt ? (
          <CategoryLink href="/blog/posts/categories">{`${choiceCt} (${categoryLength})`}</CategoryLink>
        ) : (
          <TitleLink href="/">Hyunwoomemo</TitleLink>
        )}
        {router.pathname.indexOf("blog/posts") > -1 ? <Filter filter={filterOpen} posts={data} /> : undefined}
        <LinkWrapper active={activeTab}>
          <Link href="/">홈</Link>
          <Link href="/blog">블로그</Link>
          <Link href="/projects">프로젝트</Link>
          <Link href="/about">About</Link>
        </LinkWrapper>
        <Hambuger /* onClick={() => setIsOpen(true)} */ filterOpen={filterOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zm0 4.5A.75.75 0 013.75 9h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </Hambuger>
        <SearchBtn href="/search" filterOpen={filterOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </SearchBtn>
      </Wrapper>
      <Modal isOpen={isOpen} onClose={handleClose} position="right">
        <ModalBody active={activeTab}>
          <Link href="/">홈</Link>
          <Link href="/blog">블로그</Link>
          <Link href="/projects">프로젝트</Link>
          <Link href="/about">About</Link>
          <ToggleBtn dark={currentTheme === "dark"} onClick={handleTheme}>
            {currentTheme === "dark" ? <BsMoonFill /> : <BsFillSunFill />}
          </ToggleBtn>
        </ModalBody>
      </Modal>
    </Base>
  );
};

const Base = styled.header`
  position: sticky;
  padding: 1rem 2rem;
  top: 0;
  left: 0;
  right: 0;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  background-color: var(--main-background);
  z-index: 2;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  > svg {
    path {
      fill: var(--text-color);
    }
  }

  ${({ filterOpen }) =>
    filterOpen
      ? css`
          display: none;
        `
      : css``}
`;

const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const Title = styled.h1`
  margin-right: auto;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FilterIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    ${({ filter }) =>
      filter
        ? css`
            > path {
              fill: var(--primary-color);
            }
          `
        : css``}
    width: 20px;
  }
`;

const TitleLink = styled(Link)`
  margin-right: auto;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CategoryLink = styled(Link)`
  margin-right: auto;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  text-decoration: underline;
  color: var(--primary-color);
`;

const LinkWrapper = styled.ul`
  display: flex;
  gap: 1rem;
  color: slategray;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }

  ${({ active }) =>
    active
      ? css`
          > a:nth-of-type(${active}) {
            color: var(--text-color);
          }
        `
      : css``}
`;

const Hambuger = styled.div`
  height: 100%;
  width: 30px;
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    ${({ filterOpen }) =>
      filterOpen
        ? css`
            display: none;
          `
        : css`
            display: block;
          `}
  }
`;

const ToggleBtn = styled.div`
  width: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 50px;

  color: ${({ dark }) => (dark ? "yellow" : "orange")};

  > svg {
    width: 100%;
    font-size: 36px;
  }
`;

const SearchBtn = styled(Link)`
  cursor: pointer;
  svg {
    width: 24px;
  }

  ${({ filterOpen }) =>
    filterOpen
      ? css`
          display: none;
        `
      : css``}
`;

const ModalBody = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: slategray;

  ${({ active }) =>
    active
      ? css`
          > a:nth-of-type(${active}) {
            color: var(--text-color);
          }
        `
      : css``}
`;

export default Header;
