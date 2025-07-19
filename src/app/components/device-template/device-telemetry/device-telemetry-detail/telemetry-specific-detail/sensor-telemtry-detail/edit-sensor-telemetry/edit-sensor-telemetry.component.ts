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
    name:['',Validators.required],
    type:['', Validators.required]
  })

  get name() { return this.sensorForm.get('name'); }
  get type() { return this.sensorForm.get('type'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private router:Router, private activatedRoute: ActivatedRoute, private deviceService:DeviceTemplateService, 
    private deviceTemplateAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);
    this.telemetry = this.device.telemetries?.find(telemetry => telemetry.id == this.idTelemetry)!;

    this.sensor = this.telemetry.sensor!;
    
    if(this.sensor == undefined){
      this.isNew = true;
      this.initDefaults();    
    }

    this.sensorForm.setValue({
      name: this.sensor.name,
      type: this.sensor.sensorType});
  }

  initDefaults(){
    this.sensor = {
      id: 0,
      name: "",
      sensorType: ""
    }
  }

  edit(){
    this.sensor.name =  this.sensorForm.get('name')?.value;
    this.sensor.sensorType = this.sensorForm.get('type')?.value;

    if(this.isNew){
      this.deviceService.createSensorTelemetry(this.deviceTemplateAdapter.newSensorTelemetry(this.sensor, this.telemetry.id)).subscribe({
        next : result =>{
          this.sensor = result;
        },
        error : error => {
          this.sweetAlert.createError("sensor",error);
        },
        complete : () => {
          this.sweetAlert.createSuccess("sensor");
          this.router.navigateByUrl("DeviceTemplate/" + this.device.id);
        }
      });
    }
    else{
      this.deviceService.updateSensorTelemetry(this.sensor.id,this.sensor).subscribe({
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
