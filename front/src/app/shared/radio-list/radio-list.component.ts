import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-list',
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.css']
})
export class RadioListComponent implements OnInit {
  @Output()
  onSubmitForm: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  options: Array<any> = [];

  @Input()
  propertyList: Array<any> = [];

  @Input()
  valuesObj: any = {};

  constructor() { }

  ngOnInit() {
  }

  emitForm(form: FormGroup) {
    this.onSubmitForm.emit(this.valuesObj);
  }

  isChecked(property: any, option: any): boolean {

    //isissoosaoks
    return property['value'] === option['value'];
  }

  updateChecked(property, radio) {
    property['value'] = radio['value'];
  }
}
