import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PrimeModule } from 'src/app/prime.module';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ExpensesRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExpensesModule { }
