import GlobalStyle from '@/components/GlobalStyle'
import Loading from '@/components/Loading'
import LoadingContext from '@/context/LoadingContext'
import SearchContext from '@/context/SearchContext'
import ThemeContext from '@/context/ThemeContext'
import '@/styles/globals.css'
import '@/styles/modal.scss'
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as gtag from 'util/gtag';
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [themeMode, setThemeMode] = useState('dark');
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
      document.body.style.overflow = 'hidden';
      setThemeMode(window.localStorage.getItem('theme'))
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

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);


  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gtag.GA_TRACKING_ID}', {
        page_path: window.location.pathname,
      });
      `,
        }}
      />
      <CacheProvider value={cache}>
        <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
          <LoadingContext.Provider value={{ loading }}>
            <SearchContext.Provider value={{ search, setSearch }}>
              <GlobalStyle />
              <Component {...pageProps} />
              {loading ? <Loading /> : undefined}
            </SearchContext.Provider>
          </LoadingContext.Provider>
        </ThemeContext.Provider>
      </CacheProvider>
    </>
  )
}