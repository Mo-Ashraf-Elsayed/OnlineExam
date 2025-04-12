import { Observable } from 'rxjs';
import { SubjectObj } from '../interface/all-subjects.interface';

export abstract class Subjects {
  abstract getAllSubjects(limit: boolean): Observable<SubjectObj[]>;
}
