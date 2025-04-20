import { Component, Input } from '@angular/core';
import { Answer } from '../../../questions/models/interfaces/questions.interface';

@Component({
  selector: 'app-result-of-questions-card',
  imports: [],
  templateUrl: './result-of-questions-card.component.html',
  styleUrl: './result-of-questions-card.component.scss',
})
export class ResultOfQuestionsCardComponent {
  @Input() userAnswer: string = '';
  @Input() correctAnswer: string = '';
  @Input() question: string = '';
  @Input() answers: Answer[] = [] as Answer[];
}
