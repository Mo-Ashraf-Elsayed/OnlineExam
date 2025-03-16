import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { SignInComponent } from './core/auth/components/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SignInComponent },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/components/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'forgotPassword',
        loadComponent: () =>
          import(
            './core/auth/components/forgot-password/forgot-password.component'
          ).then((c) => c.ForgotPasswordComponent),
      },
      {
        path: 'verifyCode',
        loadComponent: () =>
          import(
            './core/auth/components/verify-code/verify-code.component'
          ).then((c) => c.VerifyCodeComponent),
      },
      {
        path: 'setPassword',
        loadComponent: () =>
          import(
            './core/auth/components/set-password/set-password.component'
          ).then((c) => c.SetPasswordComponent),
      },
    ],
  },
  { path: '', component: MainLayoutComponent },
];
