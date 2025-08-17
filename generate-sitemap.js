import fs from 'fs';
import { generateSitemapData } from './sitemap-routes.js';

const generateSitemap = () => {
  const baseUrl = 'https://ngo-tran-bao-thach.vercel.app'; // Your domain
  const routes = generateSitemapData();

  if (routes.length > 50000) {
    console.warn('Sitemap exceeds 50,000 URLs. Consider splitting into multiple sitemaps.');
    const chunks = [];
    const maxUrlsPerSitemap = 50000;

    for (let i = 0; i < routes.length; i += maxUrlsPerSitemap) {
      chunks.push(routes.slice(i, i + maxUrlsPerSitemap));
    }
    chunks.forEach((chunk, index) => {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${chunk
        .map(
          ({ url, lastmod, changefreq, priority }) => `
        <url>
          <loc>${baseUrl}${url}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>${changefreq}</changefreq>
          <priority>${priority}</priority>
        </url>`
        )
        .join('')}
      </urlset>`;
      fs.writeFileSync(`public/sitemap-${index + 1}.xml`, sitemap.trim());
    });

    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${chunks
        .map(
          (_, index) => `
        <sitemap>
          <loc>${baseUrl}/sitemap-${index + 1}.xml</loc>
        </sitemap>`
        )
        .join('')}
      </sitemapindex>`;
    fs.writeFileSync('public/sitemap.xml', sitemapIndex.trim());
    console.log('Sitemap index and split sitemaps generated in public/');
  } else {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map(
          ({ url, lastmod, changefreq, priority }) => `
        <url>
          <loc>${baseUrl}${url}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>${changefreq}</changefreq>
          <priority>${priority}</priority>
        </url>`
        )
        .join('')}
      </urlset>`;
      
    fs.writeFileSync('public/sitemap.xml', sitemap.trim());
    console.log('Sitemap generated at public/sitemap.xml');
  }
};

generateSitemap();



