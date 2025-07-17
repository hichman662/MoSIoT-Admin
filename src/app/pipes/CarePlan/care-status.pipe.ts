import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'careStatus'
})
export class CareStatusPipe implements PipeTransform {
  status!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.status = "draft"
        break;
      case 2:
        this.status = "active"
        break;
      case 3:
        this.status = "on Hold"
        break;
      case 4:
        this.status = "revoked"
        break;
      case 5:
        this.status = "completed"
        break;
      case 6:
        this.status = "canceled"
        break;
      default:
        this.status = "draft"
        break;
    }

    return this.status;
  }
}
