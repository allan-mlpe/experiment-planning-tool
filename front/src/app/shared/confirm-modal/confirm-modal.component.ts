import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  title: string;
  message: string;
  confirmButton: string;
  dismissButton: string;

  confirm: EventEmitter<boolean> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    $('.modal').modal({
      dismissible: false
    });
  }

  create(title: string, message: string, confirmButton: string = 'OK', dismissButton: string = 'CANCEL') {
    this.title = title;
    this.message = message;
    this.confirmButton = confirmButton;
    this.dismissButton = dismissButton;

    // fix ExpressionChangedAfterItHasBeenCheckedError problem
    this.cdr.detectChanges();
  }

  openModal() {
    $('#modal1').modal('open');
  }

  closeModal() {
    $('#modal1').modal('close');
  }

  sendConfirmEvent() {
    this.confirm.emit(true);
  }

  sendUnconfirmEvent() {
    this.confirm.emit(false);
  }
}
