import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'home',
    renderMode: RenderMode.Server,
  },
  {
    path: 'our-collections',
    renderMode: RenderMode.Server,
  },
  {
    path: 'about-us',
    renderMode: RenderMode.Server,
  },
  {
    path: 'contact-us',
    renderMode: RenderMode.Server,
  },
  {
    path: 'terms-conditions',
    renderMode: RenderMode.Server,
  },
  {
    path: 'return-policy',
    renderMode: RenderMode.Server,
  },
  {
    path: 'privacy-policy',
    renderMode: RenderMode.Server,
  },
  {
    path: 'cancellation-policy',
    renderMode: RenderMode.Server,
  },
  {
    path: 'shipping-policy',
    renderMode: RenderMode.Server,
  },
  {
    path: 'quality-certifications',
    renderMode: RenderMode.Server,
  },
  {
    path: 'products',
    renderMode: RenderMode.Server,
  },
  {
    path: 'products/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'blog',
    renderMode: RenderMode.Server,
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client,
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client,
  },
  {
    path: 'order-success',
    renderMode: RenderMode.Client,
  },
  {
    path: 'account',
    renderMode: RenderMode.Client,
  },
  {
    path: 'account/login',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
