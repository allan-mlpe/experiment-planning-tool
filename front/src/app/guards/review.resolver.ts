import {Injectable} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

import {Observable} from "rxjs/Rx";
import {ReviewsService} from "../services/reviews.service";

@Injectable()
export class ReviewResolver implements Resolve<any> {
  constructor(
    private reviewsService: ReviewsService,
    private route: ActivatedRoute
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    let id: number = parseInt(route.params['id']);

    return this.reviewsService.getReview(id);
  }
}
