import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Quizes } from '../models/base/quizes.absClass';
import { map, Observable } from 'rxjs';
import { Exam, QuizesRes } from '../models/interfaces/quizes.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { QuizesResAdaptor } from '../models/adaptor/quizes-adaptor';

@Injectable({
  providedIn: 'root',
})
export class QuizesService implements Quizes {
  private readonly http = inject(HttpClient);
  private readonly quizesResAdaptor = inject(QuizesResAdaptor);
  isQuizStarted: WritableSignal<boolean> = signal<boolean>(false);
  getAllQuizes(Subject?: string | null, limit?: number): Observable<Exam[]> {
    return this.http
      .get<QuizesRes>(
        environment.baseURL +
          'exams' +
          `${Subject ? `?subject=${Subject}` : ``}
          ${limit ? `?limit=${limit}` : ``}`
      )
      .pipe(map((data: QuizesRes) => this.quizesResAdaptor.adaptQuizes(data)));
  }
}
