import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="public/favicon/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="public/favicon/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="public/icons/icon-192x192.png"></link>
        <meta name="msapplication-TileColor" content="#1976d2"></meta>
      </Head>
      <body>
        <div id="portal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
