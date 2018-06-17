import {Component, OnInit} from '@angular/core';
import {PlanService} from "../services/plan.service";
import {ReviewsService} from "../services/reviews.service";
import {ApiMessage} from "../model/pcvt-message";
import {ToastFactory} from "../shared/toast-factory";
import {ReviewState} from "../model/review-state.enum";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: Array<any> = [];

  loading: boolean = true;

  constructor(private planService: PlanService, private reviewsService: ReviewsService) { }

  ngOnInit() {
    this.reviewsService.getReviewsRequest()
      .finally(() => this.loading = false)
      .subscribe(
        data => {
          this.reviews = data;
        },
        (err: ApiMessage) => {
          console.log(err);
          ToastFactory.errorToast(err.message);
        }
      )
  }

  acceptRequest(review: any, index: number) {
    const oldState = review.state;
    review.state = '...';
    this.reviewsService.acceptRequest(review.id).subscribe(
      data => {
        this.reviews[index] = data;
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
        review.state = oldState;
      }
    );
  }

  refuseRequest(review: any, index: number) {
    const oldState = review.state;
    review.state = '...';
    this.reviewsService.refuseRequest(review.id).subscribe(
      data => {
        this.reviews[index] = data;
      },
      (err: ApiMessage) => {
        console.log(err);
        ToastFactory.errorToast(err.message);
        review.state = oldState;
      }
    );
  }

  getEnumValue(enumKey: ReviewState): string {
    return ReviewState[enumKey];
  }

}
