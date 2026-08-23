import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CustomerAuthService } from './customer-auth.service';

export const customerAuthGuard: CanActivateFn = (_route, state) => {
  const auth = inject(CustomerAuthService);
  const router = inject(Router);

  if (auth.isLoggedIn) {
    return true;
  }

  return router.createUrlTree(['/account/login'], {
    queryParams: { redirect: state.url },
  });
};
