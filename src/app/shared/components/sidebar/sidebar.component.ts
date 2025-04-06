import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('innerSidebar') innerSidebar!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  scrollAndMarginSidebarHandler(): void {
    if (scrollY <= 62) {
      console.log(window.scrollY);
      this.innerSidebar.nativeElement.style.margin = `${
        62 - window.scrollY
      }px 0 0 0`;
    } else {
      this.innerSidebar.nativeElement.style.margin = `0`;
    }
  }
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
