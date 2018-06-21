import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutsModule} from '../shared/layouts/layouts.module';
import {SharedModule} from '../shared/shared.module';

import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard.routing.module";

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    SharedModule,
    LayoutsModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: []
})
export class DashboardModule { }
