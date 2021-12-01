/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['links.papareact.com', 'images.unsplash.com']
    },
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'fr',
        localeDetection: false
    },
    publicRuntimeConfig: {
        apiUrl: process.env.API_URL
    }
};
