import {Injectable} from '@angular/core';
import {ConfirmModalComponent} from '../shared/confirm-modal/confirm-modal.component';

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

  showModal(title: string, message: string, confirmButton: string = 'OK', dismissButton: string = 'CANCEL') {
    this.confirmModal.create(title, message, confirmButton, dismissButton);
    this.confirmModal.openModal();

    return this.confirmModal.confirm;
  }

  showModalHTMLContent(title: string, htmlContent: string, confirmButton: string = 'OK', dismissButton: string = 'CANCEL') {
    this.confirmModal.createHTMLContent(title, htmlContent, confirmButton, dismissButton);
    this.confirmModal.openModal();

    return this.confirmModal.confirm;
  }
}
