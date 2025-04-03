import { Component, inject } from '@angular/core';
import { SidebarInputSearchService } from '../../services/sidebar-inputSearch.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly sidebarInputSearchService = inject(
    SidebarInputSearchService
  );
  openSideBar() {
    this.sidebarInputSearchService.isSidebarOpened.next(true);
  }
  openInputSearch() {
    this.sidebarInputSearchService.isSearchInputOpened.next(true);
  }
}
