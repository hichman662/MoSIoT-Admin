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
    name:['',Validators.required],
    type:['', Validators.required],
    isEdge:[''],
  })

  get name() { return this.deviceProfileForm.get('name'); }
  get type() { return this.deviceProfileForm.get('type'); }
  get isEdge() { return this.deviceProfileForm.get('isEdge'); }
  
  constructor(private fb:FormBuilder, private deviceService:DeviceTemplateService, private router:Router, private deviceTemplateAdapter: DeviceTemplateAdapterComponent,
    private activatedRoute: ActivatedRoute, private sweetAlert: SweetAlertsComponent) { }

  ngOnInit(): void {
    this.devices = JSON.parse('' + localStorage.getItem('devices'));
    this.activatedRoute.params.subscribe((params: Params) => this.idDevice = params['deviceId']);
    console.log(this.idDevice + 'id device');
    this.device = this.devices.find(device => device.id == this.idDevice)!;

    //If not exists, create new
    if(this.device == undefined){      
      this.isNew = true;
      this.initDefaults();
    }
    
    this.deviceProfileForm.setValue({name: this.device.name, type: this.device.type, isEdge: this.device.isEdge});
  }

  initDefaults(){
    this.device = {
      id: 0,
      isEdge: false,
      name: "",
      type: 1
    }
  }

  editDeviceProfile(){
    this.device.name = this.deviceProfileForm.get('name')?.value
    this.device.isEdge = this.deviceProfileForm.get('isEdge')?.value
    this.device.type = this.deviceProfileForm.get('type')?.value

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
          this.router.navigateByUrl("DeviceTemplate/ " + this.device.id);
          
          this.sweetAlert.createSuccess("device");
        }
      })
    }
    else{
      this.deviceService.updateDeviceTemplate(this.device.id,this.device).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/ " + this.device.id);
          
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelDeviceProfile(){
    this.router.navigateByUrl("DeviceTemplate");
  }
}
