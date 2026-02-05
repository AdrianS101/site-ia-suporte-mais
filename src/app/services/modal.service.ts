import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private budgetModalSubject = new BehaviorSubject<boolean>(false);
  budgetModal$ = this.budgetModalSubject.asObservable();

  openBudgetModal() {
    this.budgetModalSubject.next(true);
  }

  closeBudgetModal() {
    this.budgetModalSubject.next(false);
  }
}
