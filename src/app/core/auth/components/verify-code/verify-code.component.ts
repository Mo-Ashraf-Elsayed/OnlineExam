import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SubmitBtnComponent } from '../submit-btn/submit-btn.component';
import { AuthApiService } from 'elevate-auth-api';
import { Subscription } from 'rxjs';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { UserEmailService } from '../../services/user-email.service';

@Component({
  selector: 'app-verify-code',
  imports: [
    SubmitBtnComponent,
    ReactiveFormsModule,
    ValidationMessagesComponent,
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss',
})
export class VerifyCodeComponent implements OnInit, OnDestroy {
  verifyCodeForm: FormGroup = new FormGroup({});
  private readonly authService = inject(AuthApiService);
  private readonly userEmailService = inject(UserEmailService);
  @Output() changeForgotPassFlowCase = new EventEmitter();
  userEmail: string = '';
  cancelSubscription: Subscription = new Subscription();
  isFormSubmited: boolean = false;
  initForm(): void {
    this.verifyCodeForm = new FormGroup({
      resetCode: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{6}$'),
      ]),
    });
  }
  submitForm(): void {
    this.isFormSubmited = true;
    if (this.verifyCodeForm.valid) {
      this.cancelSubscription = this.authService
        .verifyResetCode(this.verifyCodeForm.value)
        .subscribe({
          next: () => {
            this.isFormSubmited = false;
            // this.router.navigate(['/forgotPassword/setPass'], {
            //   skipLocationChange: true,
            // });
            this.changeForgotPassFlowCase.emit();
          },
          error: () => {
            this.isFormSubmited = false;
          },
        });
    } else {
      this.verifyCodeForm.markAllAsTouched();
      this.isFormSubmited = false;
    }
  }
  setUserEmail(): void {
    this.userEmail = this.userEmailService.userEmail();
  }
  resendCode(): void {
    let forgotPasswordData = {
      email: this.userEmail,
    };
    this.authService.forgotPassword(forgotPasswordData).subscribe();
  }
  ngOnInit(): void {
    this.setUserEmail();
    this.initForm();
  }
  ngOnDestroy(): void {
    this.cancelSubscription.unsubscribe();
  }
}
