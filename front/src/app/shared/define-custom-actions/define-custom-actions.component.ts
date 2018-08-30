import {Component, OnInit} from '@angular/core';
import {Magnitude} from "../../model/magnitude.enum";
import {ACTION_OPTIONS} from "../../model/action-options";

@Component({
  selector: 'app-define-custom-actions',
  templateUrl: './define-custom-actions.component.html',
  styleUrls: ['./define-custom-actions.component.css']
})
export class DefineCustomActionsComponent implements OnInit {

  actionObj: any = {};
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

  getProgress() {
    const numerator: number = this.currentObjectIndex+1;
    const denominator: number = this.filteredList.length;
    const progress: number = numerator/denominator * 100;

    return {
      'width': `${progress}%`
    }
  }

  selectAction(action) {
    const threatKey: string = this.currentObject.key;
    const key: string = action.key;

    if(this.actionObj[threatKey][key] !== undefined) {
      delete this.actionObj[threatKey][key];

      this.removeActionRelatedThreats(key);

    } else {

    }
  }

  classifyAction(action, value) {
    const threatKey: string = this.currentObject.key;
    const key: string = action.key;

    this.actionObj[threatKey][key] = value;
  }


  private removeActionRelatedThreats(actionKey: string) {

    // if(this.draft.actionRelatedThreats !== undefined) {
    //   if(actionKey in this.actionRelatedThreatsObj) {
    //     delete this.actionRelatedThreatsObj[actionKey];
    //
    //     //this.updateActionRelatedThreats(actionRelatedThreats);
    //   }
    // }
  }

}
