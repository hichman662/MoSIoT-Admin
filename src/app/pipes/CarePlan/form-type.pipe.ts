import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formType'
})
export class FormTypePipe implements PipeTransform {
  form!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.form = "tablet"
        break;
      case 2:
        this.form = "powder"
        break;
      case 3:
        this.form = "capsule"
        break;
      default:
        this.form = "tablet"
        break;
    }

    return this.form;
  }
}
