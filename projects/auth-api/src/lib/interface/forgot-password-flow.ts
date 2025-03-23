export interface ForgotPasswordData {
  email: string;
}
export interface ForgotPasswordRes {
  message: string;
  info: string;
}
export interface VerifyCodeData {
  resetCode: string;
}
export interface VerifyCodeRes {
  status: string;
}
export interface ResetPasswordData {
  email: string;
  newPassword: string;
}
export interface ResetPasswordRes {
  message: string;
  token: string;
}
