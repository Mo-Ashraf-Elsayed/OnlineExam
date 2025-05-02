import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { QuestionsResAdabtor } from '../../models/interfaces/adapt-questions-res.interface';
import { Store } from '@ngrx/store';
import { UserAnswers } from '../../models/interfaces/user-answers.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { setUserAnswersAction } from '../../../../core/store/userAnswers/userAnswers.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-card',
  imports: [ReactiveFormsModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
})
export class QuestionCardComponent implements OnInit, OnDestroy {
  private readonly storeForQuizArr: Store<{ quizArr: QuestionsResAdabtor[] }> =
    inject(Store);
  private readonly storeToSetUserAnswers: Store<{
    userAnswers: UserAnswers[];
  }> = inject(Store);
  formAnswer: FormGroup = new FormGroup({
    userAnswer: new FormControl(''),
  });
  currentQuestionIndex: number = 0;
  answerdQuestionsStepsArr: undefined[] = [undefined];
  notAnswerdQuestionsStepsArr: undefined[] = [];
  durationCounter: number = 0;
  minute: number = 59;
  counterDown: ReturnType<typeof setInterval> = setInterval(() => {}, 0);
  userAnswers: UserAnswers[] = [] as UserAnswers[];
  @Output() finishQuizAndShowScore = new EventEmitter();
  cancelSubscribe: Subscription = new Subscription();
  getQuestionsArr() {
    this.cancelSubscribe = this.storeForQuizArr.select('quizArr').subscribe({
      next: (value) => {
        this.getUserAnswersArr(value);
        if (+value != 0) {
          this.notAnswerdQuestionsStepsArr = Array(
            this.userAnswers.length - this.currentQuestionIndex - 1
          );
          this.setDurationCounter();
        }
      },
    });
  }
  setDurationCounter() {
    this.durationCounter = this.userAnswers[0].duration;
    this.createCounterDown();
  }
  createCounterDown() {
    this.durationCounter = this.durationCounter - 1;
    this.counterDown = setInterval(() => {
      this.minute = this.minute - 1;
      if (this.minute == 0) {
        this.minute = 59;
        this.durationCounter = this.durationCounter - 1;
        this.stopCounterDown();
      }
    }, 1000);
  }
  stopCounterDown() {
    if (this.durationCounter <= 0) {
      clearInterval(this.counterDown);
      this.minute = 0;
      this.durationCounter = 0;
    }
  }
  submitQuiz() {
    this.storeToSetUserAnswers.dispatch(
      setUserAnswersAction({ userAnswers: this.userAnswers })
    );
  }
  getUserAnswersArr(arr: QuestionsResAdabtor[]) {
    let myArr: UserAnswers[] = [];
    for (let i = 0; i < arr.length; i++) {
      myArr.push({ ...arr[i], ...this.formAnswer.value });
    }
    this.userAnswers = myArr;
  }
  setUserAnswer() {
    if (
      this.userAnswers[this.currentQuestionIndex].userAnswer == '' ||
      this.userAnswers[this.currentQuestionIndex].userAnswer !=
        this.formAnswer.value.userAnswer
    ) {
      this.userAnswers[this.currentQuestionIndex].userAnswer =
        this.formAnswer.value.userAnswer;
      this.formAnswer.setValue({ userAnswer: 'A1' });
    }
  }
  setArraysToDisplayQuestionsSteps() {
    this.answerdQuestionsStepsArr = [...Array(this.currentQuestionIndex + 1)];
    this.notAnswerdQuestionsStepsArr = [
      ...Array(this.userAnswers.length - this.currentQuestionIndex - 1),
    ];
  }
  next() {
    if (
      this.currentQuestionIndex + 1 === this.userAnswers.length ||
      (this.durationCounter == 0 && this.minute)
    ) {
      this.submitQuiz();
    } else {
      this.currentQuestionIndex = this.currentQuestionIndex + 1;
      this.setArraysToDisplayQuestionsSteps();
    }
  }
  back() {
    this.currentQuestionIndex = this.currentQuestionIndex - 1;
    this.setArraysToDisplayQuestionsSteps();
  }
  ngOnInit() {
    this.getQuestionsArr();
  }
  ngOnDestroy(): void {
    this.cancelSubscribe.unsubscribe();
  }
}
