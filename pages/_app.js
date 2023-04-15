import GlobalStyle from '@/components/GlobalStyle'
import LoadingContext from '@/context/LoadingContext'
import ThemeContext from '@/context/ThemeContext'
import '@/styles/globals.css'
import '@/styles/modal.scss'
import styled from '@emotion/styled'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as serviceWorker from '@/public/service-worker';
import { register, unregister } from 'next-offline/runtime'

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [themeMode, setThemeMode] = useState(typeof window === "object" ? window.localStorage.getItem("theme") : "dark");


  const router = useRouter();


  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = (url) => {
      setLoading(false);
      unregister();
      register('/service-work.js', { scope: '/' })
    };


    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, [router])

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-work.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])


  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <LoadingContext.Provider value={{ loading }}>
        <GlobalStyle />
        <Component {...pageProps} />
        {loading ? <Loading>Loading...</Loading> : undefined}
      </LoadingContext.Provider>
    </ThemeContext.Provider>
  )
}

const Loading = styled.div`
  position: fixed;
  z-index: 999;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--text-color);
  color: var(--main-background);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
`