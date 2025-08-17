import fs from 'fs';
import path from 'path';

const possiblePaths = [path.resolve('public/data/data.json'), path.resolve('data/data.json')];

const jsonPath = possiblePaths.find(p => fs.existsSync(p));

if (!jsonPath) {
  throw new Error(`JSON file not found at ${possiblePaths.join(' or ')}`);
}

const portfolioData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

export function generateRoutes() {
  const staticRoutes = ['/', '/about-me', '/achievements', '/contact-me', '/work-highlights'];

  const dynamicRoutes = [
    ...Object.keys(portfolioData.experience || {}).map(id => `/work-highlights/positions/${id}`),
    ...Object.keys(portfolioData.projects || {}).map(id => `/work-highlights/projects/${id}`),
    ...Object.keys(portfolioData.awards || {}).map(id => `/achievements/awards/${id}`),
    ...Object.keys(portfolioData.certifications || {}).map(id => `/achievements/certificates/${id}`)
  ];

  return [...staticRoutes, ...dynamicRoutes];
}

// Routes for react-snap prerendering
export const generateSnapRoutes = () => {
  // Static routes for the portfolio
  const staticRoutes = ['/', '/about-me', '/achievements', '/contact-me', '/work-highlights'];

  // Dynamic routes based on JSON data
  const dynamicRoutes = [
    ...Object.keys(portfolioData.experience || {}).map(
      item => `/work-highlights/positions/${item.id}`
    ),
    ...Object.keys(portfolioData.projects || {}).map(
      item => `/work-highlights/projects/${item.id}`
    ),
    ...Object.keys(portfolioData.awards || {}).map(item => `/achievements/awards/${item.id}`),
    ...Object.keys(portfolioData.certifications || {}).map(
      item => `/achievements/certificates/${item.id}`
    )
  ];

  return [...staticRoutes, ...dynamicRoutes];
};

// Data for sitemap generation
export const generateSitemapData = () => {
  // Static routes with SEO metadata
  const staticRoutes = [
    { url: '/', changefreq: 'weekly', priority: 1.0, lastmod: '2025-08-17' },
    { url: '/about-me', changefreq: 'monthly', priority: 0.8, lastmod: '2025-08-17' },
    { url: '/achievements', changefreq: 'monthly', priority: 0.7, lastmod: '2025-08-17' },
    { url: '/contact-me', changefreq: 'monthly', priority: 0.8, lastmod: '2025-08-17' },
    { url: '/work-highlights', changefreq: 'monthly', priority: 0.7, lastmod: '2025-08-17' }
  ];

  // Dynamic routes with SEO metadata
  const dynamicRoutes = [
    ...Object.keys(portfolioData.experience || {}).map(item => ({
      url: `/work-highlights/positions/${item.id}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: item.lastModified || '2025-08-17'
    })),
    ...Object.keys(portfolioData.projects || {}).map(item => ({
      url: `/work-highlights/projects/${item.id}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: item.lastModified || '2025-08-17'
    })),
    ...Object.keys(portfolioData.awards || {}).map(item => ({
      url: `/achievements/awards/${item.id}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: item.lastModified || '2025-08-17'
    })),
    ...Object.keys(portfolioData.certifications || {}).map(item => ({
      url: `/achievements/certificates/${item.id}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: item.lastModified || '2025-08-17'
    }))
  ];

  return [...staticRoutes, ...dynamicRoutes];
};

