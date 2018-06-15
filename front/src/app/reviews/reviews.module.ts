import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanResolver} from "../guards/plan.resolver";
import {UserService} from "../services/user.service";
import {PlanService} from "../services/plan.service";
import {ReviewsRoutingModule} from "./reviews.routing.module";
import {LayoutsModule} from "../shared/layouts/layouts.module";
import {SharedModule} from "../shared/shared.module";
import {MaterializeModule} from "angular2-materialize";
import {CreateReviewComponent} from "./create-review/create-review.component";
import {ReadyToReviewComponent} from "./ready-to-review/ready-to-review.component";
import {ReviewsService} from "../services/reviews.service";
import { ReviewsComponent } from './reviews.component';

@NgModule({
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    SharedModule,
    LayoutsModule,
    MaterializeModule
  ],
  declarations: [
    CreateReviewComponent,
    ReadyToReviewComponent,
    ReviewsComponent
  ],
  providers: [
    PlanService,
    PlanResolver,
    UserService,
    ReviewsService
  ]
})
export class ReviewsModule { }
