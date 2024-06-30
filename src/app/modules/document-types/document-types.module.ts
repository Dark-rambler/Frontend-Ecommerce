import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTypesRoutingModule } from './document-types-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PrimeModule } from 'src/app/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { ModalFormsComponent } from './components/modal-forms/modal-forms.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    TableComponent,
    ModalFormsComponent
  ],
  exports: [
    ToolbarComponent,
    TableComponent,
    ModalFormsComponent
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
