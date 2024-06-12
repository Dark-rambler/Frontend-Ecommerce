import { NgModule } from '@angular/core';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
  exports: [
    ToastModule,
    ButtonModule,
    MenubarModule,
    DataViewModule,
    RatingModule,
    CardModule,
    TagModule,
    ToolbarModule,
    SplitButtonModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
  ],

})
export class PrimeModule { }
