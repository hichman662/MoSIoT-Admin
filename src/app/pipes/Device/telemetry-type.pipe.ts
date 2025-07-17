import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telemetryType'
})
export class TelemetryTypePipe implements PipeTransform {
  telemetryType!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.telemetryType = "State"
        break;
      case 2:
        this.telemetryType = "Event"
        break;
      case 3:
        this.telemetryType = "Location"
        break;
      case 4:
        this.telemetryType = "Sensor"
        break;
      default:
        this.telemetryType = "State"
        break;
    }
    return this.telemetryType;
  }

}
