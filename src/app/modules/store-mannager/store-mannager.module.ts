import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreMannagerRoutingModule } from './store-mannager-routing.module';
import { PrimeModule } from 'src/app/prime.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    StoreMannagerRoutingModule,
    PrimeModule
  ]
})
export class StoreMannagerModule { }
