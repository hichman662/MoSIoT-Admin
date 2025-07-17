import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { State } from 'src/app/models/Device Template/state';
import { TableDataSource } from 'src/app/models/table-data-source';
import { DeviceTemplateService } from 'src/app/services/device-template.service';

@Component({
  selector: 'state-telemetry-detail',
  templateUrl: './state-telemetry-detail.component.html',
  styleUrls: ['./state-telemetry-detail.component.scss']
})
export class StateTelemetryDetailComponent implements OnInit {
  device!:DeviceTemplate;
  idTelemetry!:number;

  @Input() state !: State
  isNew:boolean = false;
  tableDataSource!:TableDataSource[];

  constructor(private sweetAlert:SweetAlertsComponent, private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog, private deviceTemplateService: DeviceTemplateService) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idTelemetry = params['telemetryId']);

    if(this.state == undefined){
      this.isNew = true;
    }
    else{
      this.loadTable();
    }
  }

  editState(){
    this.router.navigateByUrl("DeviceTemplate/" + this.device.Name + "/Telemetry/" + this.idTelemetry + "/State/" + this.state.Name + "/Edit");
  }

  createState(){
    this.router.navigateByUrl("DeviceTemplate/" + this.device.Name + "/Telemetry/" + this.idTelemetry + "/State/New/Edit");
  }

  loadTable(){
    this.tableDataSource = [
      {
        Name: "Name",
        Value: this.state.Name
      }
    ]
  }

  editStateDevice(idStateDevice:number){
    this.router.navigateByUrl("DeviceTemplate/" + this.device.Name + "/Telemetry/" + this.idTelemetry + "/State/" + this.state.Id + "/StateDevice/" + idStateDevice + "/Edit");
  }

  addStateDevice(){
    this.router.navigateByUrl("DeviceTemplate/" + this.device.Name + "/Telemetry/" + this.idTelemetry + "/State/" + this.state.Id + "/StateDevice/New");
  }

  removeDialog(id:number){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: "State Device"
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("state device",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          this.removeStateDevice(id);
        }
      }
    });
  }

  removeStateDevice(idStateDevice:number){
    this.deviceTemplateService.deleteStateDeviceTelemetry(idStateDevice).subscribe({
      next: result => {
        console.log("Removing state device...");
      },
      error: error => {
        this.sweetAlert.removeError("state device",error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("state device");
        this.router.navigateByUrl("DeviceTemplate/" + this.device.Id);
      }
    })
  }
}
