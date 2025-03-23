import { Injectable } from '@angular/core';
import { Adaptor } from '../interface/adaptor';
import {
  LoginResAfterAdabt,
  LoginResBeforeAdabt,
} from '../interface/register-login';
import {
  ForgotPasswordRes,
  ResetPasswordRes,
  VerifyCodeRes,
} from '../interface/forgot-password-flow';

@Injectable({
  providedIn: 'root',
})
export class AuthApiAdaptorService implements Adaptor {
  constructor() {}
  adaptLogin(data: LoginResBeforeAdabt): LoginResAfterAdabt {
    return {
      message: data.message,
      token: data.token,
      email: data.user.email,
    };
  }
  adaptForgotPassword(data: ForgotPasswordRes): ForgotPasswordRes {
    return data;
  }
  adaptResetCode(data: VerifyCodeRes): VerifyCodeRes {
    return data;
  }
  adaptResetPassword(data: ResetPasswordRes): ResetPasswordRes {
    return data;
  }
}
