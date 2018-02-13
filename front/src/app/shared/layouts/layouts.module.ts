import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { BasicFooterComponent } from '../basic-footer/basic-footer.component';

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
    SidebarComponent,
    ConfirmModalComponent,
    BasicFooterComponent
  ],
  exports: [
    BlankLayoutComponent,
    BasicLayoutComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    ConfirmModalComponent,
    BasicFooterComponent
  ]
})
export class LayoutsModule { }
