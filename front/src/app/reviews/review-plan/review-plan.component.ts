import {Component, OnDestroy, OnInit} from '@angular/core';
import {Plan} from "../../model/plan";
import {ReviewsService} from "../../services/reviews.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {PcvtConstants} from "../../shared/pcvt-constants";
import {REVIEW_OPTIONS} from "../../model/review-options";
import {ApiMessage} from "../../model/pcvt-message";
import {ToastFactory} from "../../shared/toast-factory";
import {ModalService} from "../../services/modal.service";

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

  loading: boolean = false;
  saving: boolean = false;
  completing: boolean = false;

  private subsc: Subscription;

  constructor(
    private reviewsService: ReviewsService,
    private modalService: ModalService,
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
        if(!this.plan.custom)
          this.planDetails = JSON.parse(this.plan.planDetails);
      });
  }

  downloadPlan() {
    if(this.plan.custom)
      this.reviewsService.downloadPlan(this.plan.id, this.plan.fileName);
  }

  onSubmit() {
    this.saving = true;

    this.reviewsService.updateReview(this.review)
      .finally(() => this.saving = false)
      .subscribe(
      data => {
        ToastFactory.successToast('Review has been saved')
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
      }
    );
  }

  saveAndComplete() {
    this.completing = true;
    let subsc: Subscription = this.modalService.showModalHTMLContent("Complete review", `Your review will be sent to experimenter and you will not be able to edit it anymore.<br/><br/> Are you sure to finish this review?`, 'Yes', 'No')
      .finally(() => this.completing = false)
      .subscribe(
        data => {
          if(data) {
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
          subsc.unsubscribe();
        }
      );
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
