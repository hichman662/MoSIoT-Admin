import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { Event } from 'src/app/models/Device Template/event';
import { Telemetry } from 'src/app/models/Device Template/telemetry';
import { TableDataSource } from 'src/app/models/table-data-source';
import { SeverityPipe } from 'src/app/pipes/Device/severity.pipe';

@Component({
  selector: 'event-telemtry-detail',
  templateUrl: './event-telemtry-detail.component.html',
  styleUrls: ['./event-telemtry-detail.component.scss']
})
export class EventTelemtryDetailComponent implements OnInit {
  device!:DeviceTemplate;
  idTelemetry!:number;

  @Input() event !: Event
  isNew:boolean = false;
  tableDataSource!:TableDataSource[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private severityTypePipe:SeverityPipe) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);

    if(this.event == undefined){
      this.isNew = true;
    }
    else{
      this.loadTable();
    } 
  }

  editEvent(){
    this.router.navigateByUrl("DeviceTemplate/" + this.device.Name + "/Telemetry/" + this.idTelemetry + "/Event/" + this.event.Name + "/Edit");
  }

  createEvent(){
    this.router.navigateByUrl("DeviceTemplate/" + this.device.Name + "/Telemetry/" + this.idTelemetry + "/Event/New/Edit");
  }

  loadTable(){
    this.tableDataSource = [
      {
        Name: "Name",
        Value: this.event.Name
      },
      {
        Name: "Severity",
        Value: this.severityTypePipe.transform(this.event.Severity)
      }
    ]
  }
}
