import { Component } from '@angular/core';
import { SubmitBtnComponent } from '../submit-btn/submit-btn.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [SubmitBtnComponent, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {}
