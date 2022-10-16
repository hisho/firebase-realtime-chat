/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * @see https://nextjs.org/docs/advanced-features/i18n-routing
   */
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  /**
   * @see https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions
   */
  pageExtensions: ['page.tsx', 'api.ts'],
  /**
   * @see https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
   */
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig
