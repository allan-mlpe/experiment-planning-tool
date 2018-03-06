import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { CanDeactivateFormGuard } from './guards/candeactivate-form.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    CanDeactivateFormGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
