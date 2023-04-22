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

export default function Home() {

  return (
    <Base>
      <Layout>
        <Seo title="home" />
        <Hero />
        <RollingBanner speed={5}>
          <Image alt="language-icons" src={github}></Image>
          <Image alt="language-icons" src={react}></Image>
          <Image alt="language-icons" src={javascript}></Image>
          <Image alt="language-icons" src={html}></Image>
          <Image alt="language-icons" src={nodejs}></Image>
          <Image alt="language-icons" src={express}></Image>
          <Image alt="language-icons" src={mysql}></Image>
        </RollingBanner>
      </Layout>
    </Base>
  )
}

const Base = styled.div`
`