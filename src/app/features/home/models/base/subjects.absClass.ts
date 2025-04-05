import { Observable } from 'rxjs';

export abstract class Subjects {
  abstract getAllSubjects(limit: boolean): Observable<any>;
}
