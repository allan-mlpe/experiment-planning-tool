import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmModalComponent } from './../../shared/confirm-modal/confirm-modal.component';
import { FormValidateUtils } from '../../shared/form-validate-utils';

import { ProjectService } from './../../services/project.service';
import { Project } from './../../model/project';
import { Router } from '@angular/router';
import { ToastFactory } from '../../shared/toast-factory';
import { IFormCanDeactivate } from './../../guards/Iform-candeactivate';
import { ModalService } from './../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit, IFormCanDeactivate {

  form: FormGroup;
  private formValidateUtils: FormValidateUtils;

  /**
   * Subscription to listen changes in form
   */
  private subsc: Subscription;

  /**
   * Flag changes in form
   */
  private hasChanges: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private projectService: ProjectService, 
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit() { 
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['']
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
    this.subsc = this.form.valueChanges.subscribe(
      (data) => {
        this.hasChanges = true;

        // if a change already occurred, it's not necessary to keep the subscribe
        this.subsc.unsubscribe();
      }
    )
  }

  onSubmit() {
    if(this.form.valid) {
      const name = this.form.get('name').value;
      const description = this.form.get('description').value;

      const project = new Project(name, description);

      this.projectService.saveProject(project);

      ToastFactory.successToast("Project created!");

      this.router.navigate(['/projects']);

    } else {
      this.formValidateUtils.checkAllFields(this.form);
    }
    //save project

    //sucsess
    /*this.confirmModal.create("", "Project created successfuly.");
    this.confirmModal.openModal();*/
  }

  showError(field: string): boolean {
    return this.formValidateUtils.checkInvalidAndTouchedField(field);
  }

  buildErrorMessage(field: string): string {
    return this.formValidateUtils.buildErrorMessage(field);
  }
  
  addClassError(field: string) {
    let result = this.showError(field);
    return {
      invalid: result
    }
  }

  canDeactivateForm() {
    return !this.hasChanges || this.modalService.showUnsaveChangesModal();
  }

  onDestroy() {
    this.subsc.unsubscribe();
  }
}
