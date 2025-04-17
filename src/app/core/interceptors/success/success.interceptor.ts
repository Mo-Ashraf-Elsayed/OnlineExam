import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

export const successInterceptor: HttpInterceptorFn = (req, next) => {
  const toster = inject(ToastrService);
  return next(req).pipe(
    tap((event: any) => {
      if (event.body?.message) {
        if (req.url.includes('signup')) {
          toster.success('You Created Account And Logged In', 'Success');
        } else if (req.url.includes('signin')) {
          toster.success('You Logged In Successfully', 'Success');
        } else if (req.url.includes('forgotPassword')) {
          toster.success(event.body.info, 'Success');
        } else if (req.url.includes('resetPassword')) {
          toster.success(
            'You Just Changed Your Password And Logged In',
            'Success'
          );
        } else if (req.url.includes('questions?exam') && req.method == 'GET') {
          toster.success('The Quiz Has Just Begun', 'Success');
        }
      }
      return event;
    })
  );
};
