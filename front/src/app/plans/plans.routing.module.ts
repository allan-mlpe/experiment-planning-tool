import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BasicLayoutComponent} from '../shared/layouts/basic-layout/basic-layout.component';
import {PlansComponent} from './plans.component';
import {CreatePlanComponent} from './create-plan/create-plan.component';
import {CanDeactivateFormGuard} from '../guards/candeactivate-form.guard';
import {WorkspaceComponent} from "./workspace/workspace.component";
import {ThreatsComponent} from "./threats/threats.component";
import {ReportsComponent} from "./reports/reports.component";
import {ActionsComponent} from "./actions/actions.component";
import {CharacteristicsComponent} from "./characteristics/characteristics.component";
import {PlanResolver} from "../guards/plan.resolver";
import {EditPlanComponent} from "./edit-plan/edit-plan.component";
import {AuthGuard} from "../guards/auth.guard";
import {ReviewsComponent} from "./reviews/reviews.component";
import {ArchivedComponent} from "./archived/archived.component";

const planRoutes: Routes = [
    {
        path: '', component: BasicLayoutComponent,
        children: [
            { path: '', component: PlansComponent },
            { path: 'create', component: CreatePlanComponent, canDeactivate: [CanDeactivateFormGuard], canActivate: [AuthGuard] },
            { path: 'archived', component: ArchivedComponent, canActivate: [AuthGuard] },
            { path: 'edit/:id', component: EditPlanComponent, canDeactivate: [CanDeactivateFormGuard], canActivate: [AuthGuard], resolve: { plan : PlanResolver}},
            { path: ':id/workspace', component: WorkspaceComponent, resolve: { plan: PlanResolver} },
            { path: ':id/characteristics', component: CharacteristicsComponent, resolve: { plan : PlanResolver} },
            { path: ':id/threats', component: ThreatsComponent, resolve: { plan : PlanResolver}},
            { path: ':id/actions', component: ActionsComponent, resolve: { plan : PlanResolver}},
            { path: ':id/reports', component: ReportsComponent, resolve: { plan: PlanResolver }},
            { path: ':id/reviews', component: ReviewsComponent, resolve: { plan: PlanResolver }}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(planRoutes)],
    exports: [RouterModule]
})
export class PlansRoutingModule {}
