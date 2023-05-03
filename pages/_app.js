import GlobalStyle from '@/components/common/GlobalStyle'
import Loading from '@/components/common/Loading'
import LoadingContext from '@/context/LoadingContext'
import SearchContext from '@/context/SearchContext'
import ThemeContext from '@/context/ThemeContext'
import '@/styles/globals.css'
import '@/styles/modal.scss'
import { CacheProvider } from '@emotion/react'
import { cache } from '@emotion/css'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as gtag from '@/lib/gtag'
import { Provider } from 'react-redux'
import store from '@/store'

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
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
          <LoadingContext.Provider value={{ loading }}>
            <SearchContext.Provider value={{ search, setSearch }}>
              <GlobalStyle />
              {GlobalStyle}
              <Component {...pageProps} />
              {loading ? <Loading /> : undefined}
            </SearchContext.Provider>
          </LoadingContext.Provider>
        </ThemeContext.Provider>
      </CacheProvider>
    </Provider>
  )
}