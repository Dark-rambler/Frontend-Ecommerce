import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { TableComponent } from './components/table/table.component';
import { PrimeModule } from 'src/app/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './components/chart/chart.component';


@NgModule({
  declarations: [
    TableComponent,
    ChartComponent
  ],
  exports: [
    TableComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }
