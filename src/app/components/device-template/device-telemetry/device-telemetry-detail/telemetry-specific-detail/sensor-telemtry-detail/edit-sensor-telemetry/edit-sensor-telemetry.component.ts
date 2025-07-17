import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplateAdapterComponent } from 'src/app/adapters/device-template-adapter/device-template-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { Sensor } from 'src/app/models/Device Template/sensor';
import { Telemetry } from 'src/app/models/Device Template/telemetry';
import { DeviceTemplateService } from 'src/app/services/device-template.service';

@Component({
  selector: 'app-edit-sensor-telemetry',
  templateUrl: './edit-sensor-telemetry.component.html',
  styleUrls: ['./edit-sensor-telemetry.component.scss']
})
export class EditSensorTelemetryComponent implements OnInit {
  device!:DeviceTemplate;
  telemetry!:Telemetry;
  sensor!:Sensor;

  isNew:boolean = false;
  idTelemetry!:number;

  sensorForm = this.fb.group({
    Name:['',Validators.required],
    Type:['', Validators.required]
  })

  get Name() { return this.sensorForm.get('Name'); }
  get Type() { return this.sensorForm.get('Type'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private router:Router, private activatedRoute: ActivatedRoute, private deviceService:DeviceTemplateService, 
    private deviceTemplateAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);
    this.telemetry = this.device.Telemetries?.find(telemetry => telemetry.Id == this.idTelemetry)!;

    this.sensor = this.telemetry.Sensor!;
    
    if(this.sensor == undefined){
      this.isNew = true;
      this.initDefaults();    
    }

    this.sensorForm.setValue({
      Name: this.sensor.Name,
      Type: this.sensor.SensorType});
  }

  initDefaults(){
    this.sensor = {
      Id: 0,
      Name: "",
      SensorType: ""
    }
  }

  edit(){
    this.sensor.Name =  this.sensorForm.get('Name')?.value;
    this.sensor.SensorType = this.sensorForm.get('Type')?.value;

    if(this.isNew){
      this.deviceService.createSensorTelemetry(this.deviceTemplateAdapter.newSensorTelemetry(this.sensor, this.telemetry.Id)).subscribe({
        next : result =>{
          this.sensor = result;
        },
        error : error => {
          this.sweetAlert.createError("sensor",error);
        },
        complete : () => {
          this.sweetAlert.createSuccess("sensor");
          this.router.navigateByUrl("DeviceTemplate/" + this.device.Id);
        }
      });
    }
    else{
      this.deviceService.updateSensorTelemetry(this.sensor.Id,this.sensor).subscribe({
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
