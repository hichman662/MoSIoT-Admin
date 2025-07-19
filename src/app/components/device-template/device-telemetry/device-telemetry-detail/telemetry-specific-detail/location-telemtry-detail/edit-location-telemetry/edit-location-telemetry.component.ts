import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplateAdapterComponent } from 'src/app/adapters/device-template-adapter/device-template-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { Location } from 'src/app/models/Device Template/location';
import { Telemetry } from 'src/app/models/Device Template/telemetry';
import { DeviceTemplateService } from 'src/app/services/device-template.service';

@Component({
  selector: 'app-edit-location-telemetry',
  templateUrl: './edit-location-telemetry.component.html',
  styleUrls: ['./edit-location-telemetry.component.scss']
})
export class EditLocationTelemetryComponent implements OnInit {
  device!:DeviceTemplate;
  telemetry!:Telemetry;
  location!:Location;

  isNew:boolean = false;
  idTelemetry!:number;

  locationForm = this.fb.group({
    name:['',Validators.required],
    latitude:['', Validators.required],
    altitude:['', Validators.required],
    longitude:['', Validators.required]
  })

  get name() { return this.locationForm.get('name'); }
  get latitude() { return this.locationForm.get('latitude'); }
  get altitude() { return this.locationForm.get('altitude'); }
  get longitude() { return this.locationForm.get('longitude'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private router:Router, private activatedRoute: ActivatedRoute, private deviceService:DeviceTemplateService, 
    private deviceTemplateAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);
    this.telemetry = this.device.telemetries?.find(telemetry => telemetry.id == this.idTelemetry)!;

    this.location = this.telemetry.location!;
    
    if(this.location == undefined){
      this.isNew = true;
      this.initDefaults();    
    }

    this.locationForm.setValue({
      name: this.location.name,
      latitude: this.location.latitude,
      altitude: this.location.altitude,
      longitude: this.location.longitude});
  }

  initDefaults(){
    this.location = {
      id: 0,
      name: "",
      altitude: 0,
      latitude: 0,
      longitude: 0
    }
  }

  edit(){
    this.location.name =  this.locationForm.get('name')?.value;
    this.location.altitude = this.locationForm.get('altitude')?.value;
    this.location.latitude = this.locationForm.get('latitude')?.value;
    this.location.longitude = this.locationForm.get('longitude')?.value;

    if(this.isNew){
      this.deviceService.createLocationTelemetry(this.deviceTemplateAdapter.newLocationTelemetry(this.location, this.telemetry.id)).subscribe({
        next : result =>{
          this.location = result;
        },
        error : error => {
          this.sweetAlert.createError("location",error);
        },
        complete : () => {
          this.sweetAlert.createSuccess("location");
          this.router.navigateByUrl("DeviceTemplate/" + this.device.id);
        }
      });
    }
    else{
      this.deviceService.updateLocationTelemetry(this.location.id,this.location).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          this.sweetAlert.updateSuccess();
          this.router.navigateByUrl("DeviceTemplate/" + this.device.id);
        }
      });
    }
  }

  cancel(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.name + "/Telemetry/" + this.telemetry.id);
  }
}
