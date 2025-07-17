import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'severity'
})
export class SeverityPipe implements PipeTransform {
  severity!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.severity = "Warning"
        break;
      case 2:
        this.severity = "Error"
        break;
      case 3:
        this.severity = "Info"
        break;
      default:
        this.severity = "" + value;
        break;
    }
    return this.severity;
  }

}
