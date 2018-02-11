import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace.routing.module';
import { WorkspaceComponent } from './workspace.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutingModule
  ],
  declarations: [
    WorkspaceComponent, 
    SidebarComponent
  ]
})
export class WorkspaceModule { }
