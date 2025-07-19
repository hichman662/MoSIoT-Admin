import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clinicalStatus'
})
export class ClinicalStatusPipe implements PipeTransform {
  type!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.type = "active"
        break;
      case 2:
        this.type = "recurrrence"
        break;
      case 3:
        this.type = "release"
        break;
      case 4:
        this.type = "inactive"
        break;
      case 5:
        this.type = "remission"
        break;
      case 6:
        this.type = "resolved"
        break;
      default:
        this.type = "active"
        break;
    }
    
    return this.type;
  }

}
