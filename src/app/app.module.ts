import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeModule } from './prime.module';
import { LoaderComponent } from './shared/loader/loader.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HeaderComponent,
    LoaderComponent,
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
