import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login.routing.module';
import {LoginComponent} from './login.component';
import {LayoutsModule} from '../shared/layouts/layouts.module';
import {SharedModule} from '../shared/shared.module';
import {RecoveryPasswordComponent} from './recovery-password/recovery-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    LayoutsModule
  ],
  declarations: [
    LoginComponent,
    RecoveryPasswordComponent,
    ResetPasswordComponent
  ]
})
export class LoginModule { }
