import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { LayoutsModule } from '../shared/layouts/layouts.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutsModule
  ],
  declarations: [BannerComponent, HomeComponent]
})
export class HomeModule { }
