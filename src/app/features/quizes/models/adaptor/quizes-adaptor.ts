import { Injectable } from '@angular/core';
import { Exam, QuizesRes } from '../interfaces/quizes.interface';
import { QuizesAdaptor } from '../interfaces/quizes-adaptor.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizesResAdaptor implements QuizesAdaptor {
  adaptQuizes(data: QuizesRes): Exam[] {
    return data.exams;
  }
}
