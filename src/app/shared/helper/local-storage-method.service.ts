import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LocalStorageMethodes } from './local-storage-methods.type';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageMethodService {
  constructor() {}
  private readonly platformId = inject(PLATFORM_ID);
  myLocarStorage(
    method: LocalStorageMethodes,
    key: string = '',
    value: string = ''
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // if (method === 'setItem') {
      //   localStorage.setItem(key, value);
      //   return;
      // } else if (method === 'getItem') {
      //   return localStorage.getItem(key);
      // } else if (method === 'check') {
      //   return !!localStorage.getItem(key);
      // } else if (method === 'removeItem') {
      //   localStorage.removeItem(key);
      //   return;
      // } else if (method === 'clear') {
      //   localStorage.clear();
      // } else {
      //   return null;
      // }
      switch (method) {
        case 'setItem':
          localStorage.setItem(key, value);
          break;
        case 'getItem':
          return localStorage.getItem(key);
        case 'check':
          return !!localStorage.getItem(key);
        case 'removeItem':
          localStorage.removeItem(key);
          break;
        case 'clear':
          localStorage.clear();
          break;
        default:
          return null;
      }
    }

    return;
  }
}
