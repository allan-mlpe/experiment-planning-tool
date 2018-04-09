import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./profile.component";
import {BasicLayoutComponent} from "../shared/layouts/basic-layout/basic-layout.component";

const profileRoutes: Routes = [
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: '', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
