import Layout from '@/components/common/Layout'
import Hero from '@/components/home/Hero'
import styled from '@emotion/styled'
import Footer from '@/components/common/Footer'
import { useContext, useEffect, useRef, useState } from 'react'
import { CODESNIPET_DATABASE_ID, LANGUAGE_DATABASE_ID, POST_DATABASE_ID, PROJECT_DATABASE_ID, TOKEN } from '@/config'
import RecentPost from '@/components/home/RecentPost'
import SearchContext from '@/context/SearchContext'
import { css } from '@emotion/react'
import { NextSeo } from 'next-seo'


export default function Home({ posts, projects }) {
  const { search } = useContext(SearchContext);

  return (
    <>
      <NextSeo
        title="Hyunwoomemo's Devlog"
        description="프론트엔드 개발자의 기술 블로그, 다양한 주제의 글로 새로운 지식을 기록합니다."
        openGraph={{
          type: 'website',
          url: 'https://hyunwoomemo.vercel.app/',
          title: "Hyunwoomemo's Devlog",
          description: '프론트엔드 개발자의 기술 블로그, 다양한 주제의 글로 새로운 지식을 기록합니다.',
          images: [
            {
              url: 'https://user-images.githubusercontent.com/105469077/234896480-32d59948-f5fb-4232-823b-38bb12bb34d6.png',
              width: 800,
              height: 400,
            },
          ],
        }}
      />
      <Base search={search}>
        <Layout>
          <Hero />
          <RecentPost data={posts} projects={projects} />
        </Layout>
      </Base>
    </>
  )
}


const Base = styled.div`
${({ search }) => search ? css`
  pointer-events: none;
` : css``}
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
  };


  const postsRes = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);
  const projectRes = await fetch(`https://api.notion.com/v1/databases/${PROJECT_DATABASE_ID}/query`, options);


  const postsData = await postsRes.json();
  const projectData = await projectRes.json();

  // posts에서 project post 제외
  const posts = postsData.results.filter((v) => v.properties.미완료.checkbox !== true).slice(0, 3);

  const projects = projectData.results;

  return {
    props: { posts, projects },
  };
}


