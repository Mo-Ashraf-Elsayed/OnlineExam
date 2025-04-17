import { Component, EventEmitter, Output } from '@angular/core';
import { SubmitBtnComponent } from '../../../../core/auth/components/submit-btn/submit-btn.component';

@Component({
  selector: 'app-instructions-card',
  imports: [SubmitBtnComponent],
  templateUrl: './instructions-card.component.html',
  styleUrl: './instructions-card.component.scss',
})
export class InstructionsCardComponent {
  @Output() startQuiz = new EventEmitter();
}
