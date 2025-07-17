import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telemetryUnitType'
})
export class TelemetryUnitTypePipe implements PipeTransform {
  unitType!:string;
  
  transform(value: number): string {
    switch(value){
      case 1:
        this.unitType = "Percent"
        break;
      case 2:
        this.unitType = "Degree farenheit"
        break;
      case 3:
        this.unitType = "Degree celsius"
        break;
      case 4:
        this.unitType = "Geolocation"
        break;
      case 5:
        this.unitType = "Steps"
        break;
      case 6:
        this.unitType = "Beats per minute"
        break;
    }

    return this.unitType;
  }

}
