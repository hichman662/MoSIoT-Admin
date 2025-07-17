import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commandType'
})
export class CommandTypePipe implements PipeTransform {
  commandType!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.commandType = "create";
        break;
      case 2:
        this.commandType = "execute";
        break;
      case 3:
        this.commandType = "delete";
        break;
      case 4:
        this.commandType = "update";
        break;
      case 5:
        this.commandType = "Get By ID";
        break;
      case 6:
        this.commandType = "Get Property";
        break;
      case 7:
        this.commandType = "Set Property";
        break;
      case 8:
        this.commandType = "List";
        break;
      case 9:
        this.commandType = "reboot";
        break;
      case 10:
        this.commandType = "login";
        break;
      default:
        this.commandType = "create";
        break;
    }

    return this.commandType;
  }
}
