import { createAction, props } from '@ngrx/store';
import { UserAnswers } from '../../../features/questions/models/interfaces/user-answers.interface';

const setUserAnswers: string = `[Arr] UserAnswers`;
export const setUserAnswersAction = createAction(
  setUserAnswers,
  props<{ userAnswers: UserAnswers[] }>()
);
