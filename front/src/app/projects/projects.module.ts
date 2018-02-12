import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { LayoutsModule } from '../shared/layouts/layouts.module';
import { ProjectsRoutingModule } from './projects.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    LayoutsModule
  ],
  declarations: [
    ProjectsComponent, 
    CreateProjectComponent
  ]
})
export class ProjectsModule { }
