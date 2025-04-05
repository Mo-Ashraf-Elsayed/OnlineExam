import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Subjects } from '../models/base/subjects.absClass';
import { environment } from '../../../../environment/environment';
import { SubjectObj } from '../models/interface/all-subjects';
import { ResSubjectsAdaptor } from '../models/adaptor/subjects-adaptor';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService implements Subjects {
  private readonly http = inject(HttpClient);
  private readonly resSubjectsAdaptor = inject(ResSubjectsAdaptor);
  getAllSubjects(isAll: boolean): Observable<SubjectObj[]> {
    return this.http
      .get(environment.baseURL + `subjects?limit=${isAll ? '40' : '6'}`)
      .pipe(
        map((res: any) => this.resSubjectsAdaptor.adaptAllSubjectRes(res)),
        catchError((err) => throwError(() => err))
      );
  }
}
