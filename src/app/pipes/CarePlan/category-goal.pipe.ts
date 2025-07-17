import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryGoal'
})
export class CategoryGoalPipe implements PipeTransform {
  goal!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.goal = "dietary"
        break;
      case 2:
        this.goal = "safety"
        break;
      case 3:
        this.goal = "behavioral"
        break;
      case 4:
        this.goal = "physiotherapy"
        break;
      default:
        this.goal = "dietary"
        break;
    }

    return this.goal;
  }

}
