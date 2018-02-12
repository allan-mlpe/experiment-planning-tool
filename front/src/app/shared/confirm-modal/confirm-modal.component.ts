import { Component, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {
    
  }

  ngOnInit() {
    $('.modal').modal();
  }

  create(title: string, message: string) {
    this.title = title;
    this.message = message;
    
    // fix ExpressionChangedAfterItHasBeenCheckedError problem
    this.cdr.detectChanges();
  }

  openModal() {
    $('#modal1').modal('open');
  }
  closeModal() {
    $('#modal1').modal('close');
  }
}
