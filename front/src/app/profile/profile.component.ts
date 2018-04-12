import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormValidateUtils} from "../shared/form-validate-utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IFormCanDeactivate} from "../guards/Iform-candeactivate";
import {ModalService} from "../services/modal.service";
import {Subscription} from "rxjs/Rx";
import {User} from "../model/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  loading: boolean = false;
  formValidateUtils: FormValidateUtils;
  hasUnsavedChanges: boolean = false;

  form: FormGroup;

  /**
   * Subscription to listen changes in form
   */
  private subsc: Subscription;

  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      institution: [''],
      email: ['', [Validators.required, Validators.email]],
      profileLink: [''],
      workArea: [''],
      isCollaborator: [false],
      isAvailable: [false]
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
    this.subsc = this.form.valueChanges.subscribe(
      (data) => {
        this.hasUnsavedChanges = true;

        // if a change already occurred, it's not necessary to keep the subscribe
        this.subsc.unsubscribe();
      }
    );
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }

  onSubmit() {
    console.log(this.form.value);
    console.log(this.user);
  }

  canDeactivateForm() {
    return !this.hasUnsavedChanges || this.modalService.showUnsaveChangesModal();
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

  autoFill(field: string): any {
    return {
      active: this.user[field] !== undefined
    }
  }
}
