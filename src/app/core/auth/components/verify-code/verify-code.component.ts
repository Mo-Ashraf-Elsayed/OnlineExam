import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmitBtnComponent } from '../submit-btn/submit-btn.component';
import { AuthApiService } from 'elevate-auth-api';
import { Subscription } from 'rxjs';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';

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
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
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
    if (this.verifyCodeForm.valid && this.isFormSubmited) {
      this.cancelSubscription = this.authService
        .verifyResetCode(this.verifyCodeForm.value)
        .subscribe({
          next: () => {
            this.isFormSubmited = false;
            this.router.navigate(['/setPassword'], {
              queryParams: {
                email: this.userEmail,
              },
            });
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
    this.activatedRoute.queryParams.subscribe(({ email }) => {
      this.userEmail = email;
    });
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
