import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToString'
})
export class BooleanToStringPipe implements PipeTransform {

  transform(value: boolean): string {
    if(value) return "ON";
    else return "OFF";
  }

}
