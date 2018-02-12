import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BasicLayoutComponent } from '../shared/layouts/basic-layout/basic-layout.component';
import { ProjectsComponent } from './projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';

const loginRoute: Routes = [
    { 
        path: '', component: BasicLayoutComponent,
        children: [
            { path: '', component: ProjectsComponent },
            { path: 'create', component: CreateProjectComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(loginRoute)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule {}