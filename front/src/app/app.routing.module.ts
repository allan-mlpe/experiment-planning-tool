import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {BlankLayoutComponent} from './shared/layouts/blank-layout/blank-layout.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {ShowLoginGuard} from "./guards/show-login.guard";
import {ForbiddenComponent} from "./shared/forbidden/forbidden.component";
import {BasicLayoutComponent} from "./shared/layouts/basic-layout/basic-layout.component";
import {ReferencesComponent} from "./references/references.component";

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
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'plans',
    loadChildren: 'app/plans/plans.module#PlansModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'drafts',
    loadChildren: 'app/drafts/drafts.module#DraftsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'reviews',
    loadChildren: 'app/reviews/reviews.module#ReviewsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'references',
    component: BasicLayoutComponent,
    children: [
      { path: '**', component: ReferencesComponent }
    ]
  },
  {
    path: 'forbidden',
    component: BlankLayoutComponent,
    children: [
      { path: '**', component: ForbiddenComponent }
    ]
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
