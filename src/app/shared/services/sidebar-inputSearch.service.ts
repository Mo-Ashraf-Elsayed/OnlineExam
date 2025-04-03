import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarInputSearchService {
  isSidebarOpened = new Subject<boolean>();
  isSearchInputOpened = new Subject<boolean>();
}
