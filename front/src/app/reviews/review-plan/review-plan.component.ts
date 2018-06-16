import {Component, OnDestroy, OnInit} from '@angular/core';
import {Plan} from "../../model/plan";
import {ReviewsService} from "../../services/reviews.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {PcvtConstants} from "../../shared/pcvt-constants";
import {REVIEW_OPTIONS} from "../../model/review-options";
import {ApiMessage} from "../../model/pcvt-message";
import {ToastFactory} from "../../shared/toast-factory";

declare var $ :any;

@Component({
  selector: 'app-review-plan',
  templateUrl: './review-plan.component.html',
  styleUrls: ['./review-plan.component.css', '../../plans/create-plan/create-plan.component.css']
})
export class ReviewPlanComponent implements OnInit, OnDestroy {

  review: any = {};
  plan: Plan;
  planDetails: any;

  instrumentQuestions = PcvtConstants.REVIEW_INSTRUMENT_QUESTIONS;

  options = REVIEW_OPTIONS;

  private subsc: Subscription;

  constructor(
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });

    this.subsc = this.route.data.subscribe(
      (info: { review: any }) => {
        this.review = info['review'];
        this.plan = this.review.plan;
        this.planDetails = JSON.parse(this.plan.planDetails);
      });
  }

  onSubmit() {
    this.reviewsService.updateReview(this.review).subscribe(
      data => {
        ToastFactory.successToast('Review successfully updated')
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    );
  }

  saveAndComplete() {
    this.reviewsService.completeReview(this.review).subscribe(
      data => {
        ToastFactory.successToast('Review successfully completed');
        this.router.navigate(['reviews']);
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    );
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
