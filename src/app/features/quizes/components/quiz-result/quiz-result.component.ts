import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserAnswers } from '../../../questions/models/interfaces/user-answers.interface';
import { ResultOfQuestionsCardComponent } from '../result-of-questions-card/result-of-questions-card.component';
import { SubmitBtnComponent } from '../../../../core/auth/components/submit-btn/submit-btn.component';
import { QuizesService } from '../../services/quizes.service';
import { resetUserAnswerAction } from '../../../../core/store/userAnswers/userAnswers.action';

@Component({
  selector: 'app-quiz-result',
  imports: [ResultOfQuestionsCardComponent, SubmitBtnComponent],
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.scss',
})
export class QuizResultComponent implements OnInit {
  readonly quizesService = inject(QuizesService);
  private readonly storeToSetUserAnswers: Store<{
    userAnswers: UserAnswers[];
  }> = inject(Store);
  private readonly storeToResetArr: Store = inject(Store);
  userAnswers: UserAnswers[] = [] as UserAnswers[];
  getArrays() {
    this.storeToSetUserAnswers.select('userAnswers').subscribe({
      next: (value) => {
        this.userAnswers = value;
      },
    });
  }
  closeTheModal() {
    this.quizesService.isQuizStarted.set(false);
    this.storeToResetArr.dispatch(resetUserAnswerAction());
  }
  ngOnInit(): void {
    this.getArrays();
  }
}
