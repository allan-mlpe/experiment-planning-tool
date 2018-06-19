import {Component, OnDestroy, OnInit} from '@angular/core';
import {SIMPLE_OPTIONS} from '../../model/simple-options'
import {ActivatedRoute, Router} from "@angular/router";
import {ToastFactory} from "../../shared/toast-factory";
import {PlanService} from "../../services/plan.service";
import {Plan} from "../../model/plan";
import {ApiMessage} from "../../model/pcvt-message";
import {Subscription} from "rxjs/Subscription";
import {PcvtConstants} from "../../shared/pcvt-constants";

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
    private planService: PlanService
  ) { }

  ngOnInit() {
    this.buildCharacteristicsObject();
    this.subscription = this.route.data.subscribe(
      (info: { plan: Plan }) => {
        this.plan = info['plan'];

        if (this.plan.planCharacteristics !== undefined) {
          this.characteristicsObj = JSON.parse(this.plan.planCharacteristics);
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
    this.plan.planCharacteristics = JSON.stringify(event);

    this.planService.savePlanCharacteristics(this.plan)
      .finally(() => this.saving = false)
      .subscribe(
      data => {
        ToastFactory.successToast('Characteristics have been saved')
        this.router.navigate(['../workspace'], {relativeTo: this.route });
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
