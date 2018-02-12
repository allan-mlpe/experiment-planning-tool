import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    BasicLayoutComponent, 
    BlankLayoutComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    BlankLayoutComponent,
    BasicLayoutComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class LayoutsModule { }
