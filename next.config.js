/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.BASE_URL,
  },
  images: {
    domains: [
      'www.notion.so',
      'images.unsplash.com',
      's3.us-west-2.amazonaws.com',
      'hits.seeyoufarm.com',
    ],
    format: ['image/png', 'image/webp', 'image/jpeg']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  siteUrl: "https://hyunwoomemo.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog/posts',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
