import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubmitBtnComponent } from '../submit-btn/submit-btn.component';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { AuthApiService } from 'elevate-auth-api';
import { Subscription } from 'rxjs';
import { LocalStorageMethodService } from '../../../../shared/helper/local-storage-method.service';
import { matchPassword } from '../../../../shared/helper/password.match';
import { setTokenAction } from '../../../store/token.action';
import { Store } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-register',
  imports: [
    SubmitBtnComponent,
    RouterLink,
    ReactiveFormsModule,
    ValidationMessagesComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = new FormGroup({});
  private readonly authService = inject(AuthApiService);
  private readonly localStorage = inject(LocalStorageMethodService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  cancelSubscription: Subscription = new Subscription();
  namePattren: string = '^[a-zA-Z]+$';
  isShowPassword: boolean = false;
  isShowRePassword: boolean = false;
  isFormSubmited: boolean = false;
  initForm(): void {
    this.registerForm = new FormGroup(
      {
        username: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
        firstName: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.namePattren),
        ]),
        lastName: new FormControl(null, [
          Validators.required,
          Validators.pattern(this.namePattren),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ]),
        rePassword: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern('^01[0-2,5]{1}[0-9]{8}$'),
        ]),
      },
      { validators: matchPassword }
    );
  }
  submitForm(): void {
    this.isFormSubmited = true;
    if (this.registerForm.valid && this.isFormSubmited) {
      this.cancelSubscription = this.authService
        .register(this.registerForm.value)
        .subscribe({
          next: (res) => {
            this.isFormSubmited = false;
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
      this.registerForm.markAllAsTouched();
      this.isFormSubmited = false;
    }
  }
  showAndHidePassword(input: string): void {
    if (input === 'password') this.isShowPassword = !this.isShowPassword;
    else this.isShowRePassword = !this.isShowRePassword;
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
