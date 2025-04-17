import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { QuestionsDataAdaptorService } from '../models/adaptor/questions-data-adaptor';
import { QuestionsResAdabtor } from '../models/interfaces/adapt-questions-res.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private readonly http = inject(HttpClient);
  private readonly questionsDataAdaptorService = inject(
    QuestionsDataAdaptorService
  );
  getQuestionsOnExam(quizId: string): Observable<QuestionsResAdabtor[]> {
    return this.http
      .get(environment.baseURL + `questions?exam=${quizId}`)
      .pipe(
        map((data: any) =>
          this.questionsDataAdaptorService.adaptQuestionsRes(data)
        )
      );
  }
}
