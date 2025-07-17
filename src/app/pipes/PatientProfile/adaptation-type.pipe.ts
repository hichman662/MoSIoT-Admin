import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adaptationType'
})
export class AdaptationTypePipe implements PipeTransform {
  adaptationType!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.adaptationType = "Alternative Text"
        break;
      case 2:
        this.adaptationType = "Audio Description"
        break;
      case 3:
        this.adaptationType = "Captions"
        break;
      case 4:
        this.adaptationType = "e_book"
        break;
      case 5:
        this.adaptationType = "Haptic"
        break;
      case 6:
        this.adaptationType = "High Contrast"
        break;
      case 7:
        this.adaptationType = "Long Description"
        break;
      case 8:
        this.adaptationType = "Sign Language"
        break;
      case 9:
        this.adaptationType = "Transcript"
        break;
      default:
        this.adaptationType = "Alternative Text"
        break;
    }
    return this.adaptationType;
  }

}
