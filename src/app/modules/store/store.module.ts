import { NgModule } from '@angular/core';

import { StoreRoutingModule } from './store-routing.module';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { PrimeModule } from 'src/app/prime.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductViewComponent
  ],
  exports: [
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StoreModule { }
