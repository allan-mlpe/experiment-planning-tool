import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidateUtils} from "../../shared/form-validate-utils";
import {Router} from "@angular/router";
import {ToastFactory} from "../../shared/toast-factory";
import {ApiMessage} from "../../model/pcvt-message";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  user: User = new User();
  private formValidateUtils: FormValidateUtils;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
  }

  onSubmit() {
    if(this.form.valid) {
      this.loading = true;
      this.userService.createUser(this.user)
        .finally(() => this.loading = false)
        .subscribe(
          data => {
            ToastFactory.successToast('Account created! Check your inbox');
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
