import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Seo from '@/components/Seo'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import styled from '@emotion/styled'
import Footer from '@/components/Footer'
import { useContext, useEffect, useRef, useState } from 'react'
import RollingBanner from '@/components/RollingBanner'
import { CODESNIPET_DATABASE_ID, LANGUAGE_DATABASE_ID, POST_DATABASE_ID, PROJECT_DATABASE_ID, TOKEN } from '@/config'
import RecentPost from '@/components/RecentPost'
import FullPage from '@/components/FullPage'
import SearchContext from '@/context/SearchContext'
import { css } from '@emotion/react'
import { NextSeo } from 'next-seo'
import Img from '@/public/icons/icon-512x512.png';


export default function Home({ allPosts, posts, projects, languages }) {
  const slicePosts = posts.slice(0, 3)
  const { search } = useContext(SearchContext);

  const [speed, setSpeed] = useState(5);

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
              url: Img,
              width: 800,
              height: 400,
            },
          ],
        }}
      />
      <Base search={search}>
        <Layout posts={allPosts}>
          <Hero />
          <RecentPost data={slicePosts} projects={projects} />
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
    body: JSON.stringify({
      page_size: 100,
    }),
  };

  const languageOptions = {
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
  }

  const snipetRes = await fetch(`https://api.notion.com/v1/databases/${CODESNIPET_DATABASE_ID}/query`, options);
  const postsRes = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);
  const projectRes = await fetch(`https://api.notion.com/v1/databases/${PROJECT_DATABASE_ID}/query`, options);
  const languageRes = await fetch(`https://api.notion.com/v1/databases/${LANGUAGE_DATABASE_ID}/query`, languageOptions)

  const snipetData = await snipetRes.json();
  const postsData = await postsRes.json();
  const projectData = await projectRes.json();
  const languageData = await languageRes.json();

  const allPosts = [...snipetData.results, ...postsData.results, ...projectData.results];

  // posts에서 project post 제외
  const posts = postsData.results.filter((v) => v.properties.project.checkbox !== true);

  const projects = projectData.results;
  const languages = languageData.results;

  return {
    props: { allPosts, posts, projects, languages },
  };
}


