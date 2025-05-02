import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { SignInComponent } from './core/auth/components/sign-in/sign-in.component';
import { HomePageComponent } from './features/home/components/home-page/home-page.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { mainLayoutGuard } from './core/guards/main-layout.guard';
import { QuizesListComponent } from './features/quizes/components/quizes-list/quizes-list.component';

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
            './core/auth/components/forgot-pass-flow/forgot-pass-flow.component'
          ).then((c) => c.ForgotPassFlowComponent),
        title: 'Forgot Password',
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
      { path: 'allQuizes', component: QuizesListComponent, title: 'Quizes' },
      { path: 'quizes/:id', component: QuizesListComponent, title: 'Quizes' },
    ],
  },
];
