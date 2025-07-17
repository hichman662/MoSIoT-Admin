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
    Name:['',Validators.required],
    Writable:[''],
    Cloudable:['']
  })

  get Name() { return this.devicePropertyForm.get('Name'); }
  get Writable() { return this.devicePropertyForm.get('Writable'); }
  get Cloudable() { return this.devicePropertyForm.get('Cloudable'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private deviceService:DeviceTemplateService, 
    private router:Router, private activatedRoute: ActivatedRoute, private deviceAdapater: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['propertyId']);
    this.property = this.device.Properties?.find(property => property.Id == this.id)!;

    //If not exists create new one
    if(this.property == undefined){
      this.isNew = true;
      this.initDefaults();
    }

    this.devicePropertyForm.setValue({ Name: this.property.Name, Writable: this.property.IsWritable, Cloudable: this.property.IsCloudable});
  }

  initDefaults(){
    this.property = {
      Id: 0,
      IsCloudable: false,
      IsWritable: false,
      Name: ""
    }
  }

  editDeviceProperty(){
    this.property.Name = this.devicePropertyForm.get('Name')?.value;
    this.property.IsWritable = this.devicePropertyForm.get('Writable')?.value;
    this.property.IsCloudable = this.devicePropertyForm.get('Cloudable')?.value;

    if(this.isNew){
      this.deviceService.createProperty(this.deviceAdapater.newProperty(this.property, this.device.Id)).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.createError("property",error);
        },
        complete : () => {
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/" + this.device.Id);
          this.sweetAlert.createSuccess("property");
        }
      });
    }
    else{
      this.deviceService.updateDeviceProperty(this.property.Id,this.property).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/" + this.device.Name + "/Property/" + this.property.Id);

          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelDeviceProperty(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.Id);
  }
}
