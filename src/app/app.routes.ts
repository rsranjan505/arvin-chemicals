import { inject } from '@angular/core';
import { Routes, ResolveFn } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { customerAuthGuard } from './services/auth/customer-auth.guard';
import { ProductService, ProductDetail, ProductSummary } from './services/product/product.service';
import { BlogService, BlogPostDetail } from './services/blog/blog.service';

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([promise, new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))]);
}

const RESOLVER_TIMEOUT_MS = 5000;

export const productsResolver: ResolveFn<ProductSummary[]> = () =>
  withTimeout(
    inject(ProductService).getProducts(),
    RESOLVER_TIMEOUT_MS,
    [],
  );

export const productDetailResolver: ResolveFn<ProductDetail | null> = (route) => {
  const slug = route.paramMap.get('slug');
  if (!slug) return Promise.resolve(null);
  return withTimeout(
    inject(ProductService).getProductBySlug(slug),
    RESOLVER_TIMEOUT_MS,
    null,
  );
};

export const blogDetailResolver: ResolveFn<BlogPostDetail | null> = (route) => {
  const slug = route.paramMap.get('slug');
  if (!slug) return null;
  return withTimeout(
    inject(BlogService)
      .getPostBySlug(slug)
      .then((res: { success: boolean; post?: BlogPostDetail; message?: string }) =>
        res.success ? (res.post ?? null) : null,
      ),
    RESOLVER_TIMEOUT_MS,
    null,
  );
};

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        resolve: { products: productsResolver },
        loadComponent: () =>
          import('./features/pages/home/home.component').then(
            (m) => m.HomeComponent,
          ),
      },
      {
        path: 'home',
        resolve: { products: productsResolver },
        loadComponent: () =>
          import('./features/pages/home/home.component').then(
            (m) => m.HomeComponent,
          ),
        pathMatch: 'full',
      },
      {
        path: 'our-collections',
        resolve: { products: productsResolver },
        loadComponent: () =>
          import('./features/pages/our-collection/our-collection.component').then(
            (m) => m.OurCollectionComponent,
          ),
      },
      {
        path: 'about-us',
        loadComponent: () =>
          import('./features/pages/about-us/about-us.component').then(
            (m) => m.AboutUsComponent,
          ),
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('./features/pages/contact-us/contact-us.component').then(
            (m) => m.ContactUsComponent,
          ),
      },
      {
        path: 'terms-conditions',
        loadComponent: () =>
          import('./features/pages/term-condition/term-condition.component').then(
            (m) => m.TermConditionComponent,
          ),
      },
      {
        path: 'return-policy',
        loadComponent: () =>
          import('./features/pages/return-policy/return-policy.component').then(
            (m) => m.ReturnPolicyComponent,
          ),
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./features/pages/privacy-policy/privacy-policy.component').then(
            (m) => m.PrivacyPolicyComponent,
          ),
      },
      {
        path: 'cancellation-policy',
        loadComponent: () =>
          import('./features/pages/concellation-policy/concellation-policy.component').then(
            (m) => m.ConcellationPolicyComponent,
          ),
      },
      {
        path: 'shipping-policy',
        loadComponent: () =>
          import('./features/pages/shipping-policy/shipping-policy.component').then(
            (m) => m.ShippingPolicyComponent,
          ),
      },
      {
        path: 'quality-certifications',
        loadComponent: () =>
          import('./features/pages/quality-certifications/quality-certifications.component').then(
            (m) => m.QualityCertificationsComponent,
          ),
      },
      {
        path: 'products',
        resolve: { products: productsResolver },
        loadComponent: () =>
          import('./features/pages/products/products.page').then(
            (m) => m.ProductsPage,
          ),
      },
      {
        path: 'products/:slug',
        resolve: { product: productDetailResolver },
        loadComponent: () =>
          import('./features/pages/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent,
          ),
      },
      {
        path: 'blog/:slug',
        resolve: { post: blogDetailResolver },
        loadComponent: () =>
          import('./features/pages/blog/blog-detail.component').then(
            (m) => m.BlogDetailComponent,
          ),
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./features/pages/blog/blog-list.component').then(
            (m) => m.BlogListComponent,
          ),
      },
      {
        path: 'account/login',
        loadComponent: () =>
          import('./features/pages/account/account-login.component').then(
            (m) => m.AccountLoginComponent,
          ),
      },
      {
        path: 'account',
        canActivate: [customerAuthGuard],
        loadComponent: () =>
          import('./features/pages/account/account-layout.component').then(
            (m) => m.AccountLayoutComponent,
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/pages/account/dashboard.component').then(
                (m) => m.DashboardComponent,
              ),
          },
          {
            path: 'orders',
            loadComponent: () =>
              import('./features/pages/account/orders.component').then(
                (m) => m.OrdersComponent,
              ),
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('./features/pages/account/profile.component').then(
                (m) => m.ProfileComponent,
              ),
          },
        ],
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/pages/cart/cart.component').then(
            (m) => m.CartComponent,
          ),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./features/pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent,
          ),
      },
      {
        path: 'order-success',
        loadComponent: () =>
          import('./features/pages/order-success/order-success.component').then(
            (m) => m.OrderSuccessComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
