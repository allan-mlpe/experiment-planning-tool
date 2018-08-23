import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormValidateUtils} from "../form-validate-utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare var $ :any;

@Component({
  selector: 'app-custom-threat-modal',
  templateUrl: './custom-threat-modal.component.html',
  styleUrls: ['./custom-threat-modal.component.css']
})
export class CustomThreatModalComponent implements OnInit {

  formValidateUtils: FormValidateUtils;
  form: FormGroup;

  @Output()
  newThreatEvent: EventEmitter<any> = new EventEmitter<any>();

  newThreat: any = {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    /*$('.modal').modal({
      dismissible: false
    });*/

    this.form = this.formBuilder.group({
      label: ['', [Validators.required]],
      description: ['', [Validators.required]],
      relatedControlActions: ['']
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
  }

  submitNewThreat() {
    if(this.form.valid) {

      const actions = this.form.get('relatedControlActions').value;
      if(actions !== null) {
        this.newThreat['relatedControlActions'] = [];

        const actionsArr: Array<string> = actions.split(',');
        actionsArr.forEach(act => {
          const auxAction = { label: act.trim() };
          this.newThreat['relatedControlActions'].push(auxAction);
        });
      }

      console.log(this.newThreat);
      this.newThreatEvent.emit(this.newThreat);

    } else {
      this.formValidateUtils.checkAllFields(this.form);
    }
  }

  openModal() {
    this.newThreat = {};
    this.form.reset();
    $('#new-threat-modal').modal('open');
  }

  closeModal() {
    $('#new-threat-modal').modal('close');
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
