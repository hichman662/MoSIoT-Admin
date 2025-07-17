import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { DeviceTemplateService } from 'src/app/services/device-template.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from '../../shared/sweet-alerts/sweet-alerts.component';

@Component({
  selector: 'app-device-template-detail',
  templateUrl: './device-template-detail.component.html',
  styleUrls: ['./device-template-detail.component.scss']
})
export class DeviceTemplateDetailComponent implements OnInit {
  id!:number;
  device!:DeviceTemplate;
  cargando!:boolean;

  constructor(private sweetAlert:SweetAlertsComponent, private activatedRoute: ActivatedRoute, private deviceService: DeviceTemplateService, 
    public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.cargando = true;

    this.activatedRoute.params.subscribe((params: Params) => this.id = params['deviceId']);
    this.deviceService.getDeviceTemplateById(this.id).subscribe({
      next: result => {
        this.device = result;
      },
      error: error => {
        this.cargando = false;
        this.sweetAlert.readError("device template",error);
      },
      complete: () => {
        this.cargando = false;
        localStorage.setItem('deviceDetail',JSON.stringify(this.device));
      }
    })
  }

  removeDialog(){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: this.device.Name
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("device template",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          this.removeDeviceTemplate();
        }
      }
    });
  }

  removeDeviceTemplate(){
    this.deviceService.deleteDeviceTemplate(this.device.Id).subscribe({
      next: result => {
        console.log("Removing device...");
      },
      error: error => {
        this.sweetAlert.removeError("device template",error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("Device template");
        this.router.navigateByUrl("/DeviceTemplate");
      }
    })
  }

}
