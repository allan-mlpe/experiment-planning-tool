import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Credentials} from '../model/credentials';
import {AuthService} from '../services/auth.service';
import {ToastFactory} from '../shared/toast-factory';
import {FormValidateUtils} from '../shared/form-validate-utils';
import {User} from '../model/user';
import {ApiMessage} from '../model/pcvt-message';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private credentials: Credentials;
  loading: boolean = false;
  formValidateUtils: FormValidateUtils;

  form: FormGroup;

  constructor(
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
  }

  onSubmit() {
    if(this.form.valid) {
      this.loading = true;
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;

      this.credentials = new Credentials(email, password);

      this.authService.doLogin(this.credentials)
        .finally(() => this.loading = false)
        .subscribe(
        (data: User) => {
          this.router.navigate(['/dashboard']);
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
