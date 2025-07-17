import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {
  language!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.language = "ES"
        break;
      case 2:
        this.language = "EN"
        break;
      case 3:
        this.language = "FR"
        break;
      case 4:
        this.language = "IT"
        break;
      case 5:
        this.language = "PR"
        break;
      case 6:
        this.language = "DE"
        break;
      case 7:
        this.language = "JA"
        break;
      case 8:
        this.language = "KO"
        break;
      case 9:
        this.language = "ZH"
        break;
      default:
        this.language = "ES"
        break;
    }
    return this.language;
  }

}
