import GlobalStyle from '@/components/GlobalStyle'
import Loading from '@/components/Loading'
import LoadingContext from '@/context/LoadingContext'
import ThemeContext from '@/context/ThemeContext'
import '@/styles/globals.css'
import '@/styles/modal.scss'
import styled from '@emotion/styled'
import { Router } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [themeMode, setThemeMode] = useState(typeof window === "object" ? window.localStorage.getItem("theme") : "dark");

  useEffect(() => {
    const start = () => {
      setLoading(true);
      document.body.style.overflow = 'hidden';
    };
    const end = (url) => {
      setLoading(false);
      document.body.style.overflow = 'unset';
    };


    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, [])



  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <LoadingContext.Provider value={{ loading }}>
        <GlobalStyle />
        <Component {...pageProps} />
        {loading ? <Loading /> : undefined}
      </LoadingContext.Provider>
    </ThemeContext.Provider>
  )
}
