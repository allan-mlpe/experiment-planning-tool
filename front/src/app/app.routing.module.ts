import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

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
    loadChildren: 'app/workspace/workspace.module#WorkspaceModule'
  },
  {
    path: 'projects',
    loadChildren: 'app/projects/projects.module#ProjectsModule'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
