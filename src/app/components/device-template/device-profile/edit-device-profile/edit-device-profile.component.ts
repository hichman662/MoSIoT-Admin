import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { DeviceTemplateService } from 'src/app/services/device-template.service';
import { Validators } from '@angular/forms';
import { DeviceTemplateAdapterComponent } from 'src/app/adapters/device-template-adapter/device-template-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';

@Component({
  selector: 'app-edit-device-profile',
  templateUrl: './edit-device-profile.component.html',
  styleUrls: ['./edit-device-profile.component.scss']
})
export class EditDeviceProfileComponent implements OnInit {
  devices!:DeviceTemplate[];
  device!:DeviceTemplate;
  isNew:boolean = false;
  idDevice!:number;

  deviceProfileForm = this.fb.group({
    Name:['',Validators.required],
    Type:['', Validators.required],
    IsEdge:[''],
  })

  get Name() { return this.deviceProfileForm.get('Name'); }
  get Type() { return this.deviceProfileForm.get('Type'); }
  get IsEdge() { return this.deviceProfileForm.get('IsEdge'); }
  
  constructor(private fb:FormBuilder, private deviceService:DeviceTemplateService, private router:Router, private deviceTemplateAdapter: DeviceTemplateAdapterComponent,
    private activatedRoute: ActivatedRoute, private sweetAlert: SweetAlertsComponent) { }

  ngOnInit(): void {
    this.devices = JSON.parse('' + localStorage.getItem('devices'));
    this.activatedRoute.params.subscribe((params: Params) => this.idDevice = params['deviceId']);
    console.log(this.idDevice + 'id device');
    this.device = this.devices.find(device => device.Id == this.idDevice)!;

    //If not exists, create new
    if(this.device == undefined){      
      this.isNew = true;
      this.initDefaults();
    }
    
    this.deviceProfileForm.setValue({Name: this.device.Name, Type: this.device.Type, IsEdge: this.device.IsEdge});
  }

  initDefaults(){
    this.device = {
      Id: 0,
      IsEdge: false,
      Name: "",
      Type: 1
    }
  }

  editDeviceProfile(){
    this.device.Name = this.deviceProfileForm.get('Name')?.value
    this.device.IsEdge = this.deviceProfileForm.get('IsEdge')?.value
    this.device.Type = this.deviceProfileForm.get('Type')?.value

    if(this.isNew){
      this.deviceService.createDeviceTemplate(this.deviceTemplateAdapter.newDevice(this.device)).subscribe({
        next: result => {
          this.device = result;
        },
        error: error => {
          this.sweetAlert.createError("device",error);
        },
        complete: () => {
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/ " + this.device.Id);
          
          this.sweetAlert.createSuccess("device");
        }
      })
    }
    else{
      this.deviceService.updateDeviceTemplate(this.device.Id,this.device).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/ " + this.device.Id);
          
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelDeviceProfile(){
    this.router.navigateByUrl("DeviceTemplate");
  }
}
