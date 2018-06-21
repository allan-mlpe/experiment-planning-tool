import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BasicLayoutComponent} from "../shared/layouts/basic-layout/basic-layout.component";
import {DashboardComponent} from "./dashboard.component";

const dashboardRoutes: Routes = [
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
