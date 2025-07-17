import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeActivity'
})
export class TypeActivityPipe implements PipeTransform {
  activity!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.activity = "medication"
        break;
      case 2:
        this.activity = "nutrition Order"
        break;
      case 3:
        this.activity = "comunication"
        break;
      case 4:
        this.activity = "appointment"
        break;
      case 5:
        this.activity = "sport Activity"
        break;
      default:
        this.activity = "medication"
        break;
    }

    return this.activity;
  }
}
