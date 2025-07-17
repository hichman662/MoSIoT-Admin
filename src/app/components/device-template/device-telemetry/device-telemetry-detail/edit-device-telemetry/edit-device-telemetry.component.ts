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
    Name:['',Validators.required],
    Frecuency:['',Validators.required],
    Type:['', Validators.required],
    Unit:['', Validators.required],
    Schema:['', Validators.required]
  })

  get Name() { return this.telemtryProfileForm.get('Name'); }
  get Frecuency() { return this.telemtryProfileForm.get('Frecuency'); }
  get Type() { return this.telemtryProfileForm.get('Type'); }
  get Unit() { return this.telemtryProfileForm.get('Unit'); }
  get Schema() { return this.telemtryProfileForm.get('Schema'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private deviceService:DeviceTemplateService, 
    private router:Router, private activatedRoute: ActivatedRoute, private deviceTemplateAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);
    this.telemetry = this.device.Telemetries?.find(telemetry => telemetry.Id == this.idTelemetry)!;
    
    if(this.telemetry == undefined){
      this.isNew = true;
      this.initDefaults();    
    }

    this.telemtryProfileForm.setValue({
      Name: this.telemetry.Name,
      Frecuency: this.telemetry.Frecuency ,
      Type: this.telemetry.Type, 
      Unit: this.telemetry.Unit,
      Schema: this.telemetry.Schema});
  }

  initDefaults(){
    this.telemetry = {
      Frecuency: 1,
      Id: 0,
      Name: "",
      Schema: 1,
      Type: 1,
      Unit: 1
    }
  }

  editTelemetry(){
    this.telemetry.Schema = this.telemtryProfileForm.get('Schema')?.value;
    this.telemetry.Name =  this.telemtryProfileForm.get('Name')?.value;
    this.telemetry.Frecuency = this.telemtryProfileForm.get('Frecuency')?.value;
    this.telemetry.Unit = this.telemtryProfileForm.get('Unit')?.value;
    this.telemetry.Type = this.telemtryProfileForm.get('Type')?.value;

    if(this.isNew){
      this.deviceService.createTelemetry(this.deviceTemplateAdapter.newTelemetry(this.telemetry, this.device.Id)).subscribe({
        next : result =>{
          this.telemetry = result;
        },
        error : error => {
          this.sweetAlert.createError("telemetry",error);
        },
        complete : () => {
          this.sweetAlert.createSuccess("telemetry");
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/" + this.device.Id);
        }
      });
    }
    else{
      this.deviceService.updateDeviceTelemetry(this.telemetry.Id,this.telemetry).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          this.sweetAlert.updateSuccess();
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/" + this.device.Id);
        }
      });
    }
  }

  cancelDeviceTelemetry(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.Id);
  }
}
