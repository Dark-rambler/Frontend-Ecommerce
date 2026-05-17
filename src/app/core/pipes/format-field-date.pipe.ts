import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../enviroments/enviroment.development';
const formatDate = 'DD/MM/YYYY';

@Pipe({
  name: 'formatFieldDate',
})
export class FormatFieldDatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return moment(value).format(environment.formatDate);
  }
}
