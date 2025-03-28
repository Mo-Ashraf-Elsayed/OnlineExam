import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserEmailService {
  userEmail: WritableSignal<string> = signal('');
  constructor() {}
}
