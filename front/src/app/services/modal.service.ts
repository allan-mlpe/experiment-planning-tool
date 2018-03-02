import { Injectable, ViewChild } from '@angular/core';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { Subscription } from 'rxjs';

@Injectable()
export class ModalService {

  confirmModal: ConfirmModalComponent;

  constructor() { 
  }

  setConfirmModal(confirmModal: ConfirmModalComponent) {
      this.confirmModal = confirmModal;
  }

  showUnsaveChangesModal() {
    this.confirmModal.create("Unsaved changes", "Do you want to quit without saving changes?");
    this.confirmModal.openModal();

    return this.confirmModal.confirm;
  }

  showModal(title: string, message: string) {
    this.confirmModal.create(title, message);
    this.confirmModal.openModal();

    return this.confirmModal.confirm;
  }
}
