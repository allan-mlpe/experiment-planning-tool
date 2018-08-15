import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PcvtUtils} from "../pcvt-utils";

@Component({
  selector: 'app-threat-classification',
  templateUrl: './threat-classification.component.html',
  styleUrls: ['./threat-classification.component.css']
})
export class ThreatClassificationComponent implements OnInit {

  options: Array<any> = [
    {name: 'Impact', hint: 'Perspective of the intensity or impact that a threat can cause the results of the experiment'},
    {name: 'Urgency', hint: 'Degree of urgency of the resolution'},
    {name: 'Trend', hint: 'Trend of the identified risk situation'}
  ];
  values = [1, 2, 3];


  @Input()
  threatList: Array<any> = [];

  @Input()
  threatObj: any = {};

  @Output()
  submitThreatObject: EventEmitter<any> = new EventEmitter<any>();


  @Input()
  saving: boolean = false;

  @Input()
  loading: boolean = true;

  @Input()
  showInfoPanel: boolean;

  constructor() { }

  ngOnInit() {
  }

  submitThreatObj() {
    this.submitThreatObject.emit(this.threatObj);
  }

  startClassification() {
    this.showInfoPanel = false;
  }

  getScaleTips() {
    return PcvtUtils.getHTMLListAsString(this.options);
  }
}
