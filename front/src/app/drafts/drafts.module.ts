import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateDraftComponent} from './create-draft/create-draft.component';
import {DraftsComponent} from "./drafts.component";
import {ActionsComponent} from './actions/actions.component';
import {CharacteristicsComponent} from './characteristics/characteristics.component';
import {ThreatsComponent} from './threats/threats.component';
import {ReportsComponent} from './reports/reports.component';
import {SharedModule} from "../shared/shared.module";
import {LayoutsModule} from "../shared/layouts/layouts.module";
import {WorkspaceComponent} from './workspace/workspace.component';
import {EditDraftComponent} from './edit-draft/edit-draft.component';
import {DraftsRoutingModule} from "./drafts.routing.module";
import {DraftService} from "../services/draft.service";
import {DraftResolver} from "../guards/draft.resolver";
import {MaterializeModule} from "angular2-materialize";

@NgModule({
  imports: [
    DraftsRoutingModule,
    CommonModule,
    SharedModule,
    LayoutsModule,
    MaterializeModule
  ],
  declarations: [
    DraftsComponent,
    CreateDraftComponent,
    ActionsComponent,
    CharacteristicsComponent,
    ThreatsComponent,
    ReportsComponent,
    WorkspaceComponent,
    EditDraftComponent
  ],
  providers: [
    DraftService,
    DraftResolver
  ]
})
export class DraftsModule { }
