import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmitBtnComponent } from '../submit-btn/submit-btn.component';
import { AuthApiService } from 'elevate-auth-api';
import { Subscription } from 'rxjs';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { LocalStorageMethodService } from '../../../../shared/helper/local-storage-method.service';
import { Store } from '@ngrx/store';
import { setTokenAction } from '../../../store/token/token.action';
import { jwtDecode } from 'jwt-decode';
import { UserEmailService } from '../../services/user-email.service';

@Component({
  selector: 'app-set-password',
  imports: [
    SubmitBtnComponent,
    ReactiveFormsModule,
    ValidationMessagesComponent,
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss',
})
export class SetPasswordComponent {
  setAPasswordForm: FormGroup = new FormGroup({});
  private readonly authService = inject(AuthApiService);
  private readonly userEmailService = inject(UserEmailService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly localStorage = inject(LocalStorageMethodService);
  private readonly store = inject(Store);
  userEmail: string = '';
  cancelSubscription: Subscription = new Subscription();
  isFormSubmited: boolean = false;
  isShowPassword: boolean = false;
  initForm(): void {
    this.setAPasswordForm = new FormGroup({
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
    });
  }
  submitForm(): void {
    this.isFormSubmited = true;
    if (this.setAPasswordForm.valid) {
      // Object.defineProperty(this.setAPasswordForm.value, 'email', {
      //   value: this.userEmail,
      // });
      this.setAPasswordForm.value.email = this.userEmail;
      this.cancelSubscription = this.authService
        .resetPassword(this.setAPasswordForm.value)
        .subscribe({
          next: (res) => {
            this.isFormSubmited = false;
            this.localStorage.myLocarStorage('setItem', 'token', res.token);
            this.storeToken(jwtDecode(res.token));
            this.router.navigate(['/home']);
          },
          error: () => {
            this.isFormSubmited = false;
          },
        });
    } else {
      this.setAPasswordForm.markAllAsTouched();
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
  showAndHidePassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }
  storeToken(t: string): void {
    this.store.dispatch(setTokenAction({ value: t }));
  }
  ngOnInit(): void {
    this.setUserEmail();
    this.initForm();
  }
  ngOnDestroy(): void {
    this.cancelSubscription.unsubscribe();
  }
}
