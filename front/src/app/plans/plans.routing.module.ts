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

const planRoutes: Routes = [
    {
        path: '', component: BasicLayoutComponent,
        children: [
            { path: '', component: PlansComponent },
            { path: 'create', component: CreatePlanComponent, canDeactivate: [CanDeactivateFormGuard] },
            { path: ':id/workspace', component: WorkspaceComponent, resolve: { plan: PlanResolver} },
            { path: ':id/characteristics', component: CharacteristicsComponent },
            { path: ':id/threats', component: ThreatsComponent},
            { path: ':id/actions', component: ActionsComponent},
            { path: ':id/reports', component: ReportsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(planRoutes)],
    exports: [RouterModule]
})
export class PlansRoutingModule {}
