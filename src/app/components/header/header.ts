import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMobileMenuOpen = false;

  constructor(
    private modalService: ModalService,
    private analyticsService: AnalyticsService,
  ) {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  openBudgetModal(event: Event) {
    event.preventDefault();

    // Rastrear clique no botão do header
    this.analyticsService.trackEvent('header_cta_click', {
      event_category: 'engagement',
      event_label: 'Fale Conosco - Header',
      button_location: 'header',
    });

    this.modalService.openBudgetModal();
    this.closeMobileMenu();
  }
}
