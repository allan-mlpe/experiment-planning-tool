import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormValidateUtils} from "../shared/form-validate-utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IFormCanDeactivate} from "../guards/Iform-candeactivate";
import {ModalService} from "../services/modal.service";
import {Subscription} from "rxjs/Rx";
import {User} from "../model/user";
import {UserService} from "../services/user.service";
import {ApiMessage} from "../model/pcvt-message";
import {ToastFactory} from "../shared/toast-factory";
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  loading: boolean = false;
  hasUnsavedChanges: boolean = false;

  formValidateUtils: FormValidateUtils;
  form: FormGroup;

  /**
   * Subscription to listen changes in form
   */
  private subsc: Subscription;

  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private userService: UserService
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
    if(this.form.valid) {
      this.loading = true;

      this.userService.updateUser(this.user)
        .finally(() => this.loading = false)
        .subscribe(
          (data: User) => {
            ToastFactory.successToast('User successfully updated');
          },
          (err: ApiMessage) => {
            console.log(err);
            ToastFactory.errorToast(err.message);
          }
      );

    } else {
      this.formValidateUtils.checkAllFields(this.form);
    }
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
