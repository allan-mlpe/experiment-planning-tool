import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login.routing.module';
import { LoginComponent } from './login.component';
import { LayoutsModule } from '../shared/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    LayoutsModule,
    FormsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
