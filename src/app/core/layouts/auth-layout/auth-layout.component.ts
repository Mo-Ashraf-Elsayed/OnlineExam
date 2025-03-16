import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthNavbarComponent } from '../../auth/components/auth-navbar/auth-navbar.component';
import { WelcomeToComponent } from '../../auth/components/welcome-to/welcome-to.component';
import { ContinueWithBtnsComponent } from '../../auth/components/continue-with-btns/continue-with-btns.component';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,
    AuthNavbarComponent,
    WelcomeToComponent,
    ContinueWithBtnsComponent,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
