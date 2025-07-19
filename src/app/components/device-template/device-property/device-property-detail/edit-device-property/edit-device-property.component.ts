import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { DeviceTemplateAdapterComponent } from 'src/app/adapters/device-template-adapter/device-template-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { Property } from 'src/app/models/Device Template/property';
import { DeviceTemplateService } from 'src/app/services/device-template.service';

@Component({
  selector: 'app-edit-device-property',
  templateUrl: './edit-device-property.component.html',
  styleUrls: ['./edit-device-property.component.scss']
})
export class EditDevicePropertyComponent implements OnInit {
  device!:DeviceTemplate;
  property!:Property;
  id!:number;
  isNew:boolean = false;

  devicePropertyForm = this.fb.group({
    name:['',Validators.required],
    writable:[''],
    cloudable:['']
  })

  get name() { return this.devicePropertyForm.get('name'); }
  get writable() { return this.devicePropertyForm.get('writable'); }
  get cloudable() { return this.devicePropertyForm.get('cloudable'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private deviceService:DeviceTemplateService, 
    private router:Router, private activatedRoute: ActivatedRoute, private deviceAdapater: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['propertyId']);
    this.property = this.device.properties?.find(property => property.id == this.id)!;

    //If not exists create new one
    if(this.property == undefined){
      this.isNew = true;
      this.initDefaults();
    }

    this.devicePropertyForm.setValue({ name: this.property.name, writable: this.property.isWritable, cloudable: this.property.isCloudable});
  }

  initDefaults(){
    this.property = {
      id: 0,
      isCloudable: false,
      isWritable: false,
      name: ""
    }
  }

  editDeviceProperty(){
    this.property.name = this.devicePropertyForm.get('name')?.value;
    this.property.isWritable = this.devicePropertyForm.get('writable')?.value;
    this.property.isCloudable = this.devicePropertyForm.get('cloudable')?.value;

    if(this.isNew){
      this.deviceService.createProperty(this.deviceAdapater.newProperty(this.property, this.device.id)).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.createError("property",error);
        },
        complete : () => {
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/" + this.device.id);
          this.sweetAlert.createSuccess("property");
        }
      });
    }
    else{
      this.deviceService.updateDeviceProperty(this.property.id,this.property).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/" + this.device.name + "/Property/" + this.property.id);

          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelDeviceProperty(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.id);
  }
}
