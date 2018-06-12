import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRoutingModule} from './login.routing.module';
import {LoginComponent} from './login.component';
import {LayoutsModule} from '../shared/layouts/layouts.module';
import {SharedModule} from '../shared/shared.module';
import {RecoveryPasswordComponent} from './recovery-password/recovery-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {CreateAccountComponent} from './create-account/create-account.component';
import {UserService} from "../services/user.service";

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
    ResetPasswordComponent,
    CreateAccountComponent
  ],
  providers: [
    UserService
  ]
})
export class LoginModule { }
