/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

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
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
};
