import {
  ForgotPasswordRes,
  VerifyCodeRes,
  ResetPasswordRes,
} from './forgot-password-flow';
import { LoginResAfterAdabt, LoginResBeforeAdabt } from './register-login';

export interface Adaptor {
  adaptLogin(data: LoginResBeforeAdabt): LoginResAfterAdabt;
  adaptForgotPassword(data: ForgotPasswordRes): ForgotPasswordRes;
  adaptResetCode(data: VerifyCodeRes): VerifyCodeRes;
  adaptResetPassword(data: ResetPasswordRes): ResetPasswordRes;
}
