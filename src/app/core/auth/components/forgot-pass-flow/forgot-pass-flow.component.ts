import { Component } from '@angular/core';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { VerifyCodeComponent } from '../verify-code/verify-code.component';
import { SetPasswordComponent } from '../set-password/set-password.component';

@Component({
  selector: 'app-forgot-pass-flow',
  imports: [ForgotPasswordComponent, VerifyCodeComponent, SetPasswordComponent],
  templateUrl: './forgot-pass-flow.component.html',
  styleUrl: './forgot-pass-flow.component.scss',
})
export class ForgotPassFlowComponent {
  forgotPasswordCase: 'forgotPass' | 'verifyCode' | 'resetPass' = 'forgotPass';
  secondStep() {
    this.forgotPasswordCase = 'verifyCode';
  }
  thirdStep() {
    this.forgotPasswordCase = 'resetPass';
  }
}
