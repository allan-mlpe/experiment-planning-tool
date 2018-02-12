import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { BasicLayoutComponent } from '../shared/layouts/basic-layout/basic-layout.component';

const loginRoute: Routes = [
    { 
        path: '', component: BasicLayoutComponent,
        children: [
            { path: '', component: WorkspaceComponent }
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(loginRoute)],
    exports: [RouterModule]
})
export class WorkspaceRoutingModule {}