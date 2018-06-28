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
import {ActivatedRoute} from "@angular/router";
import {Credentials} from "../model/credentials";

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  loading: boolean = false;
  reseting: boolean = false;
  hasUnsavedChanges: boolean = false;

  formValidateUtils: FormValidateUtils;
  passFormValidateUtils: FormValidateUtils;
  form: FormGroup;
  passForm: FormGroup;

  /**
   * Subscription to listen changes in form
   */
  private subsc: Subscription;

  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.tabs').tabs({
        //swipeable: true
      });
    });

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

    this.passForm = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: FormValidateUtils.matchPassword
      });

    this.passFormValidateUtils = new FormValidateUtils(this.passForm);

    this.route.data.subscribe(
      (info) => {
        this.user = info['user'];
      }
    );
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }

  updateUser() {
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

  changePassword() {
    this.reseting = true;

    if(this.passForm.valid) {
      const password = this.passForm.get('password').value;
      const credentials = new Credentials(this.user.email, password);

      this.userService.updateUserPassword(this.user.id, credentials)
        .finally(() => this.reseting = false)
        .subscribe(
          data => {
            console.log(data);
            ToastFactory.successToast('Password successfully updated');
            this.passForm.reset();
          },
          (err: ApiMessage) => {
            console.log(err);
            ToastFactory.errorToast(err.message);
          }
        );
    } else {
      this.passFormValidateUtils.checkAllFields(this.passForm);
    }
  }

  canDeactivateForm() {
    return !this.hasUnsavedChanges || this.modalService.showUnsaveChangesModal();
  }

  showError(field: string, formValidateUtils: FormValidateUtils): boolean {
    return formValidateUtils.checkInvalidAndTouchedField(field);
  }

  buildErrorMessage(field: string, formValidateUtils: FormValidateUtils): string {
    return formValidateUtils.buildErrorMessage(field);
  }

  addClassError(field: string, formValidateUtils: FormValidateUtils) {
    let result = this.showError(field, formValidateUtils);
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
