import { Observable } from 'rxjs';
import { Exam } from '../interfaces/quizes.interface';

export abstract class Quizes {
  abstract getAllQuizes(Subject?: string, limit?: number): Observable<Exam[]>;
}
