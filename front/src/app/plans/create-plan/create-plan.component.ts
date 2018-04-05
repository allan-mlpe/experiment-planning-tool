import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidateUtils} from '../../shared/form-validate-utils';

import {PlanService} from '../../services/plan.service';
import {Plan} from '../../model/plan';
import {Router} from '@angular/router';
import {ToastFactory} from '../../shared/toast-factory';
import {IFormCanDeactivate} from './../../guards/Iform-candeactivate';
import {ModalService} from './../../services/modal.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit, IFormCanDeactivate {

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
    private planService: PlanService,
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

      const plan = new Plan(name, description);

      this.planService.savePlan(plan);

      ToastFactory.successToast("Plan created!");

      this.router.navigate(['/plans']);

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
