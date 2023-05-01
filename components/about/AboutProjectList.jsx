import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

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

const AboutProjectList = ({ data }) => {
  const filterData = data.results.filter((v) => v.properties.상태.status.name === "Done");

  console.log(filterData);

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

        return (
          <Project href={`/projects/${id}`} key={project.id} imgSrc={imgSrc}>
            {start && end ? <ProjectDate>{date(start, end)}</ProjectDate> : undefined}
            <Wrapper>
              <Title>{title}</Title>
              <Desc>{description}</Desc>
              {getContents(contents)}
              {getKeyword(keywords)}
            </Wrapper>
          </Project>
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

const Project = styled(Link)`
  display: flex;
  gap: 1rem;
  width: 100%;
  border-radius: 10px;
  align-items: center;
  transition: all 0.3s;
  flex-wrap: wrap;
  padding: 1rem 0;

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

const Period = styled.span``;

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

export default AboutProjectList;
