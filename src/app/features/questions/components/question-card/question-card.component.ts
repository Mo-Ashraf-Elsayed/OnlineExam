import { Component, inject } from '@angular/core';
import { QuestionsResAdabtor } from '../../models/interfaces/adapt-questions-res.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-question-card',
  imports: [],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
})
export class QuestionCardComponent {
  private readonly store: Store<{ quizArr: QuestionsResAdabtor[] }> =
    inject(Store);
  questionsArr: QuestionsResAdabtor[] = [] as QuestionsResAdabtor[];
  currentQuestionIndex: number = 0;
  answerdQuestions: undefined[] = [undefined];
  notAnswerdQuestions: undefined[] = [];
  durationCounter: number = 0;
  minute: number = 59;
  counterDown!: ReturnType<typeof setInterval>;
  getQuestionsArr() {
    this.store.select('quizArr').subscribe({
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
  next() {
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
    this.answerdQuestions = [...Array(this.currentQuestionIndex + 1)];
    this.notAnswerdQuestions = [
      ...Array(this.questionsArr.length - this.currentQuestionIndex - 1),
    ];
  }
  back() {
    this.currentQuestionIndex = this.currentQuestionIndex - 1;
    this.answerdQuestions = [...Array(this.currentQuestionIndex + 1)];
    this.notAnswerdQuestions = [
      ...Array(this.questionsArr.length - this.currentQuestionIndex - 1),
    ];
  }
  ngOnInit() {
    this.getQuestionsArr();
  }
}
