import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'patientSeverity'
})
export class PatientSeverityPipe implements PipeTransform {
  severity!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.severity = "severe"
        break;
      case 2:
        this.severity = "moderate"
        break;
      case 3:
        this.severity = "mild"
        break;
      default:
        this.severity = "severe"
        break;
    }
    return this.severity;
  }

}
