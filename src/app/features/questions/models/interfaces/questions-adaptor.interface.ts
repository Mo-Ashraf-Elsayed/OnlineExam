import { QuestionsResAdabtor } from './adapt-questions-res.interface';
import { QuestionsRes } from './questions.interface';

export interface QuestionsAdabtorI {
  adaptQuestionsRes(data: QuestionsRes): QuestionsResAdabtor[];
}
