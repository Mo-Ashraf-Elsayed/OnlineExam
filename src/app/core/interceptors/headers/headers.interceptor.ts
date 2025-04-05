import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageMethodService } from '../../../shared/helper/local-storage-method.service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LocalStorageMethodService);
  const userToken = localStorage.myLocarStorage('getItem', 'token');
  if (typeof userToken === 'string') {
    if (req.url.includes('subjects')) {
      req = req.clone({
        setHeaders: {
          token: userToken,
        },
      });
    }
  }
  return next(req);
};
