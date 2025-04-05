import { Injectable } from '@angular/core';
import { SubjectsAdaptor } from '../interface/adaptor';
import { SubjectsRes, SubjectObj } from '../interface/all-subjects';

@Injectable({
  providedIn: 'root',
})
export class ResSubjectsAdaptor implements SubjectsAdaptor {
  constructor() {}
  adaptAllSubjectRes(data: SubjectsRes): SubjectObj[] {
    return data.subjects;
  }
}
