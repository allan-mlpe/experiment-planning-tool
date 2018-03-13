import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BlankLayoutComponent } from './shared/layouts/blank-layout/blank-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  /*{
    path: 'workspace',
    loadChildren: 'app/workspace/workspace.module#WorkspaceModule',
    canActivate: [AuthGuard]
  },*/
  {
    path: 'projects',
    loadChildren: 'app/projects/projects.module#ProjectsModule',
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
