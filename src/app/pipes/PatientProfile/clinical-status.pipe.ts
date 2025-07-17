import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clinicalStatus'
})
export class ClinicalStatusPipe implements PipeTransform {
  type!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.type = "Active"
        break;
      case 2:
        this.type = "Recurrrence"
        break;
      case 3:
        this.type = "Release"
        break;
      case 4:
        this.type = "Inactive"
        break;
      case 5:
        this.type = "Remission"
        break;
      case 6:
        this.type = "Resolved"
        break;
      default:
        this.type = "Active"
        break;
    }
    
    return this.type;
  }

}
