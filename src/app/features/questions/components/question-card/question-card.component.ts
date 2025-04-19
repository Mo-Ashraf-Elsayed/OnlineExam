import { Component, EventEmitter, inject, Output } from '@angular/core';
import { QuestionsResAdabtor } from '../../models/interfaces/adapt-questions-res.interface';
import { Store } from '@ngrx/store';
import { UserAnswers } from '../../models/interfaces/user-answers.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { setUserAnswersAction } from '../../../../core/store/userAnswers/userAnswers.action';

@Component({
  selector: 'app-question-card',
  imports: [ReactiveFormsModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
})
export class QuestionCardComponent {
  private readonly storeForQuizArr: Store<{ quizArr: QuestionsResAdabtor[] }> =
    inject(Store);
  private readonly storeToSetUserAnswers: Store<{
    userAnswers: UserAnswers[];
  }> = inject(Store);
  questionsArr: QuestionsResAdabtor[] = [] as QuestionsResAdabtor[];
  currentQuestionIndex: number = 0;
  answerdQuestions: undefined[] = [undefined];
  notAnswerdQuestions: undefined[] = [];
  durationCounter: number = 0;
  minute: number = 59;
  counterDown: ReturnType<typeof setInterval> = setInterval(() => {}, 0);
  userAnswers: UserAnswers[] = [] as UserAnswers[];
  answerForm: FormGroup = new FormGroup({});
  @Output() finishQuizAndShowScore = new EventEmitter();
  initForm() {
    this.answerForm = new FormGroup({
      userAnswer: new FormControl(''),
    });
  }
  getQuestionsArr() {
    this.storeForQuizArr.select('quizArr').subscribe({
      next: (value) => {
        this.questionsArr = value;
        if (+value != 0) {
          this.notAnswerdQuestions = Array(
            this.questionsArr.length - this.currentQuestionIndex - 1
          );
          this.setDurationCounter();
        }
      },
    });
  }
  setDurationCounter() {
    this.durationCounter = this.questionsArr[0].duration;
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
  getUserAnswerOnQuestion(location: 'next' | 'back' | 'submit') {
    this.answerForm.value.questionId =
      this.questionsArr[this.currentQuestionIndex].questionId;
    this.answerForm.value.question =
      this.questionsArr[this.currentQuestionIndex].question;
    if (location === 'next' || location === 'submit') {
      this.userAnswers.push({ ...this.answerForm.value });
      if (location === 'submit') {
        this.storeToSetUserAnswers.dispatch(
          setUserAnswersAction({ userAnswers: this.userAnswers })
        );
      }
    } else if (location === 'back') {
      this.userAnswers.splice(this.currentQuestionIndex);
    }
  }
  next() {
    if (this.currentQuestionIndex + 1 === this.questionsArr.length) {
      this.getUserAnswerOnQuestion('submit');
    } else {
      this.getUserAnswerOnQuestion('next');
      this.currentQuestionIndex = this.currentQuestionIndex + 1;
      this.answerdQuestions = [...Array(this.currentQuestionIndex + 1)];
      this.notAnswerdQuestions = [
        ...Array(this.questionsArr.length - this.currentQuestionIndex - 1),
      ];
    }
  }
  back() {
    this.currentQuestionIndex = this.currentQuestionIndex - 1;
    this.answerdQuestions = [...Array(this.currentQuestionIndex + 1)];
    this.notAnswerdQuestions = [
      ...Array(this.questionsArr.length - this.currentQuestionIndex - 1),
    ];
    this.getUserAnswerOnQuestion('back');
  }
  ngOnInit() {
    this.getQuestionsArr();
    this.initForm();
  }
}
