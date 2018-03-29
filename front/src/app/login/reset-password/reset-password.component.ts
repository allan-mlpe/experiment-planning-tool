import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidateUtils} from "../../shared/form-validate-utils";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiMessage} from "../../model/pcvt-message";
import {ToastFactory} from "../../shared/toast-factory";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private formValidateUtils: FormValidateUtils;
  private token: string;
  private subsc: Subscription;
  form: FormGroup;
  loading: boolean = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.subsc = this.route.queryParams.subscribe(
      queryParams => {
        this.token = queryParams['rt'];

        if(this.token === undefined) {
          ToastFactory.errorToast('You have no reset token, request a new one');
          this.router.navigate(['/login/recovery']);
        }
      }
    );

    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    },
      {
        validator: FormValidateUtils.matchPassword
      });

    this.formValidateUtils = new FormValidateUtils(this.form);
  }

  onSubmit() {
    if(this.form.valid) {
      this.loading = true;

      const payload = {
        'token': this.token,
        'password': this.form.get('password').value
      };

      console.log(payload);

      this.authService.resetPassword(payload)
        .finally(() => this.loading = false)
        .subscribe(
        (data: ApiMessage) => {
          ToastFactory.successToast(data.message);
          this.router.navigate(['/login']);
        },
        (err: ApiMessage) => {
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

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
