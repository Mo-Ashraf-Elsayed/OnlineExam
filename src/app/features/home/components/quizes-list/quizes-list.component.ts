import { Component, inject, Input, OnChanges, OnDestroy } from '@angular/core';
import { QuizCardComponent } from '../quiz-card/quiz-card.component';
import { SubjectsService } from '../../services/subjects.service';
import { SubjectObj } from '../../models/interface/all-subjects';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quizes-list',
  imports: [QuizCardComponent],
  templateUrl: './quizes-list.component.html',
  styleUrl: './quizes-list.component.scss',
})
export class QuizesListComponent implements OnChanges, OnDestroy {
  @Input() isAllSubjectsLoaded: boolean = false;
  private readonly subjectsService = inject(SubjectsService);
  subjectsArr: SubjectObj[] = [] as SubjectObj[];
  private cancleSubscribtion: Subscription = new Subscription();
  getSubjects(isAll: boolean) {
    this.cancleSubscribtion = this.subjectsService
      .getAllSubjects(isAll)
      .subscribe({
        next: (res) => {
          this.subjectsArr = res;
        },
      });
  }
  ngOnChanges(): void {
    this.getSubjects(this.isAllSubjectsLoaded);
  }
  ngOnDestroy(): void {
    this.cancleSubscribtion.unsubscribe();
  }
}
