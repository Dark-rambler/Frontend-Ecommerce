import { NgModule } from '@angular/core';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';

@NgModule({
  exports: [
    ToastModule,
    ButtonModule,
    MenubarModule,
    DataViewModule,
    RatingModule,
    CardModule,
  ],

})
export class PrimeModule { }
