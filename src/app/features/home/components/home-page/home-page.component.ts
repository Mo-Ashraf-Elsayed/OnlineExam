import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DecodedToken } from '../../../../core/auth/models/decoded-token';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private readonly store = inject(Store);
  token$!: Observable<DecodedToken>;
  id: string = '';
  initToken(): void {
    this.token$ = this.store.select('token');
  }
  ngOnInit(): void {
    this.initToken();
  }
}
