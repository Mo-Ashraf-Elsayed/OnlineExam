import { createAction, props } from '@ngrx/store';
import { QuestionsResAdabtor } from '../../../features/questions/models/interfaces/adapt-questions-res.interface';

const setUserAnswers: string = `[Arr] UserAnswers`;
export const setUserAnswersAction = createAction(
  setUserAnswers,
  props<{ userAnswers: QuestionsResAdabtor[] }>()
);
