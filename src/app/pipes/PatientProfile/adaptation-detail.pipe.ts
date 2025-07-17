import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adaptationDetail'
})
export class AdaptationDetailPipe implements PipeTransform {
  adaptationDetail!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.adaptationDetail = "Enhanced"
        break;
      case 2:
        this.adaptationDetail = "Real Time"
        break;
      case 3:
        this.adaptationDetail = "Record"
        break;
      case 4:
        this.adaptationDetail = "Symbolic"
        break;
      case 5:
        this.adaptationDetail = "Synthesized"
        break;
      case 6:
        this.adaptationDetail = "Verbatim"
        break;
      default:
        this.adaptationDetail = "Enhanced"
        break;
    }
    return this.adaptationDetail;
  }
}
