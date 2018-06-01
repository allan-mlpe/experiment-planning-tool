import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./profile.component";
import {BasicLayoutComponent} from "../shared/layouts/basic-layout/basic-layout.component";
import {AuthGuard} from "../guards/auth.guard";
import {UserResolver} from "../guards/user.resolver";

const profileRoutes: Routes = [
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: '', component: ProfileComponent, canActivate: [AuthGuard], resolve: {user: UserResolver}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
