import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatFieldBooleanPipe } from './format-field-boolean.pipe';
import { FormatFieldDatePipe } from './format-field-date.pipe';
import { FormatFieldStatusPipe } from './format-field-status.pipe';
import { FormatSafeLinkPipe } from './format-safe-link.pipe';
import { FormatFieldEnumPipe } from './format-field-enum.pipe';



@NgModule({
  declarations: [
    FormatFieldBooleanPipe,
    FormatFieldDatePipe,
    FormatFieldStatusPipe,
    FormatSafeLinkPipe,
    FormatFieldEnumPipe
  ],
  imports: [CommonModule],
  exports: [
    FormatFieldBooleanPipe,
    FormatFieldDatePipe,
    FormatFieldStatusPipe,
    FormatSafeLinkPipe,
    FormatFieldEnumPipe
  ],
})
export class PipesModule { }
