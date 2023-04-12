import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Seo from '@/components/Seo'
import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import styled from '@emotion/styled'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Base>
      <Layout>
        <Seo title="home" />
        <Hero />
      </Layout>
    </Base>
  )
}

const Base = styled.div`

`