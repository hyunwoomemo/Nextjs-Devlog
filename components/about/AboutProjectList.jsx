import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Portal from "../common/Portal";
import AboutProjectItem from "./AboutProjectItem";
import { selectId } from "@/slices/AboutSlice";

// 프로젝트 날짜
const date = (start, end) => {
  const startDate = dayjs(new Date(start));
  const endDate = dayjs(new Date(end));

  if (startDate.format("YYYY-MM") === endDate.format("YYYY-MM")) {
    return `${startDate.format("YYYY-MM-DD")} ~ ${endDate.format("YYYY-MM-DD")}`;
  } else {
    return `${startDate.format("YYYY-MM")} ~ ${endDate.format("YYYY-MM")}`;
  }
};

// 프로젝트 내용 렌더링하는 함수
const getContents = (data) => {
  return (
    <ContentWrapper>
      {data.map((v) => {
        const content = v.name;
        return <ContentItem key={content}>{content}</ContentItem>;
      })}
    </ContentWrapper>
  );
};

// 프로젝트 키워드 렌더링하는 함수
const getKeyword = (data) => {
  return (
    <KeywordWrapper>
      {data.map((v) => {
        const keyword = v.name;
        return <KeywordItem key={keyword}>{keyword}</KeywordItem>;
      })}
    </KeywordWrapper>
  );
};

// 프로젝트 깃헙, 서비스 페이지 주소 렌더링하는 함수
const getUrl = (github, url) => {
  return (
    <UrlWrapper>
      <UrlItem href={github}>
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="github">
          <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path>
        </svg>
      </UrlItem>
      <UrlItem href={url}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>
      </UrlItem>
    </UrlWrapper>
  );
};

const AboutProjectList = ({ data }) => {
  console.log(data);
  const dispatch = useDispatch();
  const filterData = data.results.filter((v) => v.properties.상태.status.name === "Done");

  const [showProject, setShowProject] = useState(false);
  const [showId, setShowId] = useState("");

  const handleProjectClick = (id) => {
    setShowProject(!showProject);
    setShowId(id);
    dispatch(selectId(id));
  };

  return (
    <Base>
      {filterData?.map((project) => {
        const imgSrc = project?.cover?.file?.url || project?.cover?.external?.url;
        const title = project.properties.Name.title[0]?.plain_text;
        const description = project.properties.summary.rich_text[0]?.plain_text;
        const id = project.id;
        const start = project.properties.날짜?.date?.start;
        const end = project.properties.날짜?.date?.end;
        const contents = project.properties.내용.multi_select;
        const keywords = project.properties.keyword.multi_select;
        const github = project.properties.Github.rich_text[0].plain_text;
        const url = project.properties.URL.url;

        return (
          <>
            <Project key={id} imgSrc={imgSrc} onClick={(e) => handleProjectClick(id)}>
              {start && end ? <ProjectDate>{date(start, end)}</ProjectDate> : undefined}
              <Wrapper>
                <Title>{title}</Title>
                <Desc>{description}</Desc>
                {getContents(contents)}
                {getKeyword(keywords)}
                {getUrl(github, url)}
              </Wrapper>
            </Project>
          </>
        );
      })}
    </Base>
  );
};

const Base = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 1rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Project = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
  transition: all 0.3s;
  flex-wrap: wrap;
  padding: 1rem 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  ${({ imgSrc }) =>
    imgSrc
      ? css`
          background-image: url(${imgSrc});
          background-position: 100% 16px;
          background-size: 70px;
          background-repeat: no-repeat;
        `
      : css``}
`;

const ProjectDate = styled.div`
  word-wrap: normal;
  width: 100%;
  color: gray;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 1rem;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 14px;
  }
`;

const ContentWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 1rem;
`;

const ContentItem = styled.li`
  list-style: disc;
  font-size: 12px;
  line-height: 16px;
`;

const Desc = styled.h2`
  color: gray;
  font-style: italic;
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
  }
`;

const KeywordWrapper = styled.ul`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;
`;

const KeywordItem = styled.li`
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 5px;
  color: #ffffff;
  white-space: nowrap;
  background-color: gray;

  @media (max-width: 768px) {
  }
`;

const UrlWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
`;
const UrlItem = styled(Link)`
  width: 25px;

  &:first-of-type {
    fill: var(--main-text-color);
  }

  @media (min-width: 769px) {
    width: 35px;
  }
`;

export default AboutProjectList;
