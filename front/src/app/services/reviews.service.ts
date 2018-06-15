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
}
