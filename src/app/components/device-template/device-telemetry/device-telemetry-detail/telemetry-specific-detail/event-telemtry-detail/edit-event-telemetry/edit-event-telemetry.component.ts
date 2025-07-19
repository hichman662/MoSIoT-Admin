import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplateAdapterComponent } from 'src/app/adapters/device-template-adapter/device-template-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { Event } from 'src/app/models/Device Template/event';
import { Telemetry } from 'src/app/models/Device Template/telemetry';
import { DeviceTemplateService } from 'src/app/services/device-template.service';

@Component({
  selector: 'app-edit-event-telemetry',
  templateUrl: './edit-event-telemetry.component.html',
  styleUrls: ['./edit-event-telemetry.component.scss']
})
export class EditEventTelemetryComponent implements OnInit {
  device!:DeviceTemplate;
  telemetry!:Telemetry;
  event!:Event;

  isNew:boolean = false;
  idTelemetry!:number;

  eventForm = this.fb.group({
    name:['',Validators.required],
    severity:['', Validators.required]
  })

  get name() { return this.eventForm.get('name'); }
  get severity() { return this.eventForm.get('severity'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private router:Router, private activatedRoute: ActivatedRoute, private deviceService:DeviceTemplateService, 
    private deviceTemplateAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);
    this.telemetry = this.device.telemetries?.find(telemetry => telemetry.id == this.idTelemetry)!;

    this.event = this.telemetry.event_!;
    
    if(this.event == undefined){
      this.isNew = true;
      this.initDefaults();    
    }

    this.eventForm.setValue({
      Name: this.event.name,
      Severity: this.event.severity});
  }

  initDefaults(){
    this.event = {
      id: 0,
      name: "",
      severity: 1
    }
  }

  edit(){
    this.event.name =  this.eventForm.get('name')?.value;
    this.event.severity = this.eventForm.get('severity')?.value;

    if(this.isNew){
      this.deviceService.createEventTelemetry(this.deviceTemplateAdapter.newEventTelemetry(this.event, this.telemetry.id)).subscribe({
        next : result =>{
          this.event = result;
        },
        error : error => {
          this.sweetAlert.createError("event",error);
        },
        complete : () => {
          this.sweetAlert.createSuccess("event");
          this.router.navigateByUrl("DeviceTemplate/" + this.device.id);
        }
      });
    }
    else{
      this.deviceService.updateEventTelemetry(this.event.id,this.event).subscribe({
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
