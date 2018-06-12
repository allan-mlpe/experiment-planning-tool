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
  actionObj: any = {};

  private filterKeys: Array<string> = [Magnitude.VERY_HIGH, Magnitude.HIGH, Magnitude.MODERATE, Magnitude.LOW, Magnitude.VERY_LOW];
  filterObjList: Array<any> = [
    { name: 'veryHigh', value: Magnitude.VERY_HIGH },
    { name: 'high', value: Magnitude.HIGH },
    { name: 'moderate', value: Magnitude.MODERATE },
    { name: 'low', value: Magnitude.LOW },
    { name: 'veryLow', value: Magnitude.VERY_LOW},
  ];

  private subscription: Subscription;

  loading: boolean = true;
  showInfoPanel: boolean;
  options: Array<any> = ACTION_OPTIONS;

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

        this.showInfoPanel = this.plan.planActions === undefined;

        if (this.plan.planThreats !== undefined) {
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

                  this.processClassification();
                  this.processThreatMagnitude();

                  this.initCurrenObject();
                },
                (err: ApiMessage) => {
                  console.log(err);
                  ToastFactory.errorToast(err.message);
                }
              )
          }
        } else {
          ToastFactory.infoToast("You must first classify the threats of the plan");
          this.router.navigate(['../threats'], {relativeTo: this.route });
        }
      }
    );
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
    this.initCurrenObject();
  }

  private filterThreatList() {
    this.filteredList = this.threatList.filter(threat => this.filterKeys.indexOf(threat.magnitude) != -1);
  }


  // select functions
  selectAction(action) {
    const threatKey: string = this.currentObject.key;
    const key: string = action.key;

    if(this.actionObj[threatKey][key] !== undefined) {
      delete this.actionObj[threatKey][key];
    } else {
      this.actionObj[threatKey][key] = '';
    }
  }

  classifyAction(action, value) {
    const threatKey: string = this.currentObject.key;
    const key: string = action.key;

    this.actionObj[threatKey][key] = value;
  }


  // process screen objects functions
  processClassification() {
    this.threatObj = JSON.parse(this.plan.planThreats);

    if(this.plan.planActions != undefined) {
      this.actionObj = JSON.parse(this.plan.planActions);
    } else {
      this.threatList.forEach(threat => {
        this.actionObj[threat.key] = {};
      });
    }
  }

  private processThreatMagnitude() {
    this.threatList.forEach(item => {
      const classificationObj = this.threatObj[item.key];
      const impact: number = classificationObj['impact'];
      const urgency: number = classificationObj['urgency'];
      const trend: number = classificationObj['trend'];

      const calculatedMagnitude: Magnitude = this.calculateThreatMagnitude(impact, urgency, trend);

      item['magnitude'] = calculatedMagnitude;
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

  initCurrenObject() {
    this.currentObjectIndex = 0;
    this.currentObject = this.filteredList[this.currentObjectIndex];
  }


  // wizzard funcions
  nextItem() {
    this.currentObjectIndex+=1;
    this.currentObject = this.filteredList[this.currentObjectIndex];
  }

  previousItem() {
    this.currentObjectIndex-=1;
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

  finish() {
    console.log('finish');
  }

  startClassification() {
    this.showInfoPanel = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
