import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlanService} from "../../services/plan.service";
import {Router} from "@angular/router";
import {FormValidateUtils} from "../../shared/form-validate-utils";
import {Subscription} from "rxjs/Rx";
import {ToastFactory} from "../../shared/toast-factory";
import {ApiMessage} from "../../model/pcvt-message";
import {IFormCanDeactivate} from "../../guards/Iform-candeactivate";

@Component({
  selector: 'app-create-custom-plan',
  templateUrl: './create-custom-plan.component.html',
  styleUrls: ['./create-custom-plan.component.css']
})
export class CreateCustomPlanComponent implements OnInit, IFormCanDeactivate {

  file: File;

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

  saving: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(144)]],
      description: [''],
      file: [null, [Validators.required]]
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

  handleSelectedFile(files: FileList) {
    this.file = files.item(0);
  }

  onSubmit() {
    this.saving = true;
    if(this.form.valid) {

      let formData: FormData = new FormData();
      formData.append('file', this.file, this.file.name);
      formData.append('name', this.form.get('name').value);
      formData.append('description', this.form.get('description').value)

      this.planService.saveCustomPlan(formData)
        .finally(() => this.saving = false)
        .subscribe(
          data => {
            this.hasUnsavedChanges = false;
            ToastFactory.successToast("Plan created and ready to review!");

            this.router.navigate(['/reviews/ready-to-review']);
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
