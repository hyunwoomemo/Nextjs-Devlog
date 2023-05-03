import { GA_TRACKING_ID } from '@/lib/gtag';
import Document, { Html, Head, Main, NextScript } from 'next/document'
import * as React from 'react'
import { renderStatic } from '@/lib/renderer'
import { css } from '@emotion/react';

export default function AppDocument(props) {
  const { css, ids } = React.useMemo(async () => {
    const page = await props.renderPage()
    return renderStatic(page.html)
  }, [props])
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/icons/icon-192x192.png"></link>
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
        {css && (
          <style
            data-emotion={`css ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        )}
      </body>
    </Html>
  )
}

AppDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx)
  return { ...initialProps }
}