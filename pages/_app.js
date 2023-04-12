import GlobalStyle from '@/components/GlobalStyle'
import '@/styles/globals.css'
import '@/styles/modal.scss'

export default function App({ Component, pageProps }) {
  return (

    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}
