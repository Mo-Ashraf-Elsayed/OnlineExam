import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { InstructionsCardComponent } from '../instructions-card/instructions-card.component';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuestionsService } from '../../services/questions.service';
import { QuestionsResAdabtor } from '../../models/interfaces/adapt-questions-res.interface';
import { setQuizArrAction } from '../../../../core/store/quizArr/quizArr.action';

@Component({
  selector: 'app-questions-modal',
  imports: [InstructionsCardComponent, QuestionCardComponent],
  templateUrl: './questions-modal.component.html',
  styleUrl: './questions-modal.component.scss',
})
export class QuestionsModalComponent {
  private readonly questionsService = inject(QuestionsService);
  private readonly store: Store<{ quizId: string }> = inject(Store);
  quizId$!: Observable<string>;
  quizId: string = '';
  quizArr$!: Observable<QuestionsResAdabtor[]>;
  questionsOnExamArr: QuestionsResAdabtor[] = [] as QuestionsResAdabtor[];
  // questionsOnExamArrLength: number = this.questionsOnExamArr.length;
  // currentQuestionIndex: number = 0;
  isQuizStarted: boolean = false;
  // hideInstructionsAndShowQuestion() {
  //   this.instructionsBox.nativeElement.classList.add('d-none');
  //   this.questionCardBox.nativeElement.classList.remove('d-none');
  // }
  getQuizId() {
    this.quizId$ = this.store.select('quizId');
    this.quizId$.subscribe({
      next: (value) => {
        this.quizId = value;
      },
    });
  }
  getQuestionsOnQuiz(quizId: string) {
    this.questionsService.getQuestionsOnExam(quizId).subscribe({
      next: (res) => {
        this.questionsOnExamArr = res;
        this.store.dispatch(
          setQuizArrAction({ quizArr: this.questionsOnExamArr })
        );

        // console.log(this.questionsOnExamArr);
      },
    });
  }
  startQuiz() {
    this.isQuizStarted = true;
    this.getQuizId();
    this.getQuestionsOnQuiz(this.quizId);
  }
}
