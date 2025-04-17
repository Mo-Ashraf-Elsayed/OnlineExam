import { Answer } from './questions.interface';

export interface QuestionsResAdabtor {
  question: string;
  answers: Answer[];
  type: string;
  correctAnswer: string;
  duration: number;
  questionId: string;
}
