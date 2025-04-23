import { createAction, props } from '@ngrx/store';
import { QuestionsResAdabtor } from '../../../features/questions/models/interfaces/adapt-questions-res.interface';

const setUserAnswers: string = `[Arr] UserAnswers`;
const resetUserAnswers: string = `[Arr] ResetUserAnswers`;
export const setUserAnswersAction = createAction(
  setUserAnswers,
  props<{ userAnswers: QuestionsResAdabtor[] }>()
);
export const resetUserAnswerAction = createAction(resetUserAnswers);
