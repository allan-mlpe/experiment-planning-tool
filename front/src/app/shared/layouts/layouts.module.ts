import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicLayoutComponent} from './basic-layout/basic-layout.component';
import {BlankLayoutComponent} from './blank-layout/blank-layout.component';
import {SharedModule} from '../shared.module';
import {RouterModule} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';
import {NavbarComponent} from '../navbar/navbar.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {BasicFooterComponent} from '../basic-footer/basic-footer.component';
import {AssessmentListComponent} from '../assessment-list/assessment-list.component';
import {CheckboxListComponent} from '../checkbox-list/checkbox-list.component';
import {InputFieldErrorComponent} from '../input-field-error/input-field-error.component';
import {WizardComponent} from '../wizard/wizard.component';
import {RadioListComponent} from '../radio-list/radio-list.component';
import {SpinnerComponent} from '../spinner/spinner.component';
import {InfoTooltipComponent} from "../info-tooltip/info-tooltip.component";
import {ChipComponent} from '../chip/chip.component';
import {ForbiddenComponent} from '../forbidden/forbidden.component';
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {ReportsComponent} from "../reports/reports.component";
import {CharacterizationComponent} from '../characterization/characterization.component';
import {DiscoveryComponent} from '../discovery/discovery.component';
import {ThreatClassificationComponent} from '../threat-classification/threat-classification.component';
import { CustomThreatModalComponent } from '../custom-threat-modal/custom-threat-modal.component';

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
    SpinnerComponent,
    InfoTooltipComponent,
    ChipComponent,
    PageNotFoundComponent,
    ForbiddenComponent,
    ReportsComponent,
    CharacterizationComponent,
    DiscoveryComponent,
    ThreatClassificationComponent,
    CustomThreatModalComponent
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
    SpinnerComponent,
    InfoTooltipComponent,
    ChipComponent,
    ReportsComponent,
    CharacterizationComponent,
    DiscoveryComponent,
    ThreatClassificationComponent,
    CustomThreatModalComponent
  ]
})
export class LayoutsModule { }
