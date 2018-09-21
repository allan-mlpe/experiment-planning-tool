import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormValidateUtils} from "../form-validate-utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PcvtUtils} from "../pcvt-utils";

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

  editMode: boolean;

  private readonly RELATED_ACTIONS_LABEL = 'relatedControlActions';
  private oldThreat: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    /*$('.modal').modal({
      dismissible: false
    });*/

    this.form = this.formBuilder.group({
      label: ['', [Validators.required]],
      description: ['', [Validators.required]],
      threatType: ['', [Validators.required]],
      relatedControlActions: ['']
    });

    this.formValidateUtils = new FormValidateUtils(this.form);
  }

  submitNewThreat() {
    if(this.form.valid) {
      const actions = this.form.get('relatedControlActions').value;

      this.newThreat[this.RELATED_ACTIONS_LABEL] = [];

      if(actions !== null) {
        const actionsArr: Array<string> = actions.split(',');
        actionsArr.forEach(act => {
          const auxAction = act.trim();
          if(auxAction !== '')
            this.newThreat[this.RELATED_ACTIONS_LABEL].push({ label: act.trim() });

        });
      }

      if(!this.editMode) {
        this.newThreat['key'] = `CUS-${PcvtUtils.randomHashGenerator()}`;
        this.newThreatEvent.emit(this.newThreat);
      }

      this.closeModal();
    } else {
      this.formValidateUtils.checkAllFields(this.form);
    }
  }

  openModal(threat?: any) {
    this.form.reset();
    if(threat) {
      this.oldThreat = JSON.stringify(threat);
      this.editMode = true;
      this.newThreat = threat;
      this.form.patchValue(
        { 'relatedControlActions': this.customThreatActionsToString(threat)}
      );
    } else {
      this.editMode = false;
      this.form.reset();
    }

    $('#new-threat-modal').modal('open');
  }

  closeModal(discardChanges: boolean = false) {
    $('#new-threat-modal').modal('close');
    this.discardChanges(discardChanges);
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

  customThreatActionsToString(threat: any): string {
    let actionsStr: string = threat[this.RELATED_ACTIONS_LABEL].reduce((actionsStr, action) =>
      actionsStr + action['label'] + ', ', '');

    return actionsStr.replace(/(, *)*$/, '');
  }

  discardChanges(discardChanges: boolean) {
    if(discardChanges && this.editMode) {
      const oldObject = JSON.parse(this.oldThreat);
      this.newThreat['label'] = oldObject['label'];
      this.newThreat['description'] = oldObject['description'];
    }

    this.newThreat = {};
  }
}
