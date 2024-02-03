import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourFormat',
})
export class HourFormatPipe implements PipeTransform {
  transform(value: number): string {
    const hour = ('0' + value).slice(-2);
    const minute = '00';
    return hour + ':' + minute;
  }
}
