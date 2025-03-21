import { Component } from '@angular/core';
import { SubmitBtnComponent } from '../submit-btn/submit-btn.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [SubmitBtnComponent, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {}
