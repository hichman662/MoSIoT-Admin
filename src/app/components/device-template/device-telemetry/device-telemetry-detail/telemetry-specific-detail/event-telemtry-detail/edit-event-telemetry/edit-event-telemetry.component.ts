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
    Name:['',Validators.required],
    Severity:['', Validators.required]
  })

  get Name() { return this.eventForm.get('Name'); }
  get Severity() { return this.eventForm.get('Severity'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private router:Router, private activatedRoute: ActivatedRoute, private deviceService:DeviceTemplateService, 
    private deviceTemplateAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);
    this.telemetry = this.device.Telemetries?.find(telemetry => telemetry.Id == this.idTelemetry)!;

    this.event = this.telemetry.Event_!;
    
    if(this.event == undefined){
      this.isNew = true;
      this.initDefaults();    
    }

    this.eventForm.setValue({
      Name: this.event.Name,
      Severity: this.event.Severity});
  }

  initDefaults(){
    this.event = {
      Id: 0,
      Name: "",
      Severity: 1
    }
  }

  edit(){
    this.event.Name =  this.eventForm.get('Name')?.value;
    this.event.Severity = this.eventForm.get('Severity')?.value;

    if(this.isNew){
      this.deviceService.createEventTelemetry(this.deviceTemplateAdapter.newEventTelemetry(this.event, this.telemetry.Id)).subscribe({
        next : result =>{
          this.event = result;
        },
        error : error => {
          this.sweetAlert.createError("event",error);
        },
        complete : () => {
          this.sweetAlert.createSuccess("event");
          this.router.navigateByUrl("DeviceTemplate/" + this.device.Id);
        }
      });
    }
    else{
      this.deviceService.updateEventTelemetry(this.event.Id,this.event).subscribe({
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
