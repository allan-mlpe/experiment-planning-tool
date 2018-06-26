import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CharacteristicsService} from "../../services/characteristics.service";
import {PcvtUtils} from "../../shared/pcvt-utils";
import {ThreatsService} from "../../services/threat.service";
import {ToastFactory} from "../../shared/toast-factory";
import {Draft} from "../../model/draft";
import {ApiMessage} from "../../model/pcvt-message";
import {Subscription} from "rxjs/Subscription";

declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reportType: number;
  draft: Draft;

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
      (info: { draft: Draft }) => {
        this.draft = info['draft'];

        if(this.draft.characteristics !== undefined) {
          const characteristics: any = JSON.parse(this.draft.characteristics);

          const characteristicsKeys: Array<string> = Object.keys(characteristics)
            .filter(key => characteristics[key] === 'YES');

          if(characteristicsKeys.length > 0) {
            this.characteristicsService.getThreatsByCharacteristicKeys({stringList: characteristicsKeys})
              .subscribe(
                data => {
                  this.threatList = data;

                  if(this.draft.threats !== undefined)
                    this.threatValuesObj = Object.assign(this.threatValuesObj, JSON.parse(this.draft.threats));

                  if(this.draft.actions !== undefined)
                    this.actionValuesObj = Object.assign(this.actionValuesObj, JSON.parse(this.draft.actions));

                  if(this.draft.actionRelatedThreats !== undefined)
                    this.actionRelatedThreatsObj = Object.assign(this.actionRelatedThreatsObj, JSON.parse(this.draft.actionRelatedThreats));
                },
                (err: ApiMessage) => {
                  console.log(err);
                  ToastFactory.errorToast(err.message);
                }
              );
          }
        } else {
          ToastFactory.infoToast("You must first define the characteristics of the draft");
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
    const characteristicsObj = this.draft.characteristics !== undefined ?
      JSON.parse(this.draft.characteristics) : {};
    return PcvtUtils.isCharacterizationInstrumentComplete(characteristicsObj);
  }

  enableClassifiedThreats() {
    const threatsObj = this.draft.threats !== undefined ?
      JSON.parse(this.draft.threats) : {};

    return this.draft.draftType === 'FULL' && PcvtUtils.isThreatClassificationComplete(threatsObj) ;
  }

  enableDefinedControlActions() {
    // TODO check control actions completeness
    return this.draft.draftType === 'FULL' && this.draft.actions !== undefined;
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }

}
