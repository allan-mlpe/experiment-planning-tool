import {Component, OnDestroy, OnInit} from '@angular/core';
import {ACTION_OPTIONS} from '../../model/action-options';
import {Plan} from "../../model/plan";
import {ToastFactory} from "../../shared/toast-factory";
import {ApiMessage} from "../../model/pcvt-message";
import {PlanService} from "../../services/plan.service";
import {CharacteristicsService} from "../../services/characteristics.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {Magnitude} from "../../model/magnitude.enum";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit, OnDestroy {

  plan: Plan;
  currentObject: any;
  currentObjectIndex: number;
  threatList: Array<any> = [];
  filteredList: Array<any> = [];
  threatObj: any = {};
  loading: boolean = true;
  filterObjList: Array<any> = [
    { name: 'veryHigh', value: Magnitude.VERY_HIGH },
    { name: 'high', value: Magnitude.HIGH },
    { name: 'moderate', value: Magnitude.MODERATE },
    { name: 'low', value: Magnitude.LOW },
    { name: 'veryLow', value: Magnitude.VERY_LOW},
  ];

  options: Array<any> = ACTION_OPTIONS;
  private subscription: Subscription;
  private filterKeys: Array<string> = [Magnitude.VERY_HIGH, Magnitude.HIGH, Magnitude.MODERATE, Magnitude.LOW, Magnitude.VERY_LOW];

  constructor(
    private planService: PlanService,
    private characteristicService: CharacteristicsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(
      (info: { plan: Plan }) => {
        this.plan = info['plan'];

        if (this.plan.planCharacteristics !== undefined) {
          const characteristics: any = JSON.parse(this.plan.planCharacteristics);

          const characteristicsKeys: Array<string> = Object.keys(characteristics)
            .filter(key => characteristics[key] === 'YES');

          if(characteristicsKeys.length > 0) {
            this.characteristicService.getThreatsByCharacteristicKeys({stringList: characteristicsKeys})
              .finally(() => this.loading = false)
              .subscribe(
                data => {
                  this.threatList = data;
                  this.filteredList = data;

                  this.currentObjectIndex = 0;
                  this.currentObject = this.threatList[this.currentObjectIndex];
                  this.processClassification();
                  this.processThreatMagnitude();
                },
                (err: ApiMessage) => {
                  console.log(err);
                  ToastFactory.errorToast(err.message);
                }
              )
          }
        } else {
          ToastFactory.infoToast("You must first define the characteristics of the plan");
          this.router.navigate(['../characteristics'], {relativeTo: this.route });
        }
      }
    );
  }

  selectItem(target) {
    const index = this.filterKeys.indexOf(target);

    if(index === -1) {
      this.filterKeys.push(target);
    } else {
      this.filterKeys.splice(index, 1);
    }

    this.filterThreatList();
    this.currentObjectIndex = 0;
    this.currentObject = this.filteredList[this.currentObjectIndex];
  }

  processClassification() {
    if(this.plan.planThreats !== undefined) {
      this.threatObj = JSON.parse(this.plan.planThreats);
    } else {
      this.threatList.forEach(threat => {
        this.threatObj[threat.key] = {};
      });
    }
  }

  nextItem() {
    this.currentObjectIndex+=1;
    this.currentObject = this.filteredList[this.currentObjectIndex];
  }

  previousItem() {
    this.currentObjectIndex-=1;
    this.currentObject = this.filteredList[this.currentObjectIndex];
  }

  getProgress() {
    const numerator: number = this.isObjectComplete() ? this.currentObjectIndex+1 : this.currentObjectIndex;
    const denominator: number = this.filteredList.length;
    const progress: number = numerator/denominator * 100;

    return {
      'width': `${progress}%`
    }
  }

  finish() {
    console.log('finish');
  }

  isObjectComplete(): boolean {
    const obj = this.threatObj[this.currentObject.key];
    return obj['impact'] !== undefined
      && obj['urgency'] !== undefined
      && obj['trend'] !== undefined;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private filterThreatList() {
    this.filteredList = this.threatList.filter(threat => this.filterKeys.indexOf(threat.magnitude) != -1);
  }

  private processThreatMagnitude() {
    this.threatList.forEach(item => {
      const classificationObj = this.threatObj[item.key];
      const impact: number = classificationObj['impact'];
      const urgency: number = classificationObj['urgency'];
      const trend: number = classificationObj['trend'];

      const calculatedMagnitude: Magnitude = this.calculateThreatMagnitude(impact, urgency, trend);

      item['magnitude'] = calculatedMagnitude;
      // console.log(`${impact} | ${urgency} | ${trend} =======> ${calculatedMagnitude}`);
    });
  }

  private calculateThreatMagnitude(impact: number, urgency: number, trend: number): Magnitude {
    const value: number = impact * 1000 + urgency * 100 + trend * 10;

    if(value >= 3210) {
      return Magnitude.VERY_HIGH;
    } else if(value >= 2310) {
      return Magnitude.HIGH;
    } else if(value >= 2110) {
      return Magnitude.MODERATE;
    } else if(value >= 1210) {
      return Magnitude.LOW;
    } else {
      return Magnitude.VERY_LOW;
    }
  }
}
