import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubmitBtnComponent } from '../submit-btn/submit-btn.component';
import { AuthApiService } from 'elevate-auth-api';
import { Subscription } from 'rxjs';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { LocalStorageMethodService } from '../../../../shared/helper/local-storage-method.service';
import { Store } from '@ngrx/store';
import { setTokenAction } from '../../../store/token/token.action';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sign-in',
  imports: [
    SubmitBtnComponent,
    RouterLink,
    ValidationMessagesComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  private readonly authService = inject(AuthApiService);
  private readonly router = inject(Router);
  private readonly localStorage = inject(LocalStorageMethodService);
  private readonly store = inject(Store);
  cancelSubscription: Subscription = new Subscription();
  isShowPassword: boolean = false;
  isFormSubmited: boolean = false;
  initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
    });
  }
  submitForm(): void {
    this.isFormSubmited = true;
    if (this.loginForm.valid) {
      this.cancelSubscription = this.authService
        .signin(this.loginForm.value)
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
      this.loginForm.markAllAsTouched();
      this.isFormSubmited = false;
    }
  }
  showAndHidePassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }
  storeToken(t: string): void {
    this.store.dispatch(setTokenAction({ value: t }));
  }
  ngOnInit(): void {
    this.initForm();
  }
  ngOnDestroy(): void {
    this.cancelSubscription.unsubscribe();
  }
}
