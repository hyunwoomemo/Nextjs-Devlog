import AboutAnimation from "@/components/about/AboutAnimation";
import Layout from "@/components/common/Layout";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ETC, EXPERIENCE, PROJECT_DATABASE_ID, SKILL, TOKEN } from "@/config";
import AboutProjectList from "@/components/about/AboutProjectList";
import AboutExperienceList from "@/components/about/AboutExperienceList";
import AboutEtc from "@/components/about/AboutEtc";


const About = ({ skill, projects, experience, etc }) => {


  const array = ['Front-end', 'Back-end', 'Database', 'Etc'];

  const skillMap = (category) => skill.filter((v) => v.properties.category.select.name === category).sort((a, b) => new Date(a.created_time) - new Date(b.created_time)).map((v) => {
    const contents = v.properties.이름.title[0].plain_text;

    return (
      <SkillItemContents key={contents}>{contents}</SkillItemContents>
    )
  })

  const relativeExperience = experience.filter((v) => v.properties.선택.select.name === "relative").reverse();
  const otherExperience = experience.filter((v) => v.properties.선택.select.name === "other");


  return (
    <>
      <NextSeo
        title="About | Hyunwoomemo"
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
      <Layout>
        <Base id="about">
          <Intro>
            <Image src="/profile.png" alt="My Image" width={100} height={100} />
            <Title>
              안녕하세요, 이현우입니다.
              <Front>Frontend Developer</Front>
              <SubTitle>
                한번 사는 인생 수동적으로 기계처럼 일하는 것은 인생을 낭비하는 것 같아 열정적으로, 효율적인 방법으로 일하는 것을 좋아합니다.
              </SubTitle>
            </Title>
          </Intro>
          <Container>
            <Wrapper>
              <TextTitle>
                SKILL
              </TextTitle>
              <ItemWrapper>
                {array.map((v) => {
                  return (
                    <>
                      <SkillItemTitle>{v}</SkillItemTitle>
                      <SkillItemWrapper key={v}>
                        {skillMap(v)}
                      </SkillItemWrapper>
                    </>
                  )
                })}
              </ItemWrapper>
            </Wrapper>
            <Wrapper>
              <TextTitle>
                PROJECT
              </TextTitle>
              <AboutProjectList data={projects} />
            </Wrapper>
            <Wrapper>
              <TextTitle>
                Experiences
              </TextTitle>
              <AboutExperienceList data={relativeExperience} />
            </Wrapper>
            <Wrapper>
              <TextTitle>
                Other Experiences
              </TextTitle>
              <AboutExperienceList data={otherExperience} />
            </Wrapper>
            <Wrapper>
              <TextTitle>
                그 외
              </TextTitle>
              <AboutEtc data={etc} />
            </Wrapper>
          </Container>
        </Base>
      </Layout>
    </>
  );
};

export default About;

const Base = styled.div`
  padding: 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const Intro = styled.div`
display: flex;

align-items: center;
`

const Title = styled.div`
  margin-left: 1rem;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (min-width:768px) {
    font-size: 18px;
    margin-left: 2rem;
  }
`

const SubTitle = styled.div`
  color: var(--primary-color);
  font-size: 12px;
  line-height: 16px;
  @media (min-width:768px) {
    font-size: 14px;
  line-height: 20px;
  }
`

const Front = styled.div`
  margin-top: auto;
  font-size: 14px;

  @media (min-width:768px) {
    font-size: 16px;
  }
`


const Container = styled.div`
display: flex;
flex-direction: column;
margin-top: 2rem;
align-items: flex-start;
position: relative;
`

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
flex-direction: column;
padding: 2rem 0;
position: relative;

@media (max-width:768px) {
}
`

const TextTitle = styled.div`
position: relative;
display: inline-block;
font-size: larger;
color: var(--primary-color);
padding: 1rem 0;
`

const ItemWrapper = styled.div`
  padding: 1rem;
`

const SkillItemWrapper = styled.ul`
  padding: 1rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  border-bottom: 1px solid var(--border-bottom-color);

  @media (max-width:768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
const SkillItemTitle = styled.div`
  padding: 1rem 0;
  color: gray;
`

const SkillItemContents = styled.li`
display: flex;
justify-content: center;
padding: 5px 0;

@media (min-width:768px) {
  padding: 10px 0;
}
`


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

  const res = await fetch(`https://api.notion.com/v1/databases/${SKILL}/query`, options);

  const projectRes = await fetch(`https://api.notion.com/v1/databases/${PROJECT_DATABASE_ID}/query`, options);

  const experienceRes = await fetch(`https://api.notion.com/v1/databases/${EXPERIENCE}/query`, options);
  const etcRes = await fetch(`https://api.notion.com/v1/databases/${ETC}/query`, options);

  const projects = await projectRes.json();
  const allSkill = await res.json();
  const allExperience = await experienceRes.json();
  const allEtc = await etcRes.json();

  const skill = allSkill.results;
  const experience = allExperience.results;
  const etc = allEtc.results;



  return {
    props: { skill, projects, experience, etc },
  };
}
