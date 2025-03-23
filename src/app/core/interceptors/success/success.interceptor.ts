import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const successInterceptor: HttpInterceptorFn = (req, next) => {
  const toster = inject(ToastrService);
  return next(req).pipe(
    map((event: any) => {
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
        }
      }
      return event;
    })
  );
};
