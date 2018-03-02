import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RestService } from '../services/rest.service';
import { MaterializeModule } from 'angular2-materialize';
import { ModalService } from '../services/modal.service';

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
    
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    RestService,
    ModalService
  ]
})
export class SharedModule { }
