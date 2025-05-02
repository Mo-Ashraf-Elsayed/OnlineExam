import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UserAnswers } from '../../../questions/models/interfaces/user-answers.interface';
import { Store } from '@ngrx/store';
import { QuizesService } from '../../services/quizes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-score',
  imports: [],
  templateUrl: './quiz-score.component.html',
  styleUrl: './quiz-score.component.scss',
})
export class QuizScoreComponent implements OnInit, OnDestroy {
  private readonly storeToSetUserAnswers: Store<{
    userAnswers: UserAnswers[];
  }> = inject(Store);
  private readonly quizesService = inject(QuizesService);
  userAnswers: UserAnswers[] = [];
  correct: number = 0;
  inCorrect: number = 0;
  @Output() showResult = new EventEmitter();
  cancelSubscribe: Subscription = new Subscription();
  getUserAnswersArr() {
    this.cancelSubscribe = this.storeToSetUserAnswers
      .select('userAnswers')
      .subscribe({
        next: (res) => {
          this.userAnswers = res;
        },
      });
  }
  getTheScore() {
    for (let i = 0; i < this.userAnswers.length; i++) {
      if (this.userAnswers[i].questionId !== this.userAnswers[i].questionId) {
        throw new Error('userAnswers Array is not valid');
      }
      if (
        this.userAnswers[i].userAnswer === this.userAnswers[i].correctAnswer
      ) {
        this.correct = this.correct + 1;
      } else if (
        this.userAnswers[i].userAnswer !== this.userAnswers[i].correctAnswer
      ) {
        this.inCorrect = this.inCorrect + 1;
      }
    }
  }
  closeQuizScoreModal() {
    this.quizesService.isQuizStarted.set(false);
  }
  getChartBackground(correct: number, inCorrect: number): string {
    return `conic-gradient(
      #02369c 0% ${this.getPercentageValueForCorrectAnswers(
        correct,
        inCorrect
      )}%,
      #cc1010 ${this.getPercentageValueForCorrectAnswers(
        correct,
        inCorrect
      )}% 100%
    )`;
  }
  getPercentageValueForCorrectAnswers(correct: number, inCorrect: number) {
    if (correct + inCorrect === 0) return 0;
    return Math.round((correct / (correct + inCorrect)) * 100);
  }
  ngOnInit(): void {
    this.getUserAnswersArr();
    this.getTheScore();
  }
  ngOnDestroy() {
    this.cancelSubscribe.unsubscribe();
  }
}
