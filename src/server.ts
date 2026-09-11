import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine({
  allowedHosts: ['arvinplus.in', 'www.arvinplus.in', '.arvinplus.in', 'localhost'],
});

const SITE_URL = process.env['SITE_URL'] || 'https://arvinplus.in';
const API_URL = process.env['STOREFRONT_API_URL'] || 'https://admin.arvinplus.in';

const STATIC_SITEMAP_URLS = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/products', priority: '0.9', changefreq: 'daily' },
  { path: '/our-collections', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/about-us', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact-us', priority: '0.6', changefreq: 'monthly' },
  { path: '/quality-certifications', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.4', changefreq: 'monthly' },
  { path: '/terms-conditions', priority: '0.4', changefreq: 'monthly' },
  { path: '/shipping-policy', priority: '0.4', changefreq: 'monthly' },
  { path: '/return-policy', priority: '0.4', changefreq: 'monthly' },
  { path: '/cancellation-policy', priority: '0.4', changefreq: 'monthly' },
];

let sitemapCache: { xml: string; fetchedAt: number } | null = null;
const SITEMAP_TTL_MS = 60 * 60 * 1000;

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function buildSitemapXml(): Promise<string> {
  const urlset: string[] = [];

  for (const entry of STATIC_SITEMAP_URLS) {
    const loc = `${SITE_URL}${entry.path === '/' ? '' : entry.path}`;
    urlset.push(
      `<url><loc>${xmlEscape(loc)}</loc><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority}</priority></url>`,
    );
  }

  try {
    const productsData = await fetchJson(`${API_URL}/api/storefront/products`);
    const products = Array.isArray(productsData?.products)
      ? productsData.products
      : [];
    for (const product of products) {
      if (!product?.slug) continue;
      const lastmod = product.updated_at
        ? `<lastmod>${String(product.updated_at).slice(0, 10)}</lastmod>`
        : '';
      urlset.push(
        `<url><loc>${xmlEscape(`${SITE_URL}/products/${product.slug}`)}</loc>${lastmod}<changefreq>weekly</changefreq><priority>0.9</priority></url>`,
      );
    }
  } catch (err) {
    console.warn(`[sitemap] products fetch failed: ${(err as Error).message}`);
  }

  try {
    let page = 1;
    let lastPage = 1;
    do {
      const params = new URLSearchParams({ page: String(page) });
      const data = await fetchJson(`${API_URL}/api/storefront/blog/posts?${params.toString()}`);
      const posts = Array.isArray(data?.posts) ? data.posts : [];
      for (const post of posts) {
        if (!post?.slug) continue;
        const lastmod = post.published_at
          ? `<lastmod>${String(post.published_at).slice(0, 10)}</lastmod>`
          : '';
        urlset.push(
          `<url><loc>${xmlEscape(`${SITE_URL}/blog/${post.slug}`)}</loc>${lastmod}<changefreq>monthly</changefreq><priority>0.7</priority></url>`,
        );
      }
      lastPage = data?.pagination?.last_page ?? page;
      page += 1;
    } while (page <= lastPage);
  } catch (err) {
    console.warn(`[sitemap] blog fetch failed: ${(err as Error).message}`);
  }

  const includes = urlset.join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${includes}\n</urlset>`;
}

async function getSitemapXml(): Promise<string> {
  if (sitemapCache && Date.now() - sitemapCache.fetchedAt < SITEMAP_TTL_MS) {
    return sitemapCache.xml;
  }
  const xml = await buildSitemapXml();
  sitemapCache = { xml, fetchedAt: Date.now() };
  return xml;
}

app.get('/sitemap.xml', async (req, res) => {
  try {
    const xml = await getSitemapXml();
    res.status(200).type('application/xml').send(xml);
  } catch {
    res.status(500).type('text/plain').send('Sitemap generation failed');
  }
});

app.get('/robots.txt', (req, res) => {
  res.status(200).type('text/plain').send(
    [
      'User-agent: *',
      'Allow: /',
      `Sitemap: ${SITE_URL}/sitemap.xml`,
      '',
    ].join('\n'),
  );
});

/**
 * Serve static files from /browser
 */
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export default app;
