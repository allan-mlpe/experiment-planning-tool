import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlansComponent} from './plans.component';
import {CreatePlanComponent} from './create-plan/create-plan.component';
import {LayoutsModule} from '../shared/layouts/layouts.module';
import {PlansRoutingModule} from './plans.routing.module';
import {SharedModule} from '../shared/shared.module';
import {PlanService} from '../services/plan.service';
import {MaterializeModule} from 'angular2-materialize';
import {WorkspaceComponent} from "./workspace/workspace.component";
import {PlanResolver} from "../guards/plan.resolver";
import {ActionsComponent} from "./actions/actions.component";
import {CharacteristicsComponent} from "./characteristics/characteristics.component";
import {ReportsComponent} from "./reports/reports.component";
import {ThreatsComponent} from "./threats/threats.component";
import {EditPlanComponent} from './edit-plan/edit-plan.component';
import {UserService} from "../services/user.service";
import {CharacteristicsService} from "../services/characteristics.service";
import {ThreatsService} from "../services/threat.service";
import {ControlActionService} from "../services/control-action.service";
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  imports: [
    CommonModule,
    PlansRoutingModule,
    SharedModule,
    LayoutsModule,
    MaterializeModule
  ],
  declarations: [
    PlansComponent,
    CreatePlanComponent,
    WorkspaceComponent,
    ActionsComponent,
    CharacteristicsComponent,
    CreatePlanComponent,
    ReportsComponent,
    ThreatsComponent,
    EditPlanComponent,
    ReviewsComponent
  ],
  providers: [
    PlanService,
    PlanResolver,
    UserService,
    CharacteristicsService,
    ThreatsService,
    ControlActionService
  ]
})
export class PlansModule { }
