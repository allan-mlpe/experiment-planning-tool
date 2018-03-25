import {AbstractControl, FormGroup} from '@angular/forms';

export class FormValidateUtils {
    private form: FormGroup;
    constructor(form: FormGroup) {
        this.form = form;
    }

    checkAllFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(
          campo => {
            console.log(campo);
            const controle = formGroup.get(campo);
            controle.markAsDirty();

            if(controle instanceof FormGroup) {
              this.checkAllFields(controle);
            }
          }
        );
    }

    checkInvalidAndTouchedField(field: string): boolean {
        return this.form.get(field).invalid && (this.form.get(field).touched || this.form.get(field).dirty);
    }

    buildErrorMessage(field: string): string {
        let messages: Array<string> = [];
        let errors = this.form.get(field).errors;

        if(errors !== null) {
            if(errors.required) {
                messages.push('this field is required');
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
