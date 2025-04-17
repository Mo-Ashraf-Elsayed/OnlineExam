import { createAction, props } from '@ngrx/store';
import { QuestionsResAdabtor } from '../../../features/questions/models/interfaces/adapt-questions-res.interface';

const setQuizArr: string = `[Arr] QuizArr`;
export const setQuizArrAction = createAction(
  setQuizArr,
  props<{ quizArr: QuestionsResAdabtor[] }>()
);
