export interface SubjectsRes {
  message: string;
  metadata: Metadata;
  subjects: SubjectObj[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface SubjectObj {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}
