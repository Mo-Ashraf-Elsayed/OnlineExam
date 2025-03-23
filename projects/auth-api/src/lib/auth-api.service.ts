import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthApi } from './base/AuthApi.absClass';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthEndPoint } from './enums/authApi.endPoint';
import { AuthApiAdaptorService } from './adaptor/auth-api-adaptor';
import {
  LoginResAfterAdabt,
  RegisterData,
  SigninData,
} from './interface/register-login';
import { baseURL } from './token/inject-baseurl.token';
import {
  ForgotPasswordData,
  ForgotPasswordRes,
  ResetPasswordData,
  ResetPasswordRes,
  VerifyCodeData,
  VerifyCodeRes,
} from './interface/forgot-password-flow';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService implements AuthApi {
  private readonly http = inject(HttpClient);
  private readonly authApiAdaptorService = inject(AuthApiAdaptorService);
  private readonly baseurl = inject(baseURL);

  register(data: RegisterData): Observable<LoginResAfterAdabt> {
    return this.http.post(this.baseurl + AuthEndPoint.REGISTER, data).pipe(
      map((res: any) => this.authApiAdaptorService.adaptLogin(res)),
      catchError((err) => throwError(() => err))
    );
  }
  signin(data: SigninData): Observable<LoginResAfterAdabt> {
    return this.http.post(this.baseurl + AuthEndPoint.LOGIN, data).pipe(
      map((res: any) => this.authApiAdaptorService.adaptLogin(res)),
      catchError((err) => throwError(() => err))
    );
  }
  forgotPassword(data: ForgotPasswordData): Observable<ForgotPasswordRes> {
    return this.http
      .post(this.baseurl + AuthEndPoint.FORGOT_PASSWORD, data)
      .pipe(
        map((res: any) => this.authApiAdaptorService.adaptForgotPassword(res)),
        catchError((err) => throwError(() => err))
      );
  }
  verifyResetCode(data: VerifyCodeData): Observable<VerifyCodeRes> {
    return this.http
      .post(this.baseurl + AuthEndPoint.VERIFY_RESET_CODE, data)
      .pipe(
        map((res: any) => this.authApiAdaptorService.adaptResetCode(res)),
        catchError((err) => throwError(() => err))
      );
  }
  resetPassword(data: ResetPasswordData): Observable<ResetPasswordRes> {
    return this.http.put(this.baseurl + AuthEndPoint.RESET_PASSWORD, data).pipe(
      map((res: any) => this.authApiAdaptorService.adaptResetPassword(res)),
      catchError((err) => throwError(() => err))
    );
  }
}
