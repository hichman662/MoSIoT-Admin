import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplateAdapterComponent } from 'src/app/adapters/device-template-adapter/device-template-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { State } from 'src/app/models/Device Template/state';
import { StateDevice } from 'src/app/models/Device Template/state-device';
import { Telemetry } from 'src/app/models/Device Template/telemetry';
import { DeviceTemplateService } from 'src/app/services/device-template.service';

@Component({
  selector: 'app-create-state-device',
  templateUrl: './create-state-device.component.html',
  styleUrls: ['./create-state-device.component.scss']
})
export class CreateStateDeviceComponent implements OnInit {
  device!:DeviceTemplate;
  telemetry!:Telemetry;
  stateTelemetry!:State;
  stateDevice!:StateDevice;

  idTelemetry!:number;
  idStateTelemetry!:number;

  stateDeviceForm = this.fb.group({
    name:['',Validators.required],
    value:['',Validators.required]
  })

  get name() { return this.stateDeviceForm.get('name'); }
  get value() { return this.stateDeviceForm.get('value'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private router:Router, private activatedRoute: ActivatedRoute, private deviceService:DeviceTemplateService, 
    private deviceTemplateAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);
    this.telemetry = this.device.telemetries?.find(telemetry => telemetry.id = this.idTelemetry)!;
    this.activatedRoute.params.subscribe((params: Params) => this.idStateTelemetry = params['stateId']);
    this.stateTelemetry = this.telemetry.state!;

    this.initDefaults();

    this.stateDeviceForm.setValue({ Name: this.stateDevice.name, Value: this.stateDevice.value });
  }

  initDefaults(){
    this.stateDevice = {
      id: 0,
      name: "",
      value: ""
    }
  }

  create(){
    this.stateDevice.name =  this.stateDeviceForm.get('name')?.value;
    this.stateDevice.value =  this.stateDeviceForm.get('value')?.value;

    this.deviceService.createStateDeviceTelemetry(this.deviceTemplateAdapter.newStateDevice(this.stateDevice, this.idStateTelemetry)).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.createError("state device",error);
      },
      complete : () => {
        this.sweetAlert.createSuccess("state device");
        this.router.navigateByUrl("DeviceTemplate/" + this.device.id);
      }
    });
  }

  cancel(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.name + "/Telemetry/" + this.idTelemetry);
  }
}
