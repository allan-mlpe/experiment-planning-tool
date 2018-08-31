import {Component, Input, OnInit} from '@angular/core';
import {Magnitude} from "../../model/magnitude.enum";
import {ACTION_OPTIONS} from "../../model/action-options";
import {PcvtUtils} from "../pcvt-utils";

@Component({
  selector: 'app-define-custom-actions',
  templateUrl: './define-custom-actions.component.html',
  styleUrls: ['./define-custom-actions.component.css']
})
export class DefineCustomActionsComponent implements OnInit {

  @Input()
  customThreatsObj: any = {};

  currentObject: any;
  currentObjectIndex: number;

  private filterKeys: Array<string> = [Magnitude.VERY_HIGH, Magnitude.HIGH, Magnitude.MODERATE, Magnitude.LOW, Magnitude.VERY_LOW];
  filterObjList: Array<any> = [
    { name: 'veryHigh', value: Magnitude.VERY_HIGH },
    { name: 'high', value: Magnitude.HIGH },
    { name: 'moderate', value: Magnitude.MODERATE },
    { name: 'low', value: Magnitude.LOW },
    { name: 'veryLow', value: Magnitude.VERY_LOW},
  ];

  filteredList: Array<any> = [];
  threatList: Array<any> = [];
  options: Array<any> = ACTION_OPTIONS;

  constructor() { }

  ngOnInit() {
    this.threatList = Object.values(this.customThreatsObj);
    this.filteredList = Object.values(this.customThreatsObj);

    if(this.filteredList.length > 0) {
      this.initCurrentObject();
      this.processThreatMagnitude();
    }

  }

  selectFilter(filter) {
    const index = this.filterKeys.indexOf(filter);

    if(index === -1) {
      this.filterKeys.push(filter);
    } else {
      this.filterKeys.splice(index, 1);
    }

    this.filterThreatList();
    this.initCurrentObject();
  }

  private filterThreatList() {
    this.filteredList = this.threatList.filter(threat => this.filterKeys.indexOf(threat.magnitude) != -1);
  }

  initCurrentObject() {
    this.currentObjectIndex = 0;
    this.currentObject = this.filteredList[this.currentObjectIndex];
  }

  nextItem() {
    if(this.currentObjectIndex !== this.filteredList.length-1) {
      this.currentObjectIndex+=1;
      this.currentObject = this.filteredList[this.currentObjectIndex];
    }
  }

  previousItem() {
    if(this.currentObjectIndex !== 0) {
      this.currentObjectIndex-=1;
      this.currentObject = this.filteredList[this.currentObjectIndex];
    }
  }

  getProgress() {
    const numerator: number = this.currentObjectIndex+1;
    const denominator: number = this.filteredList.length;
    const progress: number = numerator/denominator * 100;

    return {
      'width': `${progress}%`
    }
  }

  selectAction(action) {
    action['checked'] = !action['checked'];
  }

  classifyAction(action, value) {
    action['importance'] = value;
  }

  private processThreatMagnitude() {
    this.threatList.forEach(item => {
      const impact: number = item['impact'];
      const urgency: number = item['urgency'];
      const trend: number = item['trend'];

      const calculatedMagnitude: Magnitude = PcvtUtils.calculateThreatMagnitude(impact, urgency, trend);

      item['magnitude'] = calculatedMagnitude;
    });
  }

}
