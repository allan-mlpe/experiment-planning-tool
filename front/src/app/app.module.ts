import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { CanDeactivateFormGuard } from './guards/candeactivate-form.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutsModule } from './shared/layouts/layouts.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    CanDeactivateFormGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
