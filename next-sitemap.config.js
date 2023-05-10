/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://hyunwoomemo.vercel.app/',
  exclude: ['/404'],
  changefreq: 'daily',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://hyunwoomemo.vercel.app/sitemap.xml',
    ],
  },
};