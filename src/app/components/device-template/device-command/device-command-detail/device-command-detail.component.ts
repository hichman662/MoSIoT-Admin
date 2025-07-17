import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { Command } from 'src/app/models/Device Template/command';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { TableDataSource } from 'src/app/models/table-data-source';
import { BooleanToStringPipe } from 'src/app/pipes/boolean-to-string.pipe';
import { CommandTypePipe } from 'src/app/pipes/Device/command-type.pipe';
import { DeviceTemplateService } from 'src/app/services/device-template.service';

@Component({
  selector: 'app-device-command-detail',
  templateUrl: './device-command-detail.component.html',
  styleUrls: ['./device-command-detail.component.scss']
})
export class DeviceCommandDetailComponent implements OnInit {
  id!:number;
  device!:DeviceTemplate;
  command!:Command;
  tableDataSource!:TableDataSource[];

  constructor(private sweetAlert:SweetAlertsComponent, private activatedRoute: ActivatedRoute, private router: Router,
    public dialog: MatDialog, private deviceService: DeviceTemplateService,
    private boolToString: BooleanToStringPipe, private commandTypePipe: CommandTypePipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['commandId']);
    
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.command = this.device.Commands?.find(command => command.Id == this.id)!;

    this.loadTable();
  }

  loadTable(){
    this.tableDataSource = [
      {
        Name: "Type",
        Value: this.commandTypePipe.transform(this.command.Type)
      },
      {
        Name: "Synchronous",
        Value: this.boolToString.transform(this.command.IsSynchronous)
      },
      {
        Name: "Description",
        Value: this.command.Description
      }
    ]
  }

  editCommand(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.Name + "/Command/" + this.command.Id + "/Edit");
  }

  removeDialog(){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: this.command.Name
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("command",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          this.removeDevicCommand();
        }
      }
    });
  }

  removeDevicCommand(){
    this.deviceService.deleteDeviceCommand(this.command.Id).subscribe({
      next: result => {
        console.log("Removing device command...");
      },
      error: error => {
        this.sweetAlert.removeError("command",error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("command");
        this.router.navigateByUrl("/DeviceTemplate/" + this.device.Id);
      }
    })
  }

}
