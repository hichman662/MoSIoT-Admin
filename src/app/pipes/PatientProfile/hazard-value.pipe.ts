import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hazardValue'
})
export class HazardValuePipe implements PipeTransform {
  hazardValue!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.hazardValue = "flashing"
        break;
      case 2:
        this.hazardValue = "motion Simulation"
        break;
      case 3:
        this.hazardValue = "olfactory Hazard"
        break;
      case 4:
        this.hazardValue = "sound"
        break;
      default:
        this.hazardValue = "flashing"
        break;
    }
    return this.hazardValue;
  }
}
