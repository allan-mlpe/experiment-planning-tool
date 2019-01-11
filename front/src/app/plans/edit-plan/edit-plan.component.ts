import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {FormValidateUtils} from "../../shared/form-validate-utils";
import {ToastFactory} from "../../shared/toast-factory";
import {PcvtConstants} from "../../shared/pcvt-constants";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs/Rx";
import {ApiMessage} from "../../model/pcvt-message";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Plan} from "../../model/plan";
import {PlanService} from "../../services/plan.service";
import {IFormCanDeactivate} from "../../guards/Iform-candeactivate";
import {SIMPLE_OPTIONS} from "../../model/simple-options";
import {PcvtUtils} from "../../shared/pcvt-utils";

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
  characteristicsObject: any = {};

  instrumentQuestions = PcvtConstants.INSTRUMENT_QUESTIONS;

  private readonly CHARACTERIZATION_QUESTIONS = PcvtConstants.CHARACTERIZATION_QUESTIONS;
  options = SIMPLE_OPTIONS;

  saving: boolean = false;
  completing: boolean = false;

  private readonly AUTO_SAVE_TIMEOUT: number = 30 * 1000; // in milliseconds

  getCharacterizationQuestionsObject(key: string): any {
    return this.CHARACTERIZATION_QUESTIONS.find(item => item['key'] === key);
  }

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
        this.detailsObject = this.plan.details !== undefined ?
          JSON.parse(this.plan.details) : PcvtUtils.buildDetailsObject();

        if(this.plan.characteristics !== undefined)
          this.characteristicsObject = JSON.parse(this.plan.characteristics);
      }
    );

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(1024)]],
      description: ['']
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
    this.subsc = this.form.valueChanges.subscribe(
      () => {
        this.hasUnsavedChanges = true;
        // if a change already occurred, it's not necessary to keep the subscribe
        //this.subsc.unsubscribe();
      }
    );

    // enable auto-saving every 30s
    Observable.interval(this.AUTO_SAVE_TIMEOUT).subscribe(
      () => this.autoSave()
    );
  }

  onSubmit() {
    this.saving = true;
    if(this.form.valid) {
      this.plan.details = JSON.stringify(this.detailsObject);
      this.plan.characteristics = JSON.stringify(this.characteristicsObject);

      this.planService.updatePlan(this.plan)
        .finally(() => this.saving = false)
        .subscribe(
          () => {
            this.hasUnsavedChanges = false;
            ToastFactory.successToast("Plan updated!");

            if(PcvtUtils.isCharacterizationInstrumentComplete(this.characteristicsObject)) {
              this.showCompleteModal();
            } else {
              this.router.navigate(['/plans']);
            }
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

  autoSave() {
    if(this.form.valid && this.hasUnsavedChanges) {
      this.plan.details = JSON.stringify(this.detailsObject);
      this.plan.characteristics = JSON.stringify(this.characteristicsObject);

      this.planService.updatePlan(this.plan)
        .subscribe(
          () => {},
          (err: ApiMessage) => {
            ToastFactory.errorToast('Error while saving progress automatically.');
            console.log(err);
          }
        );
    }
  }

  saveAndComplete() {
    this.completing = true;
    this.plan.state = 'ReadyToReview';
    this.planService.updateStatus(this.plan)
      .finally(() => this.completing = false)
      .subscribe(
        () => {
        ToastFactory.successToast("Plan ready to review!");
        this.onSubmit();
      },
      (err: ApiMessage) => {
        this.hasUnsavedChanges = false;
        ToastFactory.errorToast(err.message);
        console.log(err);
    });
  }

  showCompleteModal() {
    let subsc: Subscription = this.modalService.showModal("Characterization complete", `Do you want to classify the suggested threats for "${this.plan.name}" now?`, 'Yes', 'No')
      .subscribe(
        data => {
          if(data) {
            this.router.navigate([`/plans/${this.plan.id}/threats`]);
          } else {
            this.router.navigate(['/plans']);
          }
          subsc.unsubscribe();
        }
      );
  }

  enableSaveAndComplete() {
    const isCharacterizationComplete = PcvtUtils.isCharacterizationInstrumentComplete(this.characteristicsObject);
    const isPlanningComplete = PcvtUtils.isPlanningInstrumentComplete(this.detailsObject);

    return isCharacterizationComplete && isPlanningComplete;
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
