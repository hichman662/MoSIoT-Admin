import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { DeviceTemplateService } from 'src/app/services/device-template.service';
import { SweetAlertsComponent } from '../shared/sweet-alerts/sweet-alerts.component';

@Component({
  selector: 'app-device-template',
  templateUrl: './device-template.component.html',
  styleUrls: ['./device-template.component.scss']
})
export class DeviceTemplateComponent implements OnInit {
  deviceTemplates!: DeviceTemplate[];
  cargando!:boolean;
  token!:string;

  constructor(private sweetAlert:SweetAlertsComponent, private router: Router, private deviceTemplateService: DeviceTemplateService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')!;
    if(this.token == null || this.token == ''){
      this.sweetAlert.loginRequired();
    }

    else{
      this.cargando = true;

      this.deviceTemplateService.getAllDeviceTemplate().subscribe({
        next: result => {
          this.deviceTemplates = result;
        },
        error: error => {
          this.cargando = false;
          this.sweetAlert.readError("devices",error);
        },
        complete: () => {
          localStorage.setItem('devices',JSON.stringify(this.deviceTemplates));
          this.cargando = false;
        }
      })
    }
  }

  details(id:number){
    this.router.navigate(["DeviceTemplate/" + id]);
  }

  createDevice(){
    this.router.navigateByUrl("DeviceTemplate/" + -999 + "/EditProfile");
  }

}
