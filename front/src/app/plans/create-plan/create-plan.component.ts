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
import {SIMPLE_OPTIONS} from "../../model/simple-options";

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
  characteristicsObject: any = {};

  instrumentQuestions = PcvtConstants.INSTRUMENT_QUESTIONS;

  private readonly CHARACTERIZATION_QUESTIONS = PcvtConstants.CHARACTERIZATION_QUESTIONS;
  options = SIMPLE_OPTIONS;

  saving: boolean = false;

  getCharacterizationQuestionsObject(key: string): any {
    return this.CHARACTERIZATION_QUESTIONS.find(item => item['key'] === key);
  }

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
      name: ['', [Validators.required, Validators.maxLength(1024)]],
      description: ['']
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
    this.subsc = this.form.valueChanges.subscribe(
      () => {
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
    this.saving = true;
    if(this.form.valid) {
      const name = this.form.get('name').value;
      const description = this.form.get('description').value;

      const plan = new Plan();
      plan.name = name;
      plan.description = description;
      plan.planDetails = JSON.stringify(this.detailsObject);
      plan.planCharacteristics = JSON.stringify(this.characteristicsObject);

      this.planService.savePlan(plan)
        .finally(() => this.saving = false)
        .subscribe(
          data => {
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
