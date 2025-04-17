import { createReducer, on } from '@ngrx/store';
import { setQuizArrAction } from './quizArr.action';
import { QuestionsResAdabtor } from '../../../features/questions/models/interfaces/adapt-questions-res.interface';

const initValue: QuestionsResAdabtor[] = [] as QuestionsResAdabtor[];

export const quizArrReducer = createReducer(
  initValue,
  on(setQuizArrAction, (state, action) => {
    state = action.quizArr;
    return state;
  })
);
