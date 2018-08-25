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

  currentObject: any;
  currentObjectIndex: number;
  threatList: Array<any> = [];
  threatObj: any = {};
  customThreatObj: any = {};
  customThreatList: Array<any> = [];

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

        this.showInfoPanel = this.plan.threats === undefined;

        if (this.plan.characteristics !== undefined) {
          const characteristics: any = JSON.parse(this.plan.characteristics);

          const characteristicsKeys: Array<string> = PcvtUtils.getExperimentCharacteristicsKeys(characteristics);

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
          } else {
            this.loading = false;
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
    this.plan.threats = JSON.stringify(this.threatObj);
    this.plan.customThreats = JSON.stringify(this.customThreatObj);

    this.planService.savePlanThreats(this.plan)
      .finally(() => this.saving = false)
      .subscribe(
      data => {
        ToastFactory.successToast("Threats have been saved");

        if(PcvtUtils.isThreatClassificationComplete(this.threatObj)) {
          this.showCompleteModal();
        }
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    );
  }

  showCompleteModal() {
    let subsc: Subscription = this.modalService.showModal("Threats classification complete", `Do you want to define the control actions for "${this.plan.name}" now?`, 'Yes', 'No')
      .subscribe(
        data => {
          if(data) {
            this.router.navigate(['../actions'], {relativeTo: this.route })
          } else {
            this.router.navigate(['../workspace'], {relativeTo: this.route });
          }
          subsc.unsubscribe();
        }
      );
  }

  processClassification() {
    this.threatList.forEach(threat => {
      this.threatObj[threat.key] = {};
    });

    if(this.plan.threats !== undefined) {
      this.threatObj = Object.assign(this.threatObj, JSON.parse(this.plan.threats));
    }

    if(this.plan.customThreats !== undefined) {
      this.customThreatObj =
        Object.assign(this.customThreatObj, JSON.parse(this.plan.customThreats));
        this.customThreatList = Object.values(this.customThreatObj);
    }

    this.loading = false;
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
