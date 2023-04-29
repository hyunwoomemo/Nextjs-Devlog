import { CacheProvider } from '@emotion/react'
import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import App from '../_app'

const key = 'custom'
const cache = createCache({ key })
const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)

const html = renderToString(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>
)

const chunks = extractCriticalToChunks(html)
const styles = constructStyleTagsFromChunks(chunks)

res
  .status(200)
  .header('Content-Type', 'text/html')
  .send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My site</title>
    ${styles}
</head>
<body>
    <div id="root">${html}</div>

    <script src="./bundle.js"></script>
</body>
</html>`);