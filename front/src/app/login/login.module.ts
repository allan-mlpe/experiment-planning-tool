import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login.routing.module';
import { LoginComponent } from './login.component';
import { LayoutsModule } from '../shared/layouts/layouts.module';
import { SharedModule } from '../shared/shared.module';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    LayoutsModule
  ],
  declarations: [
    LoginComponent,
    RecoveryPasswordComponent
  ]
})
export class LoginModule { }
