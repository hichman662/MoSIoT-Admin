import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';

@Component({
  selector: 'device-command',
  templateUrl: './device-command.component.html',
  styleUrls: ['./device-command.component.scss']
})
export class DeviceCommandComponent implements OnInit {
  device!:DeviceTemplate;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
  }

  details(id:number){
    this.router.navigate(["DeviceTemplate/" + this.device.Name + "/Command/" + id]);
  }

  createCommand(){
    this.router.navigateByUrl("DeviceTemplate/"+ this.device.Name +"/Command/New Command/Edit");
  }

}
