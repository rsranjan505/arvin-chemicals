import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: '',
    loadChildren: () => import('./route/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '**',
    redirectTo: '' // or to a dedicated 404 component
  }
];
