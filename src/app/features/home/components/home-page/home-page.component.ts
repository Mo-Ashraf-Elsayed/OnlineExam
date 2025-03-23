import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  token$!: Observable<string>;
  constructor(private store: Store<{ token: string }>) {}
  initToken(): void {
    this.token$ = this.store.select('token');
  }
  ngOnInit(): void {
    this.initToken();
  }
}
