import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PrimeModule } from 'src/app/prime.module';
import { TableComponent } from './components/table/table.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ToolbarComponent,
    TableComponent
  ],
  exports: [
    ToolbarComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    PrimeModule,
    FormsModule
  ]
})
export class ExpensesModule { }
