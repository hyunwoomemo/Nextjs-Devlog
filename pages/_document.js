import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/icons/icon-192x192.png"></link>
        <meta name="msapplication-TileColor" content="#1976d2"></meta>
        <meta name='theme-color' content='#1976d2'></meta>
      </Head>
      <body>
        <div id="portal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
