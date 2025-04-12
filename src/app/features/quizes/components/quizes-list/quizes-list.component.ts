import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizesService } from '../../services/quizes.service';
import { Exam } from '../../models/interfaces/quizes.interface';
import { QuizesCardComponent } from '../quizes-card/quizes-card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quizes-list',
  imports: [QuizesCardComponent, NgxSkeletonLoaderModule],
  templateUrl: './quizes-list.component.html',
  styleUrl: './quizes-list.component.scss',
})
export class QuizesListComponent implements OnInit, OnDestroy {
  private readonly quizesService = inject(QuizesService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private cancelSubFromQuizes: Subscription = new Subscription();
  quizes: Exam[] = [] as Exam[];
  subjectId: string | null = null;
  isThereQuizes: boolean = true;
  getSubjectId() {
    this.activatedRoute.paramMap.subscribe({
      next: (value) => {
        this.subjectId = value.get('id');
      },
    });
  }
  getQuizes() {
    if (typeof this.subjectId === 'string') {
      this.cancelSubFromQuizes = this.quizesService
        .getAllQuizes(this.subjectId)
        .subscribe({
          next: (res) => {
            this.quizes = res;
            if (this.quizes.length == 0) {
              this.isThereQuizes = false;
            }
          },
        });
    } else {
      this.cancelSubFromQuizes = this.quizesService.getAllQuizes().subscribe({
        next: (res) => {
          this.quizes = res;
          if (this.quizes.length == 0) {
            this.isThereQuizes = false;
          }
        },
      });
    }
  }
  ngOnInit(): void {
    this.getSubjectId();
    this.getQuizes();
  }
  ngOnDestroy(): void {
    this.cancelSubFromQuizes.unsubscribe();
  }
}
