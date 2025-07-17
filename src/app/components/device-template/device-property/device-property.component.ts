import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';

@Component({
  selector: 'device-property',
  templateUrl: './device-property.component.html',
  styleUrls: ['./device-property.component.scss']
})
export class DevicePropertyComponent implements OnInit {
  device!:DeviceTemplate;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
  }

  details(id:number){
    this.router.navigate(["DeviceTemplate/" + this.device.Name + "/Property/" + id]);
  }

  createProperty(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.Name + "/Property/" + -999 + "/Edit");
  }
}
