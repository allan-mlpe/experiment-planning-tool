import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { 
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
