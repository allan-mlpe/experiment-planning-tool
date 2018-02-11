import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    BasicLayoutComponent, 
    BlankLayoutComponent
  ],
  exports: [
    BlankLayoutComponent,
    BasicLayoutComponent
  ]
})
export class LayoutsModule { }
