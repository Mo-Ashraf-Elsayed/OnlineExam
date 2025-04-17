import { createReducer, on } from '@ngrx/store';
import { setQuizIdAction } from './quizId.action';

const initValue: string = '';
export const quizIdReducer = createReducer(
  initValue,
  on(setQuizIdAction, (state, action) => {
    state = action.value;
    return state;
  })
);
