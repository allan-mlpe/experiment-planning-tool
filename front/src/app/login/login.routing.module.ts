import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login.component';
import {BlankLayoutComponent} from '../shared/layouts/blank-layout/blank-layout.component';
import {RecoveryPasswordComponent} from "./recovery-password/recovery-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const loginRoute: Routes = [
    {
        path: '', component: BlankLayoutComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'recovery', component: RecoveryPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(loginRoute)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}
