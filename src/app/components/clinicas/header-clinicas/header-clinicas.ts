import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { AnalyticsService } from '../../../services/analytics.service';

@Component({
  selector: 'app-header-clinicas',
  imports: [],
  templateUrl: './header-clinicas.html',
  styleUrl: './header-clinicas.scss',
})
export class HeaderClinicas {
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
      event_label: 'Fale Conosco - Header Clínicas',
      button_location: 'header_clinicas',
    });

    this.modalService.openBudgetModal();
    this.closeMobileMenu();
  }
}
