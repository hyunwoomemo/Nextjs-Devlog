import { GA_TRACKING_ID } from '@/lib/gtag'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/icons/icon-512x512.png"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet"></link>
        <meta name="msapplication-TileColor" content="#000"></meta>
        <meta name='theme-color' content='#000'></meta>
        <meta name="google" content="notranslate"></meta>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <body>
        <div id="portal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
