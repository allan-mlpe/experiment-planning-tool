import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacteristicsService} from "../../services/characteristics.service";
import {Subscription} from "rxjs/Subscription";
import {Plan} from "../../model/plan";
import {ActivatedRoute, Router} from "@angular/router";
import {ThreatsService} from "../../services/threat.service";
import {ApiMessage} from "../../model/pcvt-message";
import {ToastFactory} from "../../shared/toast-factory";
import {PcvtUtils} from "../../shared/pcvt-utils";

declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnDestroy {
  reportType: number;
  plan: Plan;

  threatList: Array<any> = [];
  threatValuesObj: any = {};
  actionValuesObj: any = {};
  actionRelatedThreatsObj: any = {};

  private subsc: Subscription;

  constructor(
    private characteristicsService: CharacteristicsService,
    private threatsService: ThreatsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildScreen();

    this.subsc = this.route.data.subscribe(
      (info: { plan: Plan }) => {
        this.plan = info['plan'];

        if(this.plan.planCharacteristics !== undefined) {
          const characteristics: any = JSON.parse(this.plan.planCharacteristics);

          const characteristicsKeys: Array<string> = Object.keys(characteristics)
            .filter(key => characteristics[key] === 'YES');

          if(characteristicsKeys.length > 0) {
            this.characteristicsService.getThreatsByCharacteristicKeys({stringList: characteristicsKeys})
              .subscribe(
                data => {
                  this.threatList = data;

                  if(this.plan.planThreats !== undefined)
                    this.threatValuesObj = Object.assign(this.threatValuesObj, JSON.parse(this.plan.planThreats));

                  if(this.plan.planActions !== undefined)
                    this.actionValuesObj = Object.assign(this.actionValuesObj, JSON.parse(this.plan.planActions));

                  if(this.plan.planActionRelatedThreats !== undefined)
                    this.actionRelatedThreatsObj = Object.assign(this.actionRelatedThreatsObj, JSON.parse(this.plan.planActionRelatedThreats));
                },
                (err: ApiMessage) => {
                  console.log(err);
                  ToastFactory.errorToast(err.message);
                }
              );
          }
        } else {
          ToastFactory.infoToast("You must first define the characteristics of the plan");
          this.router.navigate(['../characteristics'], {relativeTo: this.route });
        }
      });
  }

  setShowReport(value) {
    this.reportType = value;
  }

  changeSelectValue(component) {
    const selectValue = document.getElementById('report-type')['value'];
    component.setShowReport(selectValue);
  }

  private buildScreen() {
    const self = this;
    // init material select tag
    $(document).ready(function(){
      // fix material_select bug - it wasn't triggering change event.
      $('select').material_select(self.changeSelectValue.bind(this, self));
    });
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
    const characteristicsObj = this.plan.planCharacteristics !== undefined ?
      JSON.parse(this.plan.planCharacteristics) : {};
    return PcvtUtils.isCharacterizationInstrumentComplete(characteristicsObj);
  }


  enableClassifiedThreats() {
    const threatsObj = this.plan.planThreats !== undefined ?
      JSON.parse(this.plan.planThreats) : {};

    return PcvtUtils.isThreatClassificationComplete(threatsObj);
  }

  enableDefinedControlActions() {
    // TODO check control actions completeness
    return this.plan.planActions !== undefined;
  }


  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
