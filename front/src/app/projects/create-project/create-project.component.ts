import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfirmModalComponent } from './../../shared/confirm-modal/confirm-modal.component';
import { FormValidateUtils } from '../../shared/form-validate-utils';

import { ProjectService } from './../../services/project.service';
import { Project } from './../../model/project';
import { Router } from '@angular/router';
import { ToastFactory } from '../../shared/toast-factory';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;

  form: FormGroup;
  private formValidateUtils: FormValidateUtils;

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService, private router: Router) { }

  ngOnInit() { 
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['']
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
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
}
