import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accessModeType'
})
export class AccessModeTypePipe implements PipeTransform {
  accessMode!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.accessMode = "Auditory"
        break;
      case 2:
        this.accessMode = "Colour"
        break;
      case 3:
        this.accessMode = "Item Size"
        break;
      case 4:
        this.accessMode = "Olfactory"
        break;
      case 5:
        this.accessMode = "Orientation"
        break;
      case 6:
        this.accessMode = "Position"
        break;
      case 7:
        this.accessMode = "Tactile"
        break;
      case 8:
        this.accessMode = "Text On Image"
        break;
      case 9:
        this.accessMode = "Textual"
        break;
      case 10:
        this.accessMode = "Visual"
        break;
      default:
        this.accessMode = "Auditory"
        break;
    }

    return this.accessMode;
  }
}
