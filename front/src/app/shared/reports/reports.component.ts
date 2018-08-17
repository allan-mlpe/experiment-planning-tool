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

  threatValuesObj: any = {};
  actionValuesObj: any = {};
  actionRelatedThreatsObj: any = {};
  filterObjList: Array<any> = PcvtUtils.getFilterList();
  private filterKeys: Array<string> = PcvtUtils.getFilterKeys();

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

              this.processThreatMagnitude();
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

  getControlActionList(threat): Array<any> {
    let controlActionList: Array<any> = [];
    threat.relatedControlActions.forEach(c => {
      if(this.actionValuesObj[threat.key][c.key] !== undefined)
        controlActionList.push(c);
    });

    return controlActionList;
  }

  getRelatedThreatList(obj: any) {
    return Object.keys(obj).map(threat => obj[threat]);
  }

  enableSuggestedThreats(): boolean {
    const characteristicsObj = this.plan.characteristics !== undefined ?
      JSON.parse(this.plan.characteristics) : {};
    return PcvtUtils.isCharacterizationInstrumentComplete(characteristicsObj);
  }

  enableClassifiedThreats() {
    const threatsObj = this.plan.threats !== undefined ?
      JSON.parse(this.plan.threats) : {};

    return PcvtUtils.isThreatClassificationComplete(threatsObj);
  }

  enableDefinedControlActions() {
    // TODO check control actions completeness
    return this.plan.actions !== undefined;
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
  }


  private processThreatMagnitude() {
    this.threatList.forEach(item => {
      const classificationObj = this.threatValuesObj[item.key];
      if(classificationObj !== undefined) {
        const impact: number = classificationObj['impact'];
        const urgency: number = classificationObj['urgency'];
        const trend: number = classificationObj['trend'];

        const calculatedMagnitude: Magnitude = PcvtUtils.calculateThreatMagnitude(impact, urgency, trend);

        item['magnitude'] = calculatedMagnitude;
      }
    });
  }

  printReport() {
    window.print();
  }
}
