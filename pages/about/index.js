import AboutAnimation from "@/components/about/AboutAnimation";
import Layout from "@/components/common/Layout";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import React from "react";
import TypeIt from "typeit-react";
import Profile from '@/public/profile.png'
import Image from "next/image";
import { SKILL, TOKEN } from "@/config";
import dayjs from "dayjs";


const about = ({ skill }) => {
  const array = ['Front-end', 'Back-end', 'Database', 'Etc'];
  const skillMap = (category) => skill.filter((v) => v.properties.category.select.name === category).sort((a, b) => new Date(a.created_time) - new Date(b.created_time)).map((v) => {
    const contents = v.properties.이름.title[0].plain_text;
    return (
      <SkillItemContents key={contents}>{contents}</SkillItemContents>
    )
  })

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
        <Base>
          <Intro>
            <Image src="/profile.png" alt="My Image" width={100} height={100} />
            <Title>
              안녕하세요, 이현우입니다.
              <SubTitle>
                새로운 지식 배우는 것을 정말 좋아합니다.
              </SubTitle>
              <Front>Frontend Developer</Front>
            </Title>
          </Intro>
          <Container>
            <SkillWrapper>
              <Skill>
                SKILL
              </Skill>
              <SkillItem>
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
              </SkillItem>
            </SkillWrapper>
            <Introduce>INTRODUCE</Introduce>
            <IntroduceText>

            </IntroduceText>
          </Container>
        </Base>
      </Layout>
    </>
  );
};

export default about;

const Base = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const Intro = styled.div`
display: flex;
`

const Title = styled.div`
  margin-left: 1rem;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const SubTitle = styled.div`
  color: var(--primary-color);
  font-size: 12px;
`

const Front = styled.div`
  margin-top: auto;
  font-size: 14px;
`

const Container = styled.div`
display: flex;
flex-direction: column;
margin-top: 2rem;
align-items: flex-start;
`

const SkillWrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
flex-direction: column;
padding: 2rem 0;

@media (max-width:768px) {
}
`

const SkillItem = styled.div`
  padding: 1rem;
`

const SkillItemWrapper = styled.ul`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width:768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`
const SkillItemTitle = styled.div`
  padding: 1rem 0;
  color: gray;
`

const SkillItemContents = styled.li`
list-style: disc;
`

const TextTitle = styled.div`
position: relative;
display: inline-block;
font-size: larger;
color: var(--primary-color);
`

const Skill = styled(TextTitle)`
width: 100%;
`


const Introduce = styled(TextTitle)`
`

const IntroduceText = styled.div`

margin-top: 3rem;
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

  const allSkill = await res.json();

  const skill = allSkill.results;

  return {
    props: { skill },
  };
}
