import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diseaseType'
})
export class DiseaseTypePipe implements PipeTransform {
  type!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.type = "Alzheimer"
        break;
      case 2:
        this.type = "Parkinson"
        break;
      case 3:
        this.type = "Cancer"
        break;
      case 4:
        this.type = "Heart Disease"
        break;
      case 5:
        this.type = "Obesity"
        break;
      case 6:
        this.type = "Diabetes"
        break;
      case 7:
        this.type = "Epilepsy"
        break;
      case 8:
        this.type = "Apnea_Sleep"
        break;
      case 9:
        this.type = "Narcolepsy"
        break;
      case 10:
        this.type = "Eating disorders"
        break;
      case 11:
        this.type = "Osteoporosis"
        break;
      case 12:
        this.type = "Asthma"
        break;
      case 13:
        this.type = "Fibrosis"
        break;
      case 14:
        this.type = "Oral Health"
        break;
      default:
        this.type = "Alzheimer"
        break;
    }
    
    return this.type;
  }

}
