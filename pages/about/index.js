import AboutAnimation from "@/components/about/AboutAnimation";
import Layout from "@/components/common/Layout";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import React from "react";
import TypeIt from "typeit-react";
import Profile from '@/public/profile.png'
import Image from "next/image";
import { TOKEN } from "@/config";

const skill = {
  
}

const about = ({ response, blockResponse }) => {
  console.log(response)
  console.log(blockResponse)
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
            <Skill>
              SKILL
            </Skill>
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

const TextTitle = styled.div`
position: relative;
display: inline-block;
font-size: larger;
  &:before {
    content: '';
    width: 100%;
    height: 3px;
    top: 100%;
    left: 0;
    right: 0;
    background-color: gray;
    position: absolute;
  }
`

const Skill = styled(TextTitle)``


const Introduce = styled(TextTitle)`
`

const IntroduceText = styled.div`

margin-top: 3rem;
`