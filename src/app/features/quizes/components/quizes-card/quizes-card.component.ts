import { Component, Input } from '@angular/core';
import { Exam } from '../../models/interfaces/quizes.interface';

@Component({
  selector: 'app-quizes-card',
  imports: [],
  templateUrl: './quizes-card.component.html',
  styleUrl: './quizes-card.component.scss',
})
export class QuizesCardComponent {
  @Input() quiz: Exam = {} as Exam;
}
