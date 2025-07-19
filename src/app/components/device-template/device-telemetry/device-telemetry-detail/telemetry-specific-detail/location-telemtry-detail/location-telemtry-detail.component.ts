import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { Location } from 'src/app/models/Device Template/location';
import { TableDataSource } from 'src/app/models/table-data-source';

@Component({
  selector: 'location-telemtry-detail',
  templateUrl: './location-telemtry-detail.component.html',
  styleUrls: ['./location-telemtry-detail.component.scss']
})
export class LocationTelemtryDetailComponent implements OnInit {
  device!:DeviceTemplate;
  idTelemetry!:number;

  @Input() location !: Location
  isNew:boolean = false;
  tableDataSource!:TableDataSource[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);

    if(this.location == undefined){
      this.isNew = true;
    }
    else{
      this.loadTable();
    } 
  }

  editLocation(){
    this.router.navigateByUrl("DeviceTemplate/" + this.device.name + "/Telemetry/" + this.idTelemetry + "/Location/" + this.location.name + "/Edit");
  }

  createLocation(){
    this.router.navigateByUrl("DeviceTemplate/" + this.device.name + "/Telemetry/" + this.idTelemetry + "/Location/New/Edit");
  }

  loadTable(){
    this.tableDataSource = [
      {
        name: "name",
        value: this.location.name
      },
      {
        name: "latitude",
        value: this.location.latitude
      },
      {
        name: "longitude",
        value: this.location.longitude
      },
      {
        name: "altitude",
        value: this.location.altitude
      }
    ]
  }
}
