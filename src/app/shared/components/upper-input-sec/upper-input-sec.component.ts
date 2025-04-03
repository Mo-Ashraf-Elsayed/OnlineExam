import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SubmitBtnComponent } from '../../../core/auth/components/submit-btn/submit-btn.component';
import { SidebarInputSearchService } from '../../services/sidebar-inputSearch.service';

@Component({
  selector: 'app-upper-input-sec',
  imports: [SubmitBtnComponent, AsyncPipe],
  templateUrl: './upper-input-sec.component.html',
  styleUrl: './upper-input-sec.component.scss',
})
export class UpperInputSecComponent {
  readonly sidebarInputSearchService = inject(SidebarInputSearchService);
  onDocumentClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.tagName.toLowerCase() === 'section') {
      this.sidebarInputSearchService.isSearchInputOpened.next(false);
    }
  }
}
