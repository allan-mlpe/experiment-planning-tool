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
import { AssessmentListComponent } from '../assessment-list/assessment-list.component';
import { CheckboxListComponent } from '../checkbox-list/checkbox-list.component';
import { InputFieldErrorComponent } from '../input-field-error/input-field-error.component';
import { WizardComponent } from '../wizard/wizard.component';
import { RadioListComponent } from '../radio-list/radio-list.component';
import { SpinnerComponent } from '../spinner/spinner.component';

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
    BasicFooterComponent,
    AssessmentListComponent,
    CheckboxListComponent,
    InputFieldErrorComponent,
    WizardComponent,
    RadioListComponent,
    SpinnerComponent
  ],
  exports: [
    BlankLayoutComponent,
    BasicLayoutComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    ConfirmModalComponent,
    BasicFooterComponent,
    AssessmentListComponent,
    CheckboxListComponent,
    InputFieldErrorComponent,
    WizardComponent,
    RadioListComponent,
    SpinnerComponent
  ]
})
export class LayoutsModule { }
