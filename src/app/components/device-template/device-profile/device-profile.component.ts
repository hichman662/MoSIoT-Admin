import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { TableDataSource } from 'src/app/models/table-data-source';
import { BooleanToStringPipe } from 'src/app/pipes/boolean-to-string.pipe';
import { DeviceTypePipe } from 'src/app/pipes/Device/device-type.pipe';

@Component({
  selector: 'device-profile',
  templateUrl: './device-profile.component.html',
  styleUrls: ['./device-profile.component.scss']
})
export class DeviceProfileComponent implements OnInit {
  device!:DeviceTemplate;
  tableDataSource!:TableDataSource[];

  constructor(private router: Router, private boolToStringPipe: BooleanToStringPipe, 
    private deviceTypePipe: DeviceTypePipe) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.loadTable();
  }

  loadTable(){
    this.tableDataSource = [
      {
        Name: "Type",
        Value: this.deviceTypePipe.transform(this.device.Type)
      },
      {
        Name: "IsEdge",
        Value: this.boolToStringPipe.transform(this.device.IsEdge)
      }
    ]
  }

  editProfile(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.Id + "/EditProfile");
  }

}
