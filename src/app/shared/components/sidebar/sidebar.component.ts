import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarInputSearchService } from '../../services/sidebar-inputSearch.service';
import { LocalStorageMethodService } from '../../helper/local-storage-method.service';

@Component({
  selector: 'app-sidebar',
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly localStorageMethodService = inject(
    LocalStorageMethodService
  );
  private readonly router = inject(Router);
  readonly sidebarInputSearchService = inject(SidebarInputSearchService);
  closeSideBar() {
    this.sidebarInputSearchService.isSidebarOpened.next(false);
  }
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.tagName.toLowerCase() === 'aside') {
      this.sidebarInputSearchService.isSidebarOpened.next(false);
    }
  }
  logOut(): void {
    this.localStorageMethodService.myLocarStorage('removeItem', 'token');
    this.router.navigate(['/signin']);
  }
}
