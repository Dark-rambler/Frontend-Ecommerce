import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFieldStatus'
})
export class FormatFieldStatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value === 'assigned' ? 'Asignado' : 'Devuelto';
  }

}
