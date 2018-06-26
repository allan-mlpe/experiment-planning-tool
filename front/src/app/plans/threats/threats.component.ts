import {Component, OnDestroy, OnInit} from '@angular/core';
import {Plan} from "../../model/plan";
import {Subscription} from "rxjs/Rx";
import {PlanService} from "../../services/plan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CharacteristicsService} from "../../services/characteristics.service";
import {ApiMessage} from "../../model/pcvt-message";
import {ToastFactory} from "../../shared/toast-factory";
import {PcvtUtils} from "../../shared/pcvt-utils";
import {ModalService} from "../../services/modal.service";

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
  saving: boolean = false;
  showInfoPanel: boolean;

  constructor(
    private planService: PlanService,
    private characteristicService: CharacteristicsService,
    private modalService: ModalService,
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
    this.saving = true;
    this.plan.planThreats = JSON.stringify(this.threatObj);

    this.planService.savePlanThreats(this.plan)
      .finally(() => this.saving = false)
      .subscribe(
      data => {
        ToastFactory.successToast("Threats have been saved");

        //this.router.navigate(['../workspace'], {relativeTo: this.route })
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

    if(this.plan.planThreats !== undefined) {
      this.threatObj = Object.assign(this.threatObj, JSON.parse(this.plan.planThreats));

      //this.checkClassificationComplete();
    }

    this.loading = false;
  }

  startClassification() {
    this.showInfoPanel = false;
  }

  checkClassificationComplete() {
    if(PcvtUtils.isThreatClassificationComplete(this.threatObj)) {
      let subsc: Subscription = this.modalService.showModal("Threat classification completed", `Do you want to edit it?`, 'Yes', 'No')
        .subscribe(
          data => {
            if(!data) {
              this.router.navigate(['../workspace'], {relativeTo: this.route });
            }
            subsc.unsubscribe();
          }
        );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
