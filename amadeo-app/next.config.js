/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "links.papareact.com",
      "cdn0.iconfinder.com",
      "platform-lookaside.fbsbx.com",
      "lh3.googleusercontent.com"
    ],
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    localeDetection: false
  },
}
