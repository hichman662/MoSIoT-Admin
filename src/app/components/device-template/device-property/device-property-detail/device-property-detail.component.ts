import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { Property } from 'src/app/models/Device Template/property';
import { TableDataSource } from 'src/app/models/table-data-source';
import { BooleanToStringPipe } from 'src/app/pipes/boolean-to-string.pipe';
import { DeviceTemplateService } from 'src/app/services/device-template.service';

@Component({
  selector: 'app-device-property-detail',
  templateUrl: './device-property-detail.component.html',
  styleUrls: ['./device-property-detail.component.scss']
})
export class DevicePropertyDetailComponent implements OnInit {
  id!:number;
  device!:DeviceTemplate;
  property!:Property;
  tableDataSource!:TableDataSource[];

  constructor(private sweetAlert:SweetAlertsComponent, private activatedRoute: ActivatedRoute, private router: Router,
    public dialog: MatDialog, private deviceService: DeviceTemplateService,
    private boolToString: BooleanToStringPipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['propertyId']);
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.property = this.device.properties?.find(property => property.id == this.id)!;

    this.loadTable();
  }

  loadTable(){
    this.tableDataSource = [
      {
        name: "Writable",
        value: this.boolToString.transform(this.property.isWritable)
      },
      {
        name: "Cloudable",
        value: this.boolToString.transform(this.property.isCloudable)
      }
    ]
  }

  editProperty(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.name + "/Property/" + this.property.id + "/Edit");
  }

  removeDialog(){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: this.property.name
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("property",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          this.removeDeviceProperty();
        }
      }
    });
  }

  removeDeviceProperty(){
    console.log("Property ID to remove: " + this.property.id);
    this.deviceService.deleteDeviceProperty(this.property.id).subscribe({
      next: result => {
        console.log("Removing device property...");
      },
      error: error => {
        this.sweetAlert.removeError("property",error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("property");
        this.router.navigateByUrl("/DeviceTemplate/" + this.device.id);
      }
    })
  }

}
