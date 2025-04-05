import { SubjectObj, SubjectsRes } from './all-subjects';

export interface SubjectsAdaptor {
  adaptAllSubjectRes(data: SubjectsRes): SubjectObj[];
}
