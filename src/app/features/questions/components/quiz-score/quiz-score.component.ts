import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAnswers } from '../../models/interfaces/user-answers.interface';
import { Store } from '@ngrx/store';
import { QuestionsResAdabtor } from '../../models/interfaces/adapt-questions-res.interface';

@Component({
  selector: 'app-quiz-score',
  imports: [RouterLink],
  templateUrl: './quiz-score.component.html',
  styleUrl: './quiz-score.component.scss',
})
export class QuizScoreComponent implements OnInit {
  private readonly storeToSetUserAnswers: Store<{
    userAnswers: UserAnswers[];
  }> = inject(Store);
  private readonly storeForQuizArr: Store<{ quizArr: QuestionsResAdabtor[] }> =
    inject(Store);
  userAnswers: UserAnswers[] = [];
  quizArr: QuestionsResAdabtor[] = [];
  correct: number = 0;
  inCorrect: number = 0;
  @Output() showResult = new EventEmitter();
  getUserAnswers() {
    this.storeToSetUserAnswers.select('userAnswers').subscribe({
      next: (res) => {
        this.userAnswers = res;
      },
    });
  }
  getQuizArr() {
    this.storeForQuizArr.select('quizArr').subscribe({
      next: (res) => {
        this.quizArr = res;
      },
    });
  }
  getTheScore() {
    for (let i = 0; i < this.userAnswers.length; i++) {
      if (this.userAnswers[i].questionId !== this.quizArr[i].questionId) {
        throw new Error('userAnswers Array is not valid');
        break;
      }
      if (this.userAnswers[i].userAnswer === this.quizArr[i].correctAnswer) {
        this.correct = this.correct + 1;
      } else if (
        this.userAnswers[i].userAnswer !== this.quizArr[i].correctAnswer
      ) {
        this.inCorrect = this.inCorrect + 1;
      }
    }
  }
  ngOnInit(): void {
    this.getUserAnswers();
    this.getQuizArr();
    this.getTheScore();
  }
}
