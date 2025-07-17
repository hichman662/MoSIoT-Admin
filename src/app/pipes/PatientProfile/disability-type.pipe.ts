import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'disabilityType'
})
export class DisabilityTypePipe implements PipeTransform {
  disabilityType!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.disabilityType = "Auditory"
        break;
      case 2:
        this.disabilityType = "Cognitive"
        break;
      case 3:
        this.disabilityType = "Physical"
        break;
      case 4:
        this.disabilityType = "Speech"
        break;
      case 5:
        this.disabilityType = "Visual"
        break;
      default:
        this.disabilityType = "Auditory"
        break;
    }
    return this.disabilityType;
  }

}
