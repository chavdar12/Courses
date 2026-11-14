import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// Functional guard (used as canActivate and canMatch) - redirects guests to /home
// with the attempted url as a query param. The url comes from the navigation itself,
// because canMatch gets url segments instead of a RouterStateSnapshot.
export const authGuard: CanActivateFn & CanMatchFn = () => {
  const router = inject(Router);
  return (
    inject(AuthService).isLoggedIn() ||
    router.createUrlTree(['/home'], {
      queryParams: { returnUrl: router.currentNavigation()?.initialUrl.toString() },
    })
  );
};
