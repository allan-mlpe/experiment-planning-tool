import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidateUtils} from '../../shared/form-validate-utils';

import {PlanService} from '../../services/plan.service';
import {Plan} from '../../model/plan';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastFactory} from '../../shared/toast-factory';
import {IFormCanDeactivate} from './../../guards/Iform-candeactivate';
import {ModalService} from './../../services/modal.service';
import {Subscription} from 'rxjs';
import {ApiMessage} from "../../model/pcvt-message";
import {PcvtConstants} from "../../shared/pcvt-constants";
import {SIMPLE_OPTIONS} from "../../model/simple-options";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {PcvtUtils} from "../../shared/pcvt-utils";

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

  availableCollaborators: Array<User> = [];
  selectedCollaborators: Array<User> = [];

  private readonly CHARACTERIZATION_QUESTIONS = PcvtConstants.CHARACTERIZATION_QUESTIONS;
  options = SIMPLE_OPTIONS;

  saving: boolean = false;
  loading: boolean = false;

  getCharacterizationQuestionsObject(key: string): any {
    return this.CHARACTERIZATION_QUESTIONS.find(item => item['key'] === key);
  }

  constructor(
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService) { }

  ngOnInit() {
    $(document).ready(function() {
      $('.collapsible').collapsible();
      $('.tabs').tabs();
    });

    this.detailsObject = PcvtUtils.buildDetailsObject();

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(144)]],
      description: [''],
      collaborators: ['']
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
    this.subsc = this.form.valueChanges.subscribe(
      () => {
        this.hasUnsavedChanges = true;

        // if a change already occurred, it's not necessary to keep the subscribe
        this.subsc.unsubscribe();
      }
    );

    this.userService.getCollaborators()
      .finally(() => this.loading = false)
      .subscribe(
        (data: Array<User>) => {
          this.availableCollaborators = data;
        },
        (err: ApiMessage) => {
          console.log(err);
          ToastFactory.errorToast(err.message);
        });
  }

  selectItem(user, target) {
    const index: number = this.selectedCollaborators.indexOf(user);
    if(index !== -1) {
      this.selectedCollaborators.splice(index, 1);
    } else {
      this.selectedCollaborators.push(user);
    }

    if(this.selectedCollaborators.length === 0) {
      this.form.get('reviewers').setErrors({required: true});
    }
  }

  onSubmit() {
    this.saving = true;
    if(this.form.valid) {
      const name = this.form.get('name').value;
      const description = this.form.get('description').value;

      const plan = new Plan();
      plan.name = name;
      plan.description = description;
      plan.details = JSON.stringify(this.detailsObject);
      plan.characteristics = JSON.stringify(this.characteristicsObject);
      plan.collaborators = this.selectedCollaborators;

      this.planService.savePlan(plan)
        .finally(() => this.saving = false)
        .subscribe(
          (data: Plan) => {
            this.hasUnsavedChanges = false;
            ToastFactory.successToast("Plan created!");
            this.router.navigate([`/plans/edit/${data.id}`]);


            // if(PcvtUtils.isCharacterizationInstrumentComplete(this.characteristicsObject)) {
            //   this.showCompleteModal(data.id, data.name);
            // } else {
            //   this.router.navigate(['/plans']);
            // }
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

  showCompleteModal(planId: number, planName) {
    let subsc: Subscription = this.modalService.showModal("Characterization complete", `Do you want to classify the suggested threats for "${planName}" now?`, 'Yes', 'No')
      .subscribe(
        data => {
          if(data) {
            this.router.navigate([`/plans/${planId}/threats`]);
          } else {
            this.router.navigate(['/plans']);
          }
          subsc.unsubscribe();
        }
      );
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
