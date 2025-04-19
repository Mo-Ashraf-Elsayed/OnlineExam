import { createReducer, on } from '@ngrx/store';
import { UserAnswers } from '../../../features/questions/models/interfaces/user-answers.interface';
import { setUserAnswersAction } from './userAnswers.action';

const initValue: UserAnswers[] = [] as UserAnswers[];

export const userAnswersReducer = createReducer(
  initValue,
  on(setUserAnswersAction, (state, action) => {
    state = action.userAnswers;
    return state;
  })
);
