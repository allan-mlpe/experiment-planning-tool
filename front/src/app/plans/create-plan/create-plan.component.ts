import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidateUtils} from '../../shared/form-validate-utils';

import {PlanService} from '../../services/plan.service';
import {Plan} from '../../model/plan';
import {Router} from '@angular/router';
import {ToastFactory} from '../../shared/toast-factory';
import {IFormCanDeactivate} from './../../guards/Iform-candeactivate';
import {ModalService} from './../../services/modal.service';
import {Subscription} from 'rxjs';
import {ApiMessage} from "../../model/pcvt-message";
import {PcvtConstants} from "../../shared/pcvt-constants";

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  form: FormGroup;
  private formValidateUtils: FormValidateUtils;

  /**
   * Subscription to listen changes in form
   */
  private subsc: Subscription;

  /**
   * Flag changes in form
   */
  private hasUnsavedChanges: boolean = false;

  detailsObject: any = {};


  instrumentQuestions = PcvtConstants.INSTRUMENT_QUESTIONS;

  constructor(
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });

    this.buildDetailsObject();

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['']
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
    this.subsc = this.form.valueChanges.subscribe(
      (data) => {
        this.hasUnsavedChanges = true;

        // if a change already occurred, it's not necessary to keep the subscribe
        this.subsc.unsubscribe();
      }
    )
  }

  buildDetailsObject() {
    this.instrumentQuestions.forEach(section => {
      section.questions.forEach(question => {
        this.detailsObject[question.projectKey] = '';
      })
    });
  }

  onSubmit() {
    if(this.form.valid) {
      const name = this.form.get('name').value;
      const description = this.form.get('description').value;

      const plan = new Plan(name, description);
      plan.planDetails = JSON.stringify(this.detailsObject);

      this.planService.savePlan(plan)
        .subscribe(
          data => {
            console.log(data);

            this.hasUnsavedChanges = false;
            ToastFactory.successToast("Plan created!");

            this.router.navigate(['/plans']);
          },
          (err: ApiMessage) => {
            this.hasUnsavedChanges = false;
            ToastFactory.errorToast(err.message);
            console.log(err);
          }
        );
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
    return !this.hasUnsavedChanges || this.modalService.showUnsaveChangesModal();
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
