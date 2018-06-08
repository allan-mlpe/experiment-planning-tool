import {Component, OnDestroy, OnInit} from '@angular/core';
import {THREAT_OPTIONS} from './../../model/threat-options';
import {Plan} from "../../model/plan";
import {Subscription} from "rxjs/Rx";
import {PlanService} from "../../services/plan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CharacteristicsService} from "../../services/characteristics.service";
import {ApiMessage} from "../../model/pcvt-message";
import {ToastFactory} from "../../shared/toast-factory";

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.css']
})
export class ThreatsComponent implements OnInit, OnDestroy {
  plan: Plan;
  private subscription: Subscription;

  options: Array<any> = THREAT_OPTIONS;

  currentObject: any;
  currentObjectIndex: number;
  threatList: Array<any> = [];

  labels = ['Impact', 'Urgency', 'Trend'];
  values = [1, 2, 3];

  loading: boolean = true;

  constructor(
    private planService: PlanService,
    private characteristicService: CharacteristicsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  nextItem() {
    this.currentObjectIndex+=1;
    this.currentObject = this.threatList[this.currentObjectIndex];
  }

  previousItem() {
    this.currentObjectIndex-=1;
    this.currentObject = this.threatList[this.currentObjectIndex];
  }

  getProgress() {
    const numerator: number = this.isObjectComplete() ? this.currentObjectIndex+1 : this.currentObjectIndex;
    const denominator: number = this.threatList.length;
    const progress: number = numerator/denominator * 100;

    return {
      'width': `${progress}%`
    }
  }

  finish() {
    ToastFactory.infoToast('Available soon');
    this.router.navigate(['../workspace'], {relativeTo: this.route })
  }

  isObjectComplete(): boolean {
    return this.currentObject['impact'] !== undefined
            && this.currentObject['urgency'] !== undefined
            && this.currentObject['trend'] !== undefined;
  }

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

                  this.currentObjectIndex = 0;
                  this.currentObject = this.threatList[this.currentObjectIndex];
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
