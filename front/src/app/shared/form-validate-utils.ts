import {AbstractControl, FormGroup} from '@angular/forms';

export class FormValidateUtils {
    private form: FormGroup;
    constructor(form: FormGroup) {
        this.form = form;
    }

    checkAllFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(
          field => {
            const control = formGroup.get(field);
            control.markAsTouched();

            if(control instanceof FormGroup) {
              this.checkAllFields(control);
            }
          }
        );
    }

    checkInvalidAndTouchedField(field: string): boolean {
        return this.form.get(field).invalid && this.form.get(field).touched;
    }

    buildErrorMessage(field: string): string {
        let messages: Array<string> = [];
        let errors = this.form.get(field).errors;

        if(errors !== null) {
            if(errors.required) {
                messages.push('this field is required');
            } else if(errors.maxlength) {
                messages.push(`this field maximum length must be ${errors.maxlength.requiredLength}`);
            } else if(errors.minlength) {
                messages.push('this field must be at least 6 characters');
            } else if(errors.email) {
                messages.push('insert a valid email');
            } else if(errors.matchPassword) {
                messages.push('passwords don\'t match');
            }
        }

        return messages.join(', ');
    }

    static matchPassword(abstractControl: AbstractControl) {
      let password = abstractControl.get('password').value;
      let confirmPassword = abstractControl.get('confirmPassword').value;
      if(password != confirmPassword) {
        abstractControl.get('confirmPassword').setErrors( {matchPassword: true} )
      } else {
        return null
      }
    }
}
