import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  constructor(private modalService: ModalService) {}

  openBudgetModal(event: Event) {
    event.preventDefault();
    this.modalService.openBudgetModal();
  }

  scrollToSolutions(event: Event) {
    event.preventDefault();
    const solutionsSection = document.getElementById('solucoes');
    if (solutionsSection) {
      solutionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
