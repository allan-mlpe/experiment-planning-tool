import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { BlankLayoutComponent } from '../shared/layouts/blank-layout/blank-layout.component';

const loginRoute: Routes = [
    { 
        path: '', component: BlankLayoutComponent,
        children: [
            { path: '', component: LoginComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(loginRoute)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}