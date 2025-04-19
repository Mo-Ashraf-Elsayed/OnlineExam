import { Component, inject } from '@angular/core';
import { InstructionsCardComponent } from '../instructions-card/instructions-card.component';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuestionsService } from '../../services/questions.service';
import { QuestionsResAdabtor } from '../../models/interfaces/adapt-questions-res.interface';
import { setQuizArrAction } from '../../../../core/store/quizArr/quizArr.action';
import { QuizScoreComponent } from '../quiz-score/quiz-score.component';
import { QuizResultComponent } from '../quiz-result/quiz-result.component';

@Component({
  selector: 'app-questions-modal',
  imports: [
    InstructionsCardComponent,
    QuestionCardComponent,
    QuizScoreComponent,
    QuizResultComponent,
  ],
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
  quizPhase: 'instructions' | 'start' | 'finishedAndShowScore' | 'result' =
    'instructions';
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
      },
    });
  }
  startQuiz() {
    this.quizPhase = 'start';
    this.getQuizId();
    this.getQuestionsOnQuiz(this.quizId);
  }
  finishQuiz() {
    this.quizPhase = 'finishedAndShowScore';
  }
  showResult() {
    this.quizPhase = 'result';
  }
}
