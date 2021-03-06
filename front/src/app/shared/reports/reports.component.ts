import {Component, Input, OnInit} from '@angular/core';
import {ThreatsService} from "../../services/threat.service";
import {ApiMessage} from "../../model/pcvt-message";
import {ActivatedRoute, Router} from "@angular/router";
import {PcvtUtils} from "../pcvt-utils";
import {Plan} from "../../model/plan";
import {Magnitude} from "../../model/magnitude.enum";
import {CharacteristicsService} from "../../services/characteristics.service";
import {ToastFactory} from "../toast-factory";

declare var $: any;

@Component({
  selector: 'app-generic-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  @Input()
  plan: Plan;

  @Input()
  entity: string;

  reportType: number;

  threatList: Array<any> = [];
  filteredList: Array<any> = [];

  customThreatList: Array<any> = [];
  filteredCustomThreatList: Array<any> = [];

  threatValuesObj: any = {};
  actionValuesObj: any = {};
  actionRelatedThreatsObj: any = {};
  filterObjList: Array<any> = PcvtUtils.getFilterList();
  private filterKeys: Array<string> = PcvtUtils.getFilterKeys();

  private showSuggestThreatsReport;

  constructor(
    private characteristicsService: CharacteristicsService,
    private threatsService: ThreatsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildScreen();

    if(this.plan.characteristics !== undefined) {
      const characteristics: any = JSON.parse(this.plan.characteristics);
      this.customThreatList = Object.values(JSON.parse(this.plan.customThreats));
      this.filteredCustomThreatList = Object.values(JSON.parse(this.plan.customThreats));

      const characteristicsKeys: Array<string> = PcvtUtils.getExperimentCharacteristicsKeys(characteristics);

      if(characteristicsKeys.length > 0) {
        this.characteristicsService.getThreatsByCharacteristicKeys({stringList: characteristicsKeys})
          .subscribe(
            data => {
              this.threatList = data;
              this.filteredList = data;

              if(this.plan.threats !== undefined)
                this.threatValuesObj = Object.assign(this.threatValuesObj, JSON.parse(this.plan.threats));

              if(this.plan.actions !== undefined)
                this.actionValuesObj = Object.assign(this.actionValuesObj, JSON.parse(this.plan.actions));

              if(this.plan.actionRelatedThreats !== undefined)
                this.actionRelatedThreatsObj = Object.assign(this.actionRelatedThreatsObj, JSON.parse(this.plan.actionRelatedThreats));

              this.processScreenObject();
            },
            (err: ApiMessage) => {
              console.log(err);
              ToastFactory.errorToast(err.message);
            }
          );
      }
    } else {
      ToastFactory.infoToast(`You must first define the characteristics of the ${this.entity}`);
      this.router.navigate(['../characteristics'], {relativeTo: this.route });
    }
  }

  setShowReport(value) {
    // reset filtered list
    if(this.reportType == 1) {
      this.filteredList = this.threatList;
      this.filterKeys = PcvtUtils.getFilterKeys();
    }

    this.reportType = value;
  }

  changeSelectValue(component) {
    const selectValue = document.getElementById('report-type')['value'];
    component.setShowReport(selectValue);
  }

  enableSuggestedThreats(): boolean {
    const characteristicsObj = this.plan.characteristics !== undefined ?
      JSON.parse(this.plan.characteristics) : {};
    return PcvtUtils.isCharacterizationInstrumentComplete(characteristicsObj);
  }

  enableClassifiedThreats() {
    if(this.showSuggestThreatsReport === undefined) {
      const threatsObj = this.plan.threats !== undefined ?
        JSON.parse(this.plan.threats) : {};

      const customThreatsObj = this.plan.customThreats !== undefined ?
        JSON.parse(this.plan.customThreats) : {};

      this.showSuggestThreatsReport = PcvtUtils.isThreatClassificationComplete(threatsObj)
          && PcvtUtils.isCustomThreatClassificationComplete(customThreatsObj);
    }

    return this.showSuggestThreatsReport;
  }

  enableDefinedControlActions() {
    return this.enableClassifiedThreats() && this.plan.actions !== undefined;
  }

  // filter functions
  selectFilter(filter) {
    const index = this.filterKeys.indexOf(filter);

    if(index === -1) {
      this.filterKeys.push(filter);
    } else {
      this.filterKeys.splice(index, 1);
    }

    this.filterThreatList();
  }

  private buildScreen() {
    const self = this;
    // init material select tag
    $(document).ready(function(){
      // fix material_select bug - it wasn't triggering change event.
      $('select').material_select(self.changeSelectValue.bind(this, self));
    });
  }

  private filterThreatList() {
    this.filteredList = this.threatList.filter(threat => this.filterKeys.indexOf(threat.magnitude) != -1);
    this.filteredCustomThreatList = this.customThreatList.filter(threat => this.filterKeys.indexOf(threat.magnitude) != -1)
  }

  private getControlActionList(threat): Array<any> {
    let controlActionList: Array<any> = [];
    threat.relatedControlActions.forEach(c => {
      const actionClassification = this.actionValuesObj[threat.key] !== undefined ?
        this.actionValuesObj[threat.key][c.key]: undefined;
      if(actionClassification !== undefined) {
        c['value'] = actionClassification;
        controlActionList.push(c);

        const relatedThreatsList = this.actionRelatedThreatsObj[c.key];
        let relatedThreats: Array<string> = [];
        if(relatedThreatsList != undefined) {
          relatedThreats = this.getRelatedThreatList(relatedThreatsList);
        }
        c['relatedThreats'] = relatedThreats
      }
    });

    return controlActionList;
  }

  private getRelatedThreatList(obj: any) {
    return Object.values(obj);
  }

  private getThreatMagnitude(classificationObj): Magnitude {
    const impact: number = classificationObj['impact'];
    const urgency: number = classificationObj['urgency'];
    const trend: number = classificationObj['trend'];

    return PcvtUtils.calculateThreatMagnitude(impact, urgency, trend);
  }

  private processScreenObject() {
    this.threatList.forEach(item => {
      const classificationObj = this.threatValuesObj[item.key];
      if(classificationObj !== undefined) {

        const calculatedMagnitude: Magnitude = this.getThreatMagnitude(classificationObj);
        const controlActionList: Array<any> = this.getControlActionList(item);

        item['magnitude'] = calculatedMagnitude;
        item['actions'] = controlActionList;
      }
    });

    this.customThreatList.forEach(item => {
      if(item !== undefined) {

        const calculatedMagnitude: Magnitude = this.getThreatMagnitude(item);
        const controlActionList: Array<any> = this.getControlActionList(item);

        item['magnitude'] = calculatedMagnitude;
      }
    });
  }

  countCheckedCustomActions(controlActions: Array<any>) {
    return controlActions.reduce((occurrences, item) => {
      let i = 0;
      if(item.checked) {
        i = 1;
      }
      return occurrences + i;
    }, 0);
  }

  printReport() {
    window.print();
  }
}
