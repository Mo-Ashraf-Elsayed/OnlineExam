import { Observable } from 'rxjs';
import {
  LoginResAfterAdabt,
  RegisterData,
  SigninData,
} from '../interface/register-login';

export abstract class AuthApi {
  abstract register(data: RegisterData): Observable<LoginResAfterAdabt>;
  abstract signin(data: SigninData): Observable<LoginResAfterAdabt>;
  abstract forgotPassword(data: any): Observable<any>;
  abstract verifyResetCode(data: any): Observable<any>;
  abstract resetPassword(data: any): Observable<any>;
}
