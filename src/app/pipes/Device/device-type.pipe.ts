import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceType'
})
export class DeviceTypePipe implements PipeTransform {
  deviceType!:string;

  transform(value: number): string {
    switch(value){
      case 1:
        this.deviceType = "Sensor";
        break;
      case 2:
        this.deviceType = "Acturator";
        break;
    }

    return this.deviceType;
  }
}
