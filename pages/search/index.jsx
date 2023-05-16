import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { CODESNIPET_DATABASE_ID, POST_DATABASE_ID, PROJECT_DATABASE_ID, TOKEN } from "@/config";
import SearchList from "@/components/common/SearchList";
import Portal from "@/components/common/Portal";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const Search = ({ allPosts }) => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [activeKeyword, setActiveKeyword] = useState(false);
  const [recentKeyword, setRecentKeyword] = useState([]);

  const handleSearch = (e) => {
    setKeyword(e.target.value);

    setActiveKeyword(true);
  };

  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      setKeyword("");
    }
  };

  useEffect(() => {
    if (typeof window !== "object") return;

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  const handleSave = (e) => {
    document.activeElement.blur();
    if (recentKeyword.length > 4) {
      setRecentKeyword(recentKeyword.filter((v, i, arr) => i !== arr.length - 1));
    }
    setRecentKeyword((prev) => [keyword, ...prev]);
  };

  return (
    <>
      <NextSeo
        title="Search | Hyunwoomemo"
        description="프론트엔드 개발자의 기술 블로그, 다양한 주제의 글로 새로운 지식을 기록합니다."
        openGraph={{
          type: "website",
          url: "https://hyunwoomemo.vercel.app/",
          title: "Hyunwoomemo's Devlog",
          description: "프론트엔드 개발자의 기술 블로그, 다양한 주제의 글로 새로운 지식을 기록합니다.",
          images: [
            {
              url: "https://user-images.githubusercontent.com/105469077/234896480-32d59948-f5fb-4232-823b-38bb12bb34d6.png",
              width: 800,
              height: 400,
            },
          ],
        }}
      />
      <Base id="base">
        <Header>
          <SearchInput autoFocus autocomplete="off" id="#search_input" placeholder="검색어를 입력하세요" value={keyword} onChange={handleSearch}></SearchInput>
          <CloseBtn
            onClick={() => {
              setKeyword("");
              router.back();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </CloseBtn>
        </Header>
        {keyword ? <SearchList data={allPosts} keyword={keyword} /> : undefined}
      </Base>
    </>
  );
};

const Base = styled.div`
  width: 100vw;
  transition: all 0.3s;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;

const SearchSave = styled.div`
  width: 30px;
  height: 30px;
  margin-left: auto;
  cursor: pointer;
`;

const CloseBtn = styled.div`
  width: 30px;
  height: 30px;
  margin-left: auto;
  cursor: pointer;
`;

const SearchInput = styled.input`
  font-family: "TheJamsil5Bold";
  background-color: var(--text-color);
  color: var(--main-background);
  border: 0;
  padding: 1rem;
  width: 100%;
  border-radius: 10px;

  &::placeholder {
    font-family: "TheJamsil5Bold";
  }
`;

const RecentKeywordList = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 14px;
  flex-wrap: wrap;
`;

const KeywordItem = styled.div`
  padding: 5px 10px;
  background-color: gray;
  color: var(--main-background);
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
`;

export default Search;

export async function getStaticProps() {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      page_size: 100,
    }),
  };

  const snipetRes = await fetch(`https://api.notion.com/v1/databases/${CODESNIPET_DATABASE_ID}/query`, options);
  const postsRes = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);
  const projectRes = await fetch(`https://api.notion.com/v1/databases/${PROJECT_DATABASE_ID}/query`, options);

  const snipetData = await snipetRes.json();
  const postsData = await postsRes.json();
  const filterPostsData = postsData.results.filter((v) => v.properties.미완료.checkbox !== true);
  const projectData = await projectRes.json();
  const allPosts = [...snipetData.results, ...filterPostsData, ...projectData.results];

  return {
    props: { allPosts },
  };
}
