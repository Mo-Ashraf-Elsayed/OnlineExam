import { Component, Input } from '@angular/core';
import { SubjectObj } from '../../models/interface/all-subjects';

@Component({
  selector: 'app-quiz-card',
  imports: [],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss',
})
export class QuizCardComponent {
  @Input() subjectObj: SubjectObj = {} as SubjectObj;
}
