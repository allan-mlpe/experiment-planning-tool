import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ReviewsService {
  private readonly RESOURCE_PREFIX: string = 'reviews';

  constructor(private restService: RestService) {}

  createReview(reviewRequest: any): Observable<any> {
    return this.restService.post(this.RESOURCE_PREFIX, reviewRequest);
  }

  getReviewsRequest(): Observable<any> {
    return this.restService.get(this.RESOURCE_PREFIX);
  }

  acceptRequest(reviewId: number): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${reviewId}/accept`, {});
  }

  refuseRequest(reviewId: number): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${reviewId}/refuse`, {});
  }

  getReview(reviewId: number): Observable<any> {
    return this.restService.get(`${this.RESOURCE_PREFIX}/${reviewId}`);
  }

  updateReview(review: any): Observable<any> {
    return this.restService.put(`${this.RESOURCE_PREFIX}/${review.id}`, review);
  }
}
