import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmModalComponent } from './../../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;

  constructor() { }

  ngOnInit() { }

  saveProject() {
    //save project

    //sucsess
    this.confirmModal.create("", "Project created successfuly.");
    this.confirmModal.openModal();
  }
}
