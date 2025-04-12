import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubjectsListComponent } from '../subjects-list/subjects-list.component';

@Component({
  selector: 'app-home-page',
  imports: [SubjectsListComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  isAllSubjects: boolean = false;
  getAllSubjects() {
    this.isAllSubjects = true;
  }
}
