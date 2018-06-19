import {Component, OnDestroy, OnInit} from '@angular/core';
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

  // options: Array<any> = THREAT_OPTIONS;

  currentObject: any;
  currentObjectIndex: number;
  threatList: Array<any> = [];
  threatObj: any = {};

  options: Array<any> = [
    {name: 'Impact', hint: 'Perspective of the intensity or impact that a threat can cause the results of the experiment'},
    {name: 'Urgency', hint: 'Degree of urgency of the resolution'},
    {name: 'Trend', hint: 'Trend of the identified risk situation'}
  ];
  values = [1, 2, 3];

  loading: boolean = true;
  showInfoPanel: boolean;

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

        this.showInfoPanel = this.plan.planThreats === undefined;

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
                  this.processClassification();
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

  savePlanThreats() {
    this.plan.planThreats = JSON.stringify(this.threatObj);

    this.planService.savePlanThreats(this.plan).subscribe(
      data => {
        ToastFactory.successToast("Threats has been defined");

        this.router.navigate(['../workspace'], {relativeTo: this.route })
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    );
  }

  processClassification() {
    this.threatList.forEach(threat => {
      this.threatObj[threat.key] = {};
    });

    if(this.plan.planThreats !== undefined)
      this.threatObj = Object.assign(this.threatObj, JSON.parse(this.plan.planThreats));

  }

  startClassification() {
    this.showInfoPanel = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
