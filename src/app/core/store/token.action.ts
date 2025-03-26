import { createAction, props } from '@ngrx/store';
export const setToken: string = '[Token] SetToken';

export const setTokenAction = createAction(
  setToken,
  props<{ value: string }>()
);
