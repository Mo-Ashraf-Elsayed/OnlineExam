import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  imports: [],
  templateUrl: './submit-btn.component.html',
  styleUrl: './submit-btn.component.scss',
})
export class SubmitBtnComponent {
  @Input() isSubmited!: boolean;
}
