import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageMethodService } from '../../../shared/helper/local-storage-method.service';
import { Store } from '@ngrx/store';
import { setTokenAction } from '../../store/token.action';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  private readonly localStorage = inject(LocalStorageMethodService);
  private readonly store = inject(Store);
  storeToken(t: string): void {
    this.store.dispatch(setTokenAction({ value: t }));
  }
  getTokenFromLocalStorage() {
    const token = this.localStorage.myLocarStorage('getItem', 'token');
    if (typeof token === 'string') this.storeToken(jwtDecode(token));
  }
  ngOnInit(): void {
    this.getTokenFromLocalStorage();
  }
}
