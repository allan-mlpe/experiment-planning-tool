import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Plan} from "../../model/plan";
import {REVIEW_OPTIONS} from "../../model/review-options";
import {Subscription} from "rxjs/Subscription";
import {PcvtConstants} from "../../shared/pcvt-constants";
import {PlanService} from "../../services/plan.service";
import {ApiMessage} from "../../model/pcvt-message";
import {ToastFactory} from "../../shared/toast-factory";

declare var $: any;

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css', '../create-plan/create-plan.component.css']
})
export class ReviewsComponent implements OnInit, OnDestroy {

  review: any = {};
  reviews: Array<any> = [];
  plan: Plan;

  instrumentQuestions = PcvtConstants.REVIEW_INSTRUMENT_QUESTIONS;

  options = REVIEW_OPTIONS;

  private subsc: Subscription;

  constructor(
    private planService: PlanService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
    let planId: number = parseInt(this.route.snapshot.params['id']);

    this.subsc = this.route.data.subscribe(
      (info: { plan: Plan }) => {
        this.plan = info['plan'];
      }
    );

    this.planService.getReviews(planId).subscribe(
      data => {
        this.reviews = data;
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    )
  }

  downloadPlan() {
    if(this.plan.custom)
      this.planService.downloadPlan(this.plan.id, this.plan.fileName);
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
