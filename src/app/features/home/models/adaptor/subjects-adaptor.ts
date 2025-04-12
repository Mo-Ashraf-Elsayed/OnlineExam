import { Injectable } from '@angular/core';
import { SubjectsAdaptor } from '../interface/subjects-adaptor.interface';
import { SubjectsRes, SubjectObj } from '../interface/all-subjects.interface';

@Injectable({
  providedIn: 'root',
})
export class SubjectsResAdaptor implements SubjectsAdaptor {
  constructor() {}
  adaptAllSubjectRes(data: SubjectsRes): SubjectObj[] {
    return data.subjects;
  }
}
