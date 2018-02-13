import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  { 
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'workspace',
    loadChildren: 'app/workspace/workspace.module#WorkspaceModule',
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'projects',
    loadChildren: 'app/projects/projects.module#ProjectsModule',
    canActivate: [AuthGuardGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
