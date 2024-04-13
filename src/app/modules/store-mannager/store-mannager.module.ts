import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreMannagerRoutingModule } from './store-mannager-routing.module';
import { PrimeModule } from 'src/app/prime.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    StoreMannagerRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoreMannagerModule { }
