import { Injectable } from '@angular/core';
import { QuestionsAdabtorI } from '../interfaces/questions-adaptor.interface';
import { QuestionsRes } from '../interfaces/questions.interface';
import { QuestionsResAdabtor } from '../interfaces/adapt-questions-res.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsDataAdaptorService implements QuestionsAdabtorI {
  adaptQuestionsRes(data: QuestionsRes): QuestionsResAdabtor[] {
    let arr: QuestionsResAdabtor[] = [];
    for (let i = 0; i < data.questions.length; i++) {
      let obj: QuestionsResAdabtor = {
        question: data.questions[i].question,
        answers: data.questions[i].answers,
        type: data.questions[i].type,
        correctAnswer: data.questions[i].correct,
        duration: data.questions[i].exam.duration,
        questionId: data.questions[i]._id,
      };
      arr.push(obj);
    }
    return arr;
  }
}
