import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityType'
})
export class PriorityTypePipe implements PipeTransform {
  priority!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.priority = "high"
        break;
      case 2:
        this.priority = "medium"
        break;
      case 3:
        this.priority = "low"
        break;
      default:
        this.priority = "high"
        break;
    }

    return this.priority;
  }
}
