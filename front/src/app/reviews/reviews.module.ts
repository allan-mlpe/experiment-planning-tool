import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanResolver} from "../guards/plan.resolver";
import {UserService} from "../services/user.service";
import {PlanService} from "../services/plan.service";
import {ReviewsRoutingModule} from "./reviews.routing.module";
import {LayoutsModule} from "../shared/layouts/layouts.module";
import {SharedModule} from "../shared/shared.module";
import {CreateReviewComponent} from "./create-review/create-review.component";
import {ReadyToReviewComponent} from "./ready-to-review/ready-to-review.component";
import {ReviewsService} from "../services/reviews.service";
import {ReviewsComponent} from './reviews.component';
import {ReviewPlanComponent} from './review-plan/review-plan.component';
import {ReviewResolver} from "../guards/review.resolver";

@NgModule({
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    SharedModule,
    LayoutsModule
  ],
  declarations: [
    CreateReviewComponent,
    ReadyToReviewComponent,
    ReviewsComponent,
    ReviewPlanComponent
  ],
  providers: [
    PlanService,
    PlanResolver,
    UserService,
    ReviewsService,
    ReviewResolver
  ]
})
export class ReviewsModule { }
