import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplateAdapterComponent } from 'src/app/adapters/device-template-adapter/device-template-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { State } from 'src/app/models/Device Template/state';
import { Telemetry } from 'src/app/models/Device Template/telemetry';
import { DeviceTemplateService } from 'src/app/services/device-template.service';

@Component({
  selector: 'app-edit-state-telemetry',
  templateUrl: './edit-state-telemetry.component.html',
  styleUrls: ['./edit-state-telemetry.component.scss']
})
export class EditStateTelemetryComponent implements OnInit {
  device!:DeviceTemplate;
  telemetry!:Telemetry;
  state!:State;

  isNew:boolean = false;
  idTelemetry!:number;

  stateForm = this.fb.group({
    name:['',Validators.required]
  })

  get name() { return this.stateForm.get('name'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private router:Router, private activatedRoute: ActivatedRoute, private deviceService:DeviceTemplateService, 
    private deviceTemplateAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);
    this.telemetry = this.device.telemetries?.find(telemetry => telemetry.id == this.idTelemetry)!;

    this.state = this.telemetry.state!;
    
    if(this.state == undefined){
      this.isNew = true;
      this.initDefaults();    
    }

    this.stateForm.setValue({ Name: this.state.name });
  }

  initDefaults(){
    this.state = {
      id: 0,
      name: "",
      states: []
    }
  }

  edit(){
    this.state.name =  this.stateForm.get('name')?.value;

    if(this.isNew){
      this.deviceService.createStateTelemetry(this.deviceTemplateAdapter.newStateTelemetry(this.state.name, this.telemetry.id)).subscribe({
        next : result =>{
          this.state = result;
        },
        error : error => {
          this.sweetAlert.createError("state telemetry",error);
        },
        complete : () => {
          this.sweetAlert.createSuccess("state telemetry");
          this.router.navigateByUrl("DeviceTemplate/" + this.device.id);
        }
      });
    }
    else{
      this.deviceService.updateStateTelemetry(this.state.id,this.deviceTemplateAdapter.newStateTelemetry(this.state.name, this.telemetry.id)).subscribe({
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
