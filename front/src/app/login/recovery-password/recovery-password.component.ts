import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastFactory} from "../../shared/toast-factory";
import {FormValidateUtils} from "../../shared/form-validate-utils";
import {AuthService} from "../../services/auth.service";
import {ApiMessage} from '../../model/pcvt-message';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  private formValidateUtils: FormValidateUtils;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
  }

  onSubmit() {
    if(this.form.valid) {
     this.authService.recoveryPassword(this.form.value).subscribe(
       data => {
         ToastFactory.successToast('Email sent! Check your inbox to reset your password');
         this.router.navigate(['/']);
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

}
