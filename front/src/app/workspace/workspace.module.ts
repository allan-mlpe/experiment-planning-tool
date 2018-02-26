import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace.routing.module';
import { WorkspaceComponent } from './workspace.component';
import { LayoutsModule } from '../shared/layouts/layouts.module';
import { SharedModule } from '../shared/shared.module';
import { ThreatsComponent } from './threats/threats.component';
import { ActionsComponent } from './actions/actions.component';
import { ReportsComponent } from './reports/reports.component';
import { CharacteristicsComponent } from './characteristics/characteristics.component';
import { ProjectService } from '../services/project.service';
import { ProjectResolver } from '../guards/project.resolver';

@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    LayoutsModule,
    SharedModule
  ],
  declarations: [
    WorkspaceComponent,
    ThreatsComponent,
    ActionsComponent,
    ReportsComponent,
    CharacteristicsComponent
  ],
  providers: [
    ProjectService,
    ProjectResolver
  ]
})
export class WorkspaceModule { }
