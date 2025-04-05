import { Component } from '@angular/core';
import { QuizesListComponent } from '../quizes-list/quizes-list.component';

@Component({
  selector: 'app-home-page',
  imports: [QuizesListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  isAllSubjects: boolean = false;
  getAllSubjects() {
    this.isAllSubjects = true;
  }
}
