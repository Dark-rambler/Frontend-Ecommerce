import { Directive, Input, ElementRef, Renderer2, HostBinding, OnInit, OnChanges } from '@angular/core';
import { isDateDBFormatValid, toDMYdateFormat } from '../utils/date-formats';

@Directive({
  selector: '[appFormatValue]',
  standalone: true,
})
export class AppFormatValueDirective implements OnChanges {

  @Input('appFormatValue') value: Date | string | number;
  @Input('appFormatvalueType') valueType: any;
  @HostBinding('textContent') textContent: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    switch(this.valueType) {
      case 'boolean':
        this.handleBooleanValue();
        break;
      case 'object':
        this.handleObjectValue();
        break;
      case 'string':
        this.handleStringValue();
        break;
      default:
        this.handleDefaultValue();
    }
  }

  private handleBooleanValue() {
    this.textContent = this.value ? 'SI' : 'NO';
  }

  private handleObjectValue() {
    const stringValue = this.value.toString();
    this.textContent = isDateDBFormatValid(stringValue) ? toDMYdateFormat(stringValue) : '';
  }

  private handleStringValue() {
    const stringValue = this.value.toString();
    this.textContent = isDateDBFormatValid(stringValue) ? toDMYdateFormat(stringValue) : stringValue;
  }

  private handleDefaultValue() {
    this.textContent = this.value.toString();
  }
}
