import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { Sensor } from 'src/app/models/Device Template/sensor';
import { TableDataSource } from 'src/app/models/table-data-source';

@Component({
  selector: 'sensor-telemtry-detail',
  templateUrl: './sensor-telemtry-detail.component.html',
  styleUrls: ['./sensor-telemtry-detail.component.scss']
})
export class SensorTelemtryDetailComponent implements OnInit {
  device!:DeviceTemplate;
  idTelemetry!:number;

  @Input() sensor !: Sensor
  isNew:boolean = false;
  tableDataSource!:TableDataSource[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);

    if(this.sensor == undefined){
      this.isNew = true;
    }
    else{
      this.loadTable();
    } 
  }

  editSensor(){
    this.router.navigateByUrl("DeviceTemplate/" + this.device.name + "/Telemetry/" + this.idTelemetry + "/Sensor/" + this.sensor.name + "/Edit");
  }

  createSensor(){
    this.router.navigateByUrl("DeviceTemplate/" + this.device.name + "/Telemetry/" + this.idTelemetry + "/Sensor/New/Edit");
  }

  loadTable(){
    this.tableDataSource = [
      {
        name: "Name",
        value: this.sensor.name
      },
      {
        name: "Sensor Type",
        value: this.sensor.sensorType
      }
    ]
  }
}
