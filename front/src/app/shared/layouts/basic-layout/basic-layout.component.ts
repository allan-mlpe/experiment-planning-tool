import { ModalService } from './../../../services/modal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.css']
})
export class BasicLayoutComponent implements OnInit {

  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;

  constructor(private confirmModalService: ModalService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.confirmModalService.setConfirmModal(this.confirmModal);
  }
}
