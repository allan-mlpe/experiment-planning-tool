import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-characteristics-assessment',
  templateUrl: './characteristics-assessment.component.html',
  styleUrls: ['./characteristics-assessment.component.css']
})
export class CharacteristicsAssessmentComponent implements OnInit {

  @Output()
  onSubmitForm: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  options: Array<any> = [];

  @Input()
  multipleOptions: boolean = false;

  @Input()
  propertyList: Array<any> = [];

  @Input()
  values: Array<any> = [];

  @Input()
  valuesObj: any = {};

  @Input()
  assessmentObj: any = {};

  @Input()
  saving: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  emitForm(form: FormGroup) {
    this.onSubmitForm.emit({
      values: this.valuesObj,
      assessment: this.assessmentObj
    });
  }

}
