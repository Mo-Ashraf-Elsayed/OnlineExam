import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageMethodService } from '../services/local-storage-method.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalStorageMethodService);
  const router = inject(Router);
  if (localStorage.myLocarStorage('check', 'token')) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
