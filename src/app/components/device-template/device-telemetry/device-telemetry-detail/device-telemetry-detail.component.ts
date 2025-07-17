import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { TableDataSource } from 'src/app/models/table-data-source';
import { Telemetry } from 'src/app/models/Device Template/telemetry';
import { SchemaTypePipe } from 'src/app/pipes/Device/schema-type.pipe';
import { TelemetryTypePipe } from 'src/app/pipes/Device/telemetry-type.pipe';
import { TelemetryUnitTypePipe } from 'src/app/pipes/Device/telemetry-unit-type.pipe';
import { DeviceTemplateService } from 'src/app/services/device-template.service';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';

@Component({
  selector: 'app-device-telemetry-detail',
  templateUrl: './device-telemetry-detail.component.html',
  styleUrls: ['./device-telemetry-detail.component.scss']
})
export class DeviceTelemetryDetailComponent implements OnInit {
  id!:number;
  device!:DeviceTemplate;
  telemetry!:Telemetry;
  tableProfileDataSource!:TableDataSource[];
  tableSpecificDataSource!:TableDataSource[];

  constructor(private sweetAlert:SweetAlertsComponent, private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog, 
    private deviceService: DeviceTemplateService, private telemetryTypePipe: TelemetryTypePipe, 
    private telemetryUnitType: TelemetryUnitTypePipe, private schemaTypePipe: SchemaTypePipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['telemetryId']);
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.telemetry = this.device.Telemetries?.find(telemetry => telemetry.Id == this.id)!;

    this.loadProfileTable();
  }

  editTelemetryProfile(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.Name + "/Telemetry/" + this.telemetry.Id + "/Edit");
  }

  removeDialog(){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: this.telemetry.Name
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("telemetry",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          this.removeDeviceTelemetry();
        }
      }
    });
  }

  removeDeviceTelemetry(){
    this.deviceService.deleteDeviceTelemetry(this.telemetry.Id).subscribe({
      next: result => {
        console.log("Removing device telemetry...");
      },
      error: error => {
        this.sweetAlert.removeError("telemetry",error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("Telemetry");
        this.router.navigateByUrl("/DeviceTemplate/" + this.device.Id);
      }
    })
  }

  loadProfileTable(){
    this.tableProfileDataSource = [
      {
        Name: "Frecuency",
        Value: this.telemetry.Frecuency
      },
      {
        Name: "Type",
        Value: this.telemetryTypePipe.transform(this.telemetry.Type)
      },
      {
        Name: "Unit",
        Value: this.telemetryUnitType.transform(this.telemetry.Unit)
      },
      {
        Name: "Schema",
        Value: this.schemaTypePipe.transform(this.telemetry.Schema)
      }
    ]
  }
}
