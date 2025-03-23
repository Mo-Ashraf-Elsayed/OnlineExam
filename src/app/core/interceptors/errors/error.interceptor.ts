import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toster = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      toster.error(err.error.message, 'Error');
      return throwError(() => err);
    })
  );
};
