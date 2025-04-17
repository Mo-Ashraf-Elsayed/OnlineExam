import { Observable } from 'rxjs';
import { QuestionsResAdabtor } from '../interfaces/adapt-questions-res.interface';

export abstract class Questions {
  abstract getQuestionsOnExam(): Observable<QuestionsResAdabtor[]>;
}
