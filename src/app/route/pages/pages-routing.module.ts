import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../features/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../../features/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
        pathMatch: 'full',
      },
      {
        path: 'our-collections',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            '../../features/pages/our-collection/our-collection.component'
          ).then((m) => m.OurCollectionComponent),
      },
      {
        path: 'about-us',
        pathMatch: 'full',
        loadComponent: () =>
          import('../../features/pages/about-us/about-us.component').then(
            (m) => m.AboutUsComponent
          ),
      },
      {
        path: 'contact-us',
        pathMatch: 'full',
        loadComponent: () =>
          import('../../features/pages/contact-us/contact-us.component').then(
            (m) => m.ContactUsComponent
          ),
      },
      {
        path: 'terms-conditions',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            '../../features/pages/term-condition/term-condition.component'
          ).then((m) => m.TermConditionComponent),
      },
      {
        path: 'return-policy',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            '../../features/pages/return-policy/return-policy.component'
          ).then((m) => m.ReturnPolicyComponent),
      },
      {
        path: 'privacy-policy',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            '../../features/pages/privacy-policy/privacy-policy.component'
          ).then((m) => m.PrivacyPolicyComponent),
      },
      {
        path: 'cancellation-policy',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            '../../features/pages/concellation-policy/concellation-policy.component'
          ).then((m) => m.ConcellationPolicyComponent),
      },
      {
        path: 'shipping-policy',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            '../../features/pages/shipping-policy/shipping-policy.component'
          ).then((m) => m.ShippingPolicyComponent),
      },
      {
        path: 'quality-certifications',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            '../../features/pages/quality-certifications/quality-certifications.component'
          ).then((m) => m.QualityCertificationsComponent),
      },
      // {
      //   path: 'products',
      //   pathMatch: 'full',
      // },
      {
        path: 'products/:slug',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            '../../features/pages/product-details/product-details.component'
          ).then((m) => m.ProductDetailsComponent),
      },
    ],
  },
];

// path: 'our-collections',
//   loadComponent: () =>
//     import('./pages/our-collections/our-collections.component')
//       .then(m => m.OurCollectionsComponent)

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
