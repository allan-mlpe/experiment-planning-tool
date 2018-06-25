import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BasicLayoutComponent} from '../shared/layouts/basic-layout/basic-layout.component';
import {CanDeactivateFormGuard} from '../guards/candeactivate-form.guard';
import {ThreatsComponent} from "./threats/threats.component";
import {ReportsComponent} from "./reports/reports.component";
import {ActionsComponent} from "./actions/actions.component";
import {CharacteristicsComponent} from "./characteristics/characteristics.component";
import {DraftResolver} from "../guards/draft.resolver";

import {AuthGuard} from "../guards/auth.guard";
import {DraftsComponent} from "./drafts.component";
import {CreateDraftComponent} from "./create-draft/create-draft.component";
import {EditDraftComponent} from "./edit-draft/edit-draft.component";
import {WorkspaceComponent} from "./workspace/workspace.component";


const draftRoutes: Routes = [
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: '', component: DraftsComponent },
      { path: 'create', component: CreateDraftComponent, canDeactivate: [CanDeactivateFormGuard], canActivate: [AuthGuard] },
      { path: 'edit/:id', component: EditDraftComponent, canDeactivate: [CanDeactivateFormGuard], canActivate: [AuthGuard], resolve: { draft : DraftResolver}},
      { path: ':id/workspace', component: WorkspaceComponent, resolve: { draft: DraftResolver} },
      { path: ':id/characteristics', component: CharacteristicsComponent, resolve: { draft : DraftResolver} },
      { path: ':id/threats', component: ThreatsComponent, resolve: { draft : DraftResolver}},
      { path: ':id/actions', component: ActionsComponent, resolve: { draft : DraftResolver}},
      { path: ':id/reports', component: ReportsComponent, resolve: { draft: DraftResolver }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(draftRoutes)],
  exports: [RouterModule]
})
export class DraftsRoutingModule {}
