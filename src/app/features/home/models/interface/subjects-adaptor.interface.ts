import { SubjectObj, SubjectsRes } from './all-subjects.interface';

export interface SubjectsAdaptor {
  adaptAllSubjectRes(data: SubjectsRes): SubjectObj[];
}
