import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileRoutingModule} from "./profile.routing.module";
import {LayoutsModule} from "../shared/layouts/layouts.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    LayoutsModule,
    SharedModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
