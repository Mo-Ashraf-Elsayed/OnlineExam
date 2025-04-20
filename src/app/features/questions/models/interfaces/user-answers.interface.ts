import { Answer } from './questions.interface';

export interface UserAnswers {
  question: string;
  answers: Answer[];
  type: string;
  correctAnswer: string;
  duration: number;
  questionId: string;
  userAnswer: string;
}
