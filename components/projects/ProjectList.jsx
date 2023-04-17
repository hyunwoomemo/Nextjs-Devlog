import { darkThemeTagColor, lightThemeTagColor } from "@/util/backgroundColor";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectList = ({ data }) => {
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
      {data.results?.map((project) => {
        const title = project.properties.Name.title[0].plain_text;
        const github = project.properties.Github.url;
        const description = project.properties.Description.rich_text[0].plain_text;
        const imgSrc = project.cover.file?.url || project.cover.external.url;
        const tags = project.properties.Tags.multi_select;
        const start = project.properties.WorkPeriod?.date?.start;
        const end = project.properties.WorkPeriod?.date?.end;
        const id = project.id;

        return (
          <Project href={`/projects/${id}`} key={project.id}>
            <ImageItem src={imgSrc} alt="cover image" width="300" height="250" layout="fixed" objectFit="cover" quality={100} />
            <Wrapper>
              <Title>{title}</Title>
              <Desc>{description}</Desc>
              <Tags>
                {tags.map((tag) => {
                  let background;
                  if (typeof window === "object" ? window.localStorage.getItem("theme") === "dark" : undefined) {
                    background = darkThemeTagColor;
                  } else {
                    background = lightThemeTagColor;
                  }
                  const tagColor = background[tag.color];
                  return (
                    <li key={tag.id} style={{ backgroundColor: tagColor }}>
                      {tag.name}
                    </li>
                  );
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
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (min-width: 769px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Project = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  align-items: center;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageItem = styled(Image)`
  border-radius: 5px 5px 0 0;
  object-fit: cover;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 400px;
    width: 100%;
  }

  @media (max-width: 1200px) {
    max-width: 450px;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const Desc = styled.h2`
  color: gray;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Period = styled.span``;

const Tags = styled.ul`
  display: flex;
  gap: 10px;

  li {
    font-size: 12px;
    padding: 5px;
    border-radius: 5px;
    color: var(--text-color);
  }
`;

export default ProjectList;
