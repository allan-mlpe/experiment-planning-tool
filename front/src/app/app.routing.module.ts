import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BlankLayoutComponent } from './shared/layouts/blank-layout/blank-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ShowLoginGuard} from "./guards/show-login.guard";

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
    canActivate: [ShowLoginGuard]
  },
  /*{
    path: 'workspace',
    loadChildren: 'app/workspace/workspace.module#WorkspaceModule',
    canActivate: [AuthGuard]
  },*/
  {
    path: 'plans',
    loadChildren: 'app/plans/plans.module#PlansModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: BlankLayoutComponent,
    children: [
      { path: '**', component: PageNotFoundComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
