import { createAction, props } from '@ngrx/store';
export const setQuizId: string = '[Id] QuizId';

export const setQuizIdAction = createAction(
  setQuizId,
  props<{ value: string }>()
);
