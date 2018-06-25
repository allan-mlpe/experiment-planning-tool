import {Component, OnInit} from '@angular/core';
import {FormValidateUtils} from "../../shared/form-validate-utils";
import {Draft} from "../../model/draft";
import {DraftService} from "../../services/draft.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {ApiMessage} from "../../model/pcvt-message";
import {ToastFactory} from "../../shared/toast-factory";
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import {IFormCanDeactivate} from "../../guards/Iform-candeactivate";

@Component({
  selector: 'app-edit-draft',
  templateUrl: './edit-draft.component.html',
  styleUrls: ['./edit-draft.component.css']
})
export class EditDraftComponent implements OnInit, IFormCanDeactivate {

  form: FormGroup;
  draft: Draft;
  saving: boolean = false;
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

  constructor(
    private formBuilder: FormBuilder,
    private draftService: DraftService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService) { }

  ngOnInit() {

    this.subsc2 = this.route.data.subscribe(
      (info: {draft: Draft}) => {
        this.draft = info['draft'];

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
        this.subsc.unsubscribe();
      }
    )
  }

  onSubmit() {
    this.saving = true;
    if(this.form.valid) {

      this.draftService.updateDraft(this.draft)
        .finally(() => this.saving = false)
        .subscribe(
          () => {
            this.hasUnsavedChanges = false;
            ToastFactory.successToast("Draft updated!");

            this.router.navigate(['/drafts']);
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
