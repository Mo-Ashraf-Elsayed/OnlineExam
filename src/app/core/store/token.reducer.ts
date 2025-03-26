import { createReducer, on } from '@ngrx/store';
import { setTokenAction } from './token.action';

const initValue: string = '';
export const tokenReducer = createReducer(
  initValue,
  on(setTokenAction, (state, action) => {
    state = action.value;
    return state;
  })
);
