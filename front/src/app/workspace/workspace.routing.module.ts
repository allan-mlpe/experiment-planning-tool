import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';

const loginRoute: Routes = [
    { path: '', component: WorkspaceComponent }
];

@NgModule({
    imports: [RouterModule.forChild(loginRoute)],
    exports: [RouterModule]
})
export class WorkspaceRoutingModule {}