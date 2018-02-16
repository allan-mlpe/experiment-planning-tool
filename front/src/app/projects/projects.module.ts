import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { LayoutsModule } from '../shared/layouts/layouts.module';
import { ProjectsRoutingModule } from './projects.routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectService } from '../services/project.service';
import { MaterializeModule } from 'angular2-materialize';

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
    CreateProjectComponent
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectsModule { }
