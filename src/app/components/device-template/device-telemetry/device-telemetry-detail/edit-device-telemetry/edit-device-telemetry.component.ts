import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { DeviceTemplateService } from 'src/app/services/device-template.service';
import { Validators } from '@angular/forms';
import { Telemetry } from 'src/app/models/Device Template/telemetry';
import { DeviceTemplateAdapterComponent } from 'src/app/adapters/device-template-adapter/device-template-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';

@Component({
  selector: 'app-edit-device-telemetry',
  templateUrl: './edit-device-telemetry.component.html',
  styleUrls: ['./edit-device-telemetry.component.scss']
})
export class EditDeviceTelemetryComponent implements OnInit {
  device!:DeviceTemplate;
  telemetry!:Telemetry;
  isNew:boolean = false;
  idTelemetry!:number;

  telemtryProfileForm = this.fb.group({
    name:['',Validators.required],
    frecuency:['',Validators.required],
    type:['', Validators.required],
    unit:['', Validators.required],
    schema:['', Validators.required]
  })

  get name() { return this.telemtryProfileForm.get('name'); }
  get frecuency() { return this.telemtryProfileForm.get('frecuency'); }
  get type() { return this.telemtryProfileForm.get('type'); }
  get unit() { return this.telemtryProfileForm.get('unit'); }
  get schema() { return this.telemtryProfileForm.get('schema'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private deviceService:DeviceTemplateService, 
    private router:Router, private activatedRoute: ActivatedRoute, private deviceTemplateAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);
    this.telemetry = this.device.telemetries?.find(telemetry => telemetry.id == this.idTelemetry)!;
    
    if(this.telemetry == undefined){
      this.isNew = true;
      this.initDefaults();    
    }

    this.telemtryProfileForm.setValue({
      name: this.telemetry.name,
      frecuency: this.telemetry.frecuency ,
      type: this.telemetry.type, 
      unit: this.telemetry.unit,
      schema: this.telemetry.schema});
  }

  initDefaults(){
    this.telemetry = {
      frecuency: 1,
      id: 0,
      name: "",
      schema: 1,
      type: 1,
      unit: 1
    }
  }

  editTelemetry(){
    this.telemetry.schema = this.telemtryProfileForm.get('schema')?.value;
    this.telemetry.name =  this.telemtryProfileForm.get('name')?.value;
    this.telemetry.frecuency = this.telemtryProfileForm.get('frecuency')?.value;
    this.telemetry.unit = this.telemtryProfileForm.get('unit')?.value;
    this.telemetry.type = this.telemtryProfileForm.get('type')?.value;

    if(this.isNew){
      this.deviceService.createTelemetry(this.deviceTemplateAdapter.newTelemetry(this.telemetry, this.device.id)).subscribe({
        next : result =>{
          this.telemetry = result;
        },
        error : error => {
          this.sweetAlert.createError("telemetry",error);
        },
        complete : () => {
          this.sweetAlert.createSuccess("telemetry");
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/" + this.device.id);
        }
      });
    }
    else{
      this.deviceService.updateDeviceTelemetry(this.telemetry.id,this.telemetry).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          this.sweetAlert.updateSuccess();
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/" + this.device.id);
        }
      });
    }
  }

  cancelDeviceTelemetry(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.id);
  }
}
