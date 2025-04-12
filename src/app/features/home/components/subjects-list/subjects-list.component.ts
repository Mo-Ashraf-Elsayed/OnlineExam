import { Component, inject, Input, OnChanges, OnDestroy } from '@angular/core';
import { SubjectCardComponent } from '../subject-card/subject-card.component';
import { SubjectsService } from '../../services/subjects.service';
import { SubjectObj } from '../../models/interface/all-subjects.interface';
import { Subscription } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-subjects-list',
  imports: [SubjectCardComponent, NgxSkeletonLoaderModule],
  templateUrl: './subjects-list.component.html',
  styleUrl: './subjects-list.component.scss',
})
export class SubjectsListComponent implements OnChanges, OnDestroy {
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
