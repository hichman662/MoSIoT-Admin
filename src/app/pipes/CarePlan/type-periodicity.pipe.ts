import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typePeriodicity'
})
export class TypePeriodicityPipe implements PipeTransform {

  periodicity!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.periodicity = "dailt"
        break;
      case 2:
        this.periodicity = "monthly"
        break;
      case 3:
        this.periodicity = "per hour"
        break;
      case 4:
        this.periodicity = "weekly"
        break;
      default:
        this.periodicity = "dailt"
        break;
    }

    return this.periodicity;
  }

}
