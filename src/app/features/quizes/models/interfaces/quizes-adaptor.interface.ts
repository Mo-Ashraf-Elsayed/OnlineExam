import { Exam, QuizesRes } from './quizes.interface';

export interface QuizesAdaptor {
  adaptQuizes(data: QuizesRes): Exam[];
}
