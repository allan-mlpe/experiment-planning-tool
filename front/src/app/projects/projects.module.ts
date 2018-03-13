import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { LayoutsModule } from '../shared/layouts/layouts.module';
import { ProjectsRoutingModule } from './projects.routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectService } from '../services/project.service';
import { MaterializeModule } from 'angular2-materialize';
import {WorkspaceComponent} from "./workspace/workspace.component";
import {ProjectResolver} from "../guards/project.resolver";
import {ActionsComponent} from "./actions/actions.component";
import {CharacteristicsComponent} from "./characteristics/characteristics.component";
import {ReportsComponent} from "./reports/reports.component";
import {ThreatsComponent} from "./threats/threats.component";

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    LayoutsModule,
    MaterializeModule
  ],
  declarations: [
    ProjectsComponent,
    CreateProjectComponent,
    WorkspaceComponent,
    ActionsComponent,
    CharacteristicsComponent,
    CreateProjectComponent,
    ReportsComponent,
    ThreatsComponent
  ],
  providers: [
    ProjectService,
    ProjectResolver
  ]
})
export class ProjectsModule { }
