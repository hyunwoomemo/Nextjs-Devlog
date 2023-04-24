import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Seo from '@/components/Seo'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import styled from '@emotion/styled'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import RollingBanner from '@/components/RollingBanner'
import github from '@/public/languageIcons/github.png';
import react from '@/public/languageIcons/react.png';
import javascript from '@/public/languageIcons/javascript.png';
import html from '@/public/languageIcons/html.png';
import nodejs from '@/public/languageIcons/nodejs.png';
import express from '@/public/languageIcons/express.png';
import mysql from '@/public/languageIcons/mysql.png';
import aws from '@/public/languageIcons/aws.png';
import gatsby from '@/public/languageIcons/gatsby.png';
import notion from '@/public/languageIcons/notion.png';
import { CODESNIPET_DATABASE_ID, LANGUAGE_DATABASE_ID, POST_DATABASE_ID, PROJECT_DATABASE_ID, TOKEN } from '@/config'


export default function Home({ posts, languages }) {
  console.log(languages);
  return (
    <Base>
      <Layout posts={posts}>
        <Seo title="home" />
        <Hero />
        <RollingBanner speed={5}>
          {/* <Image alt="language-icons" src={react}></Image>
          <Image alt="language-icons" src={javascript}></Image>
          <Image alt="language-icons" src={html}></Image>
          <Image alt="language-icons" src={nodejs}></Image>
          <Image alt="language-icons" src={express}></Image>
          <Image alt="language-icons" src={mysql}></Image>
          <Image alt="language-icons" src={github}></Image>
          <Image alt="language-icons" src={aws}></Image>
          <Image alt="language-icons" src={gatsby}></Image>
          <Image alt="language-icons" src={notion}></Image> */}
          {languages.map((v) => {
            return (
              <>
                <Image key={v.id} width={150} height={150} src={v.icon?.file?.url} alt={v.properties.이름.title[0].plain_text}></Image>
              </>
            )
          })}
        </RollingBanner>
      </Layout>
    </Base>
  )
}

const Base = styled.div`
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
      sorts: [
        {
          property: "생성 일시",
          direction: "ascending",
        },
      ],
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

  const posts = [...snipetData.results, ...postsData.results, ...projectData.results];
  const languages = languageData.results;

  return {
    props: { posts, languages },
  };
}


