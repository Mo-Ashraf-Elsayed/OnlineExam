import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { SignInComponent } from './core/auth/components/sign-in/sign-in.component';
import { HomePageComponent } from './features/home/components/home-page/home-page.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { mainLayoutGuard } from './core/guards/main-layout.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedInGuard],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SignInComponent, title: 'Sign In' },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/components/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forgotPassword',
        loadComponent: () =>
          import(
            './core/auth/components/forgot-password/forgot-password.component'
          ).then((c) => c.ForgotPasswordComponent),
        title: 'Forgot Password',
      },
      {
        path: 'verifyCode',
        loadComponent: () =>
          import(
            './core/auth/components/verify-code/verify-code.component'
          ).then((c) => c.VerifyCodeComponent),
        title: 'Verify Code',
      },
      {
        path: 'setPassword',
        loadComponent: () =>
          import(
            './core/auth/components/set-password/set-password.component'
          ).then((c) => c.SetPasswordComponent),
        title: 'Login',
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [mainLayoutGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent, title: 'Home' },
    ],
  },
];
