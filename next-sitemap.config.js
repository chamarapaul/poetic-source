// next-sitemap.config.ts
const config = {
  siteUrl: 'https://poeticsource.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/404', '/500'],
  transform: async (config, path) => {
    if (path === '/poems') {
      return {
        loc: path,
        priority: 1.0,
        changefreq: 'daily',
      };
    }

    if (path === '/' || path.startsWith('/forms/') || path.startsWith('/languages/')) {
      return {
        loc: path,
        priority: 0.8,
        changefreq: 'weekly',
      };
    }

    if (path.startsWith('/poems/')) {
      return {
        loc: path,
        priority: 0.7,
        changefreq: 'monthly',
      };
    }

    if (path.startsWith('/tags/')) {
      return {
        loc: path,
        priority: 0.6,
        changefreq: 'yearly',
      };
    }

    return {
      loc: path,
      priority: 0.5,
      changefreq: 'monthly',
    };
  },
};

module.exports = config;