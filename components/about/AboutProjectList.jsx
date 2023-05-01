import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const AboutProjectList = ({ data }) => {
  const filterData = data.results.filter((v) => v.properties.상태.status.name === "Done");

  const calculatedPeriod = (start, end) => {
    const startDateStringArray = start.split("-");
    const endDateStringArray = end.split("-");

    var startDate = new Date(startDateStringArray[0], startDateStringArray[1], startDateStringArray[2]);
    var endDate = new Date(endDateStringArray[0], endDateStringArray[1], endDateStringArray[2]);

    const diffInMs = Math.abs(endDate - startDate);
    const result = diffInMs / (1000 * 60 * 60 * 24);

    return result;
  };

  return (
    <Base>
      {filterData?.map((project) => {
        const title = project.properties.Name.title[0]?.plain_text;
        const description = project.properties.summary.rich_text[0]?.plain_text;
        const imgSrc = project?.cover?.file?.url || project?.cover?.external?.url;
        const tags = project.properties.tags?.multi_select;
        const id = project.id;
        const start = project.properties.날짜?.date?.start;
        const end = project.properties.날짜?.date?.end;
        const date = (start, end) => {
          const startDate = dayjs(new Date(start));
          const endDate = dayjs(new Date(end));

          if (startDate.format("YYYY-MM") === endDate.format("YYYY-MM")) {
            return `${startDate.format("YYYY-MM-DD")} ~ ${endDate.format("YYYY-MM-DD")}`;
          } else {
            return `${startDate.format("YYYY-MM")} ~ ${endDate.format("YYYY-MM")}`;
          }
        };

        return (
          <Project href={`/projects/${id}`} key={project.id}>
            {start && end ? <ProjectDate>{date(start, end)}</ProjectDate> : undefined}
            <Wrapper>
              <Title>{title}</Title>
              <Desc>{description}</Desc>
              <Tags>
                {tags.map((tag) => {
                  return <li key={tag.id}>{tag.name}</li>;
                })}
              </Tags>
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
`;

const ProjectDate = styled.div`
  word-wrap: normal;
  width: 100%;
`;

const ImageItem = styled(Image)`
  border-radius: 5px;
  object-fit: cover;
  width: 100%;
  width: 100px;
  height: 100px;

  @media (max-width: 768px) {
    width: 75px;
    height: 75px;
  }
`;

const Wrapper = styled.div`
  /* padding: 2rem 0; */
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 14px;
  }
`;

const Desc = styled.h2`
  color: gray;
  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 12px;
  }
`;

const Period = styled.span``;

const Tags = styled.ul`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;

  li {
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;
    color: var(--text-color);
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: 10px;
      padding: 3px;
    }
  }
`;

export default AboutProjectList;
