import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace.routing.module';
import { WorkspaceComponent } from './workspace.component';
import { LayoutsModule } from '../shared/layouts/layouts.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    LayoutsModule,
    SharedModule
  ],
  declarations: [
    WorkspaceComponent
  ]
})
export class WorkspaceModule { }
