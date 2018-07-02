import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RestService} from '../services/rest.service';
import {MaterializeModule} from 'angular2-materialize';
import {ModalService} from '../services/modal.service';
import {PlanStatusPipe} from "../pipes/plan-status.pipe";
import {TruncateTextPipe} from "../pipes/truncate-text.pipe";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterializeModule
  ],
  declarations: [
    PlanStatusPipe,
    TruncateTextPipe
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PlanStatusPipe,
    TruncateTextPipe
  ],
  providers: [
    RestService,
    ModalService
  ]
})
export class SharedModule { }
