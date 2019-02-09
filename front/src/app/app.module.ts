import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { CanDeactivateFormGuard } from './guards/candeactivate-form.guard';
import { LayoutsModule } from './shared/layouts/layouts.module';
import { ShowLoginGuard } from "./guards/show-login.guard";
import { ReferencesComponent } from './references/references.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    ReferencesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutsModule
  ],
  providers: [
    AuthGuard,
    ShowLoginGuard,
    AuthService,
    CanDeactivateFormGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
