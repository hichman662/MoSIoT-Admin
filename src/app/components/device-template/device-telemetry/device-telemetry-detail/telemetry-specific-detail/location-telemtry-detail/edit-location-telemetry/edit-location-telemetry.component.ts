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
    Name:['',Validators.required],
    Latitude:['', Validators.required],
    Altitude:['', Validators.required],
    Longitude:['', Validators.required]
  })

  get Name() { return this.locationForm.get('Name'); }
  get Latitude() { return this.locationForm.get('Latitude'); }
  get Altitude() { return this.locationForm.get('Altitude'); }
  get Longitude() { return this.locationForm.get('Longitude'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private router:Router, private activatedRoute: ActivatedRoute, private deviceService:DeviceTemplateService, 
    private deviceTemplateAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);
    this.telemetry = this.device.Telemetries?.find(telemetry => telemetry.Id == this.idTelemetry)!;

    this.location = this.telemetry.Location!;
    
    if(this.location == undefined){
      this.isNew = true;
      this.initDefaults();    
    }

    this.locationForm.setValue({
      Name: this.location.Name,
      Latitude: this.location.Latitude,
      Altitude: this.location.Altitude,
      Longitude: this.location.Longitude});
  }

  initDefaults(){
    this.location = {
      Id: 0,
      Name: "",
      Altitude: 0,
      Latitude: 0,
      Longitude: 0
    }
  }

  edit(){
    this.location.Name =  this.locationForm.get('Name')?.value;
    this.location.Altitude = this.locationForm.get('Altitude')?.value;
    this.location.Latitude = this.locationForm.get('Latitude')?.value;
    this.location.Longitude = this.locationForm.get('Longitude')?.value;

    if(this.isNew){
      this.deviceService.createLocationTelemetry(this.deviceTemplateAdapter.newLocationTelemetry(this.location, this.telemetry.Id)).subscribe({
        next : result =>{
          this.location = result;
        },
        error : error => {
          this.sweetAlert.createError("location",error);
        },
        complete : () => {
          this.sweetAlert.createSuccess("location");
          this.router.navigateByUrl("DeviceTemplate/" + this.device.Id);
        }
      });
    }
    else{
      this.deviceService.updateLocationTelemetry(this.location.Id,this.location).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          this.sweetAlert.updateSuccess();
          this.router.navigateByUrl("DeviceTemplate/" + this.device.Id);
        }
      });
    }
  }

  cancel(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.Name + "/Telemetry/" + this.telemetry.Id);
  }
}
