import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SubmitBtnComponent } from '../submit-btn/submit-btn.component';
import { AuthApiService } from 'elevate-auth-api';
import { Subscription } from 'rxjs';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { UserEmailService } from '../../services/user-email.service';

@Component({
  selector: 'app-forgot-password',
  imports: [
    SubmitBtnComponent,
    RouterLink,
    ReactiveFormsModule,
    ValidationMessagesComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup = new FormGroup({});
  private readonly authService = inject(AuthApiService);
  private readonly userEmailService = inject(UserEmailService);
  private readonly router = inject(Router);
  cancelSubscription: Subscription = new Subscription();
  isFormSubmited: boolean = false;
  initForm(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  submitForm(): void {
    this.isFormSubmited = true;
    if (this.forgotPasswordForm.valid) {
      this.cancelSubscription = this.authService
        .forgotPassword(this.forgotPasswordForm.value)
        .subscribe({
          next: () => {
            this.isFormSubmited = false;
            this.router.navigate(['/forgotPassword/verify'], {
              skipLocationChange: true,
            });
            this.userEmailService.userEmail.set(
              this.forgotPasswordForm.get('email')?.value
            );
          },
          error: () => {
            this.isFormSubmited = false;
          },
        });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
  ngOnInit(): void {
    this.initForm();
  }
  ngOnDestroy(): void {
    this.cancelSubscription.unsubscribe();
  }
}
