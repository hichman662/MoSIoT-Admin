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
    Name:['',Validators.required]
  })

  get Name() { return this.stateForm.get('Name'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private router:Router, private activatedRoute: ActivatedRoute, private deviceService:DeviceTemplateService, 
    private deviceTemplateAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);
    this.telemetry = this.device.Telemetries?.find(telemetry => telemetry.Id == this.idTelemetry)!;

    this.state = this.telemetry.State!;
    
    if(this.state == undefined){
      this.isNew = true;
      this.initDefaults();    
    }

    this.stateForm.setValue({ Name: this.state.Name });
  }

  initDefaults(){
    this.state = {
      Id: 0,
      Name: "",
      States: []
    }
  }

  edit(){
    this.state.Name =  this.stateForm.get('Name')?.value;

    if(this.isNew){
      this.deviceService.createStateTelemetry(this.deviceTemplateAdapter.newStateTelemetry(this.state.Name, this.telemetry.Id)).subscribe({
        next : result =>{
          this.state = result;
        },
        error : error => {
          this.sweetAlert.createError("state telemetry",error);
        },
        complete : () => {
          this.sweetAlert.createSuccess("state telemetry");
          this.router.navigateByUrl("DeviceTemplate/" + this.device.Id);
        }
      });
    }
    else{
      this.deviceService.updateStateTelemetry(this.state.Id,this.deviceTemplateAdapter.newStateTelemetry(this.state.Name, this.telemetry.Id)).subscribe({
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
