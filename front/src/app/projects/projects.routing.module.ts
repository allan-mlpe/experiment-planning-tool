import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BasicLayoutComponent } from '../shared/layouts/basic-layout/basic-layout.component';
import { ProjectsComponent } from './projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CanDeactivateFormGuard } from '../guards/candeactivate-form.guard';
import {WorkspaceComponent} from "./workspace/workspace.component";
import {ThreatsComponent} from "./threats/threats.component";
import {ReportsComponent} from "./reports/reports.component";
import {ActionsComponent} from "./actions/actions.component";
import {CharacteristicsComponent} from "./characteristics/characteristics.component";
import {ProjectResolver} from "../guards/project.resolver";

const projectRoutes: Routes = [
    {
        path: '', component: BasicLayoutComponent,
        children: [
            { path: '', component: ProjectsComponent },
            { path: 'create', component: CreateProjectComponent, canDeactivate: [CanDeactivateFormGuard] },
            { path: ':id/workspace', component: WorkspaceComponent, resolve: { project: ProjectResolver} },
            { path: ':id/characteristics', component: CharacteristicsComponent },
            { path: ':id/threats', component: ThreatsComponent},
            { path: ':id/actions', component: ActionsComponent},
            { path: ':id/reports', component: ReportsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(projectRoutes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule {}
