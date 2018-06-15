import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BasicLayoutComponent} from '../shared/layouts/basic-layout/basic-layout.component';
import {CanDeactivateFormGuard} from '../guards/candeactivate-form.guard';
import {PlanResolver} from "../guards/plan.resolver";

import {AuthGuard} from "../guards/auth.guard";
import {ReadyToReviewComponent} from "./ready-to-review/ready-to-review.component";
import {CreateReviewComponent} from "./create-review/create-review.component";
import {ReviewsComponent} from "./reviews.component";
import {ReviewPlanComponent} from "./review-plan/review-plan.component";
import {ReviewResolver} from "../guards/review.resolver";

const planRoutes: Routes = [
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: '', component: ReviewsComponent, canActivate: [AuthGuard] },
      { path: 'ready-to-review', component: ReadyToReviewComponent, canActivate: [AuthGuard]},
      { path: 'ready-to-review/create/:id', component: CreateReviewComponent, canDeactivate: [CanDeactivateFormGuard], canActivate: [AuthGuard], resolve: { plan : PlanResolver}},
      { path: ':id', component: ReviewPlanComponent, canActivate: [AuthGuard], resolve: {review: ReviewResolver}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(planRoutes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule {}
