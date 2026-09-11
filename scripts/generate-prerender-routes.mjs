/**
 * Generates prerender-routes.txt for Angular Universal pre-rendering.
 *
 * It mixes the fixed set of static SEO routes together with every live
 * product and blog-post slug, so the build pre-renders full HTML for dynamic
 * pages at deploy time.
 */

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = join(rootDir, 'prerender-routes.txt');

const API_URL = process.env.STOREFRONT_API_URL || 'https://admin.arvinplus.in';

const STATIC_ROUTES = [
  '/',
  '/home',
  '/products',
  '/blog',
  '/about-us',
  '/contact-us',
  '/our-collections',
  '/quality-certifications',
  '/privacy-policy',
  '/terms-conditions',
  '/shipping-policy',
  '/return-policy',
  '/cancellation-policy',
];

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.json();
}

async function getProductSlugs() {
  try {
    const data = await fetchJson(`${API_URL}/api/storefront/products`);
    if (!data.success || !Array.isArray(data.products)) return [];
    return (data.products ?? [])
      .map((p) => p.slug)
      .filter(Boolean)
      .map((slug) => `/products/${slug}`);
  } catch (err) {
    console.warn(`[prerender-routes] Warning: could not fetch products: ${err.message}`);
    return [];
  }
}

async function getBlogSlugs() {
  const slugs = [];
  try {
    let page = 1;
    let lastPage = 1;
    do {
      const params = new URLSearchParams({ page: String(page) });
      const data = await fetchJson(`${API_URL}/api/storefront/blog/posts?${params.toString()}`);
      if (!data.success || !Array.isArray(data.posts)) break;
      for (const post of data.posts ?? []) {
        if (post.slug) slugs.push(`/blog/${post.slug}`);
      }
      lastPage = data.pagination?.last_page ?? page;
      page += 1;
    } while (page <= lastPage);
  } catch (err) {
    console.warn(`[prerender-routes] Warning: could not fetch blog posts: ${err.message}`);
  }
  return slugs;
}

const [products, blog] = await Promise.all([getProductSlugs(), getBlogSlugs()]);

const routes = [...new Set([...STATIC_ROUTES, ...products, ...blog])];
await writeFile(outputFile, `${routes.join('\n')}\n`, 'utf8');

console.log(
  `[prerender-routes] Wrote ${routes.length} routes to ${outputFile} ` +
    `(${STATIC_ROUTES.length} static + ${products.length} products + ${blog.length} blog)`,
);