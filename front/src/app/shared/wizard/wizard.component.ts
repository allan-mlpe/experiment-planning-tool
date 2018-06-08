import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  @Input()
  propertyList: Array<any> = [];

  currentObject: any;
  currentObjectIndex: number;

  @Input()
  objValues: any = {};

  @Input()
  options: Array<any> = [];

  @Output()
  submitFormValues: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  nextItem() {
    this.currentObjectIndex+=1;
    this.currentObject = this.propertyList[this.currentObjectIndex];
  }

  previousItem() {
    this.currentObjectIndex-=1;
    this.currentObject = this.propertyList[this.currentObjectIndex];
  }

  getProgress() {
    const numerator: number = this.isObjectComplete() ? this.currentObjectIndex+1 : this.currentObjectIndex;
    const denominator: number = this.propertyList.length;
    const progress: number = numerator/denominator * 100;

    return {
      'width': `${progress}%`
    }
  }

  isObjectComplete(): boolean {
    return this.objValues[this.currentObject.key] !== undefined;
  }

  finish() {
    this.submitFormValues.emit(this.objValues);
  }

  ngOnInit() {
    this.currentObjectIndex = 0;
    this.currentObject = this.propertyList[this.currentObjectIndex];
  }

}
