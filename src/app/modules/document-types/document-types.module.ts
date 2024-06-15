import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypesRoutingModule } from './document-types-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PrimeModule } from 'src/app/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    DocumentTypesRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DocumentTypesModule { }
