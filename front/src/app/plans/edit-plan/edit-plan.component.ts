import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {FormValidateUtils} from "../../shared/form-validate-utils";
import {ToastFactory} from "../../shared/toast-factory";
import {PcvtConstants} from "../../shared/pcvt-constants";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {ApiMessage} from "../../model/pcvt-message";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Plan} from "../../model/plan";
import {PlanService} from "../../services/plan.service";
import {IFormCanDeactivate} from "../../guards/Iform-candeactivate";

declare var $ :any;

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css', '../create-plan/create-plan.component.css']
})
export class EditPlanComponent implements OnInit, OnDestroy, IFormCanDeactivate {
  form: FormGroup;
  plan: Plan;

  private formValidateUtils: FormValidateUtils;

  /**
   * Subscription to listen changes in form
   */
  private subsc: Subscription;

  /**
   * Subscription to list changes in resolved data
   */
  private subsc2: Subscription;

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
    private route: ActivatedRoute,
    private modalService: ModalService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });

    this.subsc2 = this.route.data.subscribe(
      (info: {plan: Plan}) => {
        this.plan = info['plan'];
        this.detailsObject = this.plan.planDetails !== undefined ?
          JSON.parse(this.plan.planDetails) : this.buildDetailsObject();
      }
    );

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

  onSubmit() {
    if(this.form.valid) {
      this.plan.planDetails = JSON.stringify(this.detailsObject);

      this.planService.updatePlan(this.plan)
        .subscribe(
          data => {
            console.log(data);

            this.hasUnsavedChanges = false;
            ToastFactory.successToast("Plan updated!");

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

  private buildDetailsObject(): any {
    let obj: any = {};
    this.instrumentQuestions.forEach(item => {
      item.questions.forEach(question => {
        obj[question.key] = '';
      });
    });

    return obj;
  }

  isActiveLabel(value: string): any {
    return {
      'active': value !== null
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
    this.subsc2.unsubscribe();
  }
}
