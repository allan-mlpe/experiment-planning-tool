import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BlankLayoutComponent } from '../shared/layouts/blank-layout/blank-layout.component';

const loginRoute: Routes = [
    { 
        path: '', component: BlankLayoutComponent, 
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(loginRoute)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}