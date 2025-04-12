import { Component, Input } from '@angular/core';
import { SubjectObj } from '../../models/interface/all-subjects.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subject-card',
  imports: [RouterLink],
  templateUrl: './subject-card.component.html',
  styleUrl: './subject-card.component.scss',
})
export class SubjectCardComponent {
  @Input() subjectObj: SubjectObj = {} as SubjectObj;
}
