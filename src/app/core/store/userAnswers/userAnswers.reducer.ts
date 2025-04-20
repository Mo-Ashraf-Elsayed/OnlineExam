import { createReducer, on } from '@ngrx/store';
import { setUserAnswersAction } from './userAnswers.action';
import { QuestionsResAdabtor } from '../../../features/questions/models/interfaces/adapt-questions-res.interface';

const initValue: QuestionsResAdabtor[] = [] as QuestionsResAdabtor[];

export const userAnswersReducer = createReducer(
  initValue,
  on(setUserAnswersAction, (state, action) => {
    state = action.userAnswers;
    return state;
  })
);
