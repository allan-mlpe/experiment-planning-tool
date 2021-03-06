import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

declare var $: any;

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
  multipleOptions: boolean = false;

  @Input()
  propertyList: Array<any> = [];

  @Input()
  values: Array<any> = [];

  @Input()
  valuesObj: any = {};

  @Input()
  saving: boolean = false;

  @Input()
  showNotClassifiedItems: boolean

  constructor() { }

  ngOnInit() {
  }

  emitForm(form: FormGroup) {
    this.onSubmitForm.emit(this.valuesObj);
  }

  getItemClass(value) {
    return {
      'not-checked-threat': this.showNotClassifiedItems && value === undefined
    }
  }
}
