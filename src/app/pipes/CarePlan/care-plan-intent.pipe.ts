import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carePlanIntent'
})
export class CarePlanIntentPipe implements PipeTransform {
  intent!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.intent = "proposal"
        break;
      case 2:
        this.intent = "plan"
        break;
      case 3:
        this.intent = "order"
        break;
      case 4:
        this.intent = "option"
        break;
      default:
        this.intent = "proposal"
        break;
    }

    return this.intent;
  }
}
