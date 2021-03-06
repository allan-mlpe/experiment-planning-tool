import {Component, OnDestroy, OnInit} from '@angular/core';
import {SIMPLE_OPTIONS} from '../../model/simple-options'
import {ActivatedRoute, Router} from "@angular/router";
import {ToastFactory} from "../../shared/toast-factory";
import {PlanService} from "../../services/plan.service";
import {Plan} from "../../model/plan";
import {ApiMessage} from "../../model/pcvt-message";
import {Subscription} from "rxjs/Subscription";
import {PcvtConstants} from "../../shared/pcvt-constants";
import {PcvtUtils} from "../../shared/pcvt-utils";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit, OnDestroy {

  plan: Plan;
  characteristicsObj: any = {};
  options = SIMPLE_OPTIONS;
  characteristics: Array<any> = [];
  private subscription: Subscription;

  saving: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planService: PlanService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.buildCharacteristicsObject();
    this.subscription = this.route.data.subscribe(
      (info: { plan: Plan }) => {
        this.plan = info['plan'];

        if (this.plan.characteristics !== undefined) {
          this.characteristicsObj = JSON.parse(this.plan.characteristics);
          //this.checkCharacterizationComplete();
        }
      });
  }

  buildCharacteristicsObject() {
    const questions: Array<any> = PcvtConstants.CHARACTERIZATION_QUESTIONS;
    questions.forEach(category => {
      category.questions.forEach(question => {
        this.characteristics.push(question);
      })
    });
  }

  saveCharacteristics(event) {
    this.saving = true;
    this.plan.characteristics = JSON.stringify(event);

    this.planService.savePlanCharacteristics(this.plan)
      .finally(() => this.saving = false)
      .subscribe(
      data => {
        ToastFactory.successToast('Characteristics have been saved');

        if(PcvtUtils.isCharacterizationInstrumentComplete(event)) {
          this.showCompleteModal();
        }
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    )
  }

  checkCharacterizationComplete() {
    if(PcvtUtils.isCharacterizationInstrumentComplete(this.characteristicsObj)) {
      let subsc: Subscription = this.modalService.showModal("Characterization completed", `Do you want to edit it?`, 'Yes', 'No')
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

  showCompleteModal() {
    let subsc: Subscription = this.modalService.showModal("Characterization complete", `Do you want to classify the suggested threats for "${this.plan.name}" now?`, 'Yes', 'No')
      .subscribe(
        data => {
          if(data) {
            this.router.navigate(['../threats'], {relativeTo: this.route })
          } else {
            this.router.navigate(['../workspace'], {relativeTo: this.route });
          }
          subsc.unsubscribe();
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
