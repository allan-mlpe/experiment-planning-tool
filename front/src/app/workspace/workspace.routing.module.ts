import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { BasicLayoutComponent } from '../shared/layouts/basic-layout/basic-layout.component';
import { ActionsComponent } from './actions/actions.component';
import { ThreatsComponent } from './threats/threats.component';
import { CharacteristicsComponent } from './characteristics/characteristics.component';
import { ReportsComponent } from './reports/reports.component';

const loginRoute: Routes = [
    { 
        path: '', component: BasicLayoutComponent,
        children: [
            { path: ':id', component: WorkspaceComponent },
            { path: ':id/characteristics', component: CharacteristicsComponent },
            { path: ':id/threats', component: ThreatsComponent},
            { path: ':id/actions', component: ActionsComponent},
            { path: ':id/reports', component: ReportsComponent }
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(loginRoute)],
    exports: [RouterModule]
})
export class WorkspaceRoutingModule {}