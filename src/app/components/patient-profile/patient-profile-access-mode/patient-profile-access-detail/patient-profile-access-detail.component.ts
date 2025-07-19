import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { AccessMode } from 'src/app/models/Patient Profile/access-mode';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { TableDataSource } from 'src/app/models/table-data-source';
import { AccessModeTypePipe } from 'src/app/pipes/PatientProfile/access-mode-type.pipe';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-patient-profile-access-detail',
  templateUrl: './patient-profile-access-detail.component.html',
  styleUrls: ['./patient-profile-access-detail.component.scss']
})
export class PatientProfileAccessDetailComponent implements OnInit {
  accessModeId!:number;
  patientProfile!:PatientProfile;
  accessMode!:AccessMode;
  tableDataSource!:TableDataSource[];

  constructor(private sweetAlert:SweetAlertsComponent, private activatedRoute: ActivatedRoute, private router: Router,
    public dialog: MatDialog, private patientProfileService: PatientProfileService,
    private accessModeTypePipe: AccessModeTypePipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.accessModeId = params['accessModeId']);

    this.patientProfile = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.accessMode = this.patientProfile.accessMode.find(accessMode => accessMode.id == this.accessModeId)!;
    
    this.loadTable(); 
  }

  loadTable(){
    this.tableDataSource = [
      {
        name: "Access mode type",
        value: this.accessModeTypePipe.transform(this.accessMode.typeAccessMode)
      },
      {
        name: "Description",
        value: this.accessMode.description
      }
    ]
  }

  editAccessMode(){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.name + "/AccessMode/" + this.accessMode.id + "/Edit");
  }

  editAdaptationRequest(adaptationRequestId:number){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.name + "/AccessMode/" + this.accessMode.id + "/AdaptationRequest/" + adaptationRequestId + "/Edit");
  }

  editAdaptationType(adaptationTypeId:number){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.name + "/AccessMode/" + this.accessMode.id + "/AdaptationType/" + adaptationTypeId + "/Edit");
  }

  editAdaptationDetail(adaptationDetailId:number){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.name + "/AccessMode/" + this.accessMode.id + "/AdaptationDetail/" + adaptationDetailId + "/Edit");
  }

  createAdaptationRequest(){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.name + "/AccessMode/" + this.accessMode.id + "/AdaptationRequest/New");
  }

  createAdaptationType(){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.name + "/AccessMode/" + this.accessMode.id + "/AdaptationType/New");
  }

  createAdaptationDetail(){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.name + "/AccessMode/" + this.accessMode.id + "/AdaptationDetail/New");
  }

  removeDialog(name:string, type:number, id?:number){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: name
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("acces mode property",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          switch(type){
            case 1:
              this.removePatientProfileAccessMode();
              break;
            case 2:
              this.removeAdaptationRequest(id!);
              break;
            case 3:
              this.removeAdaptationType(id!);
              break;
            case 4:
              this.removeAdaptationDetail(id!);
              break;
            default:
              this.sweetAlert.removeError("access mode property", "There was a problem with the property")
              break;
          }
        }
      }
    });
  }

  removePatientProfileAccessMode(){
    console.log("Access mode ID to remove: " + this.accessMode.id);
    this.patientProfileService.deleteAccessMode(this.accessMode.id).subscribe({
      next: result => {
        console.log("Removing access mode...");
        console.log(result);
      },
      error: error => {
        this.sweetAlert.removeError("access mode",error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("Access mode");
        this.router.navigateByUrl("/PatientProfile/" + this.patientProfile.id);
      }
    })
  }

  removeAdaptationRequest(id:number){
    if(id!= null){
      this.patientProfileService.deleteAdaptationRequest(id).subscribe({
        next: result => {
          console.log("Removing adaptation request...");
        },
        error: error => {
          this.sweetAlert.removeError("adaptation request",error);
        },
        complete: () => {
          this.sweetAlert.removeSuccess("Adaptation request");
          this.router.navigateByUrl("/PatientProfile/" + this.patientProfile.id);
        }
      })
    }
  }

  removeAdaptationType(id:number){
    if(id!= null){
      this.patientProfileService.deleteAdaptationType(id).subscribe({
        next: result => {
          console.log("Removing adaptation type...");
        },
        error: error => {
          this.sweetAlert.removeError("adaptation type",error);
        },
        complete: () => {
          this.sweetAlert.removeSuccess("Adapatation type");
          this.router.navigateByUrl("/PatientProfile/" + this.patientProfile.id);
        }
      })
    }
  }

  removeAdaptationDetail(id:number){
    if(id!= null){
      this.patientProfileService.deleteAdaptationDetail(id).subscribe({
        next: result => {
          console.log("Removing adaptation detail...");
        },
        error: error => {
          this.sweetAlert.removeError("adaptation detail", error);
        },
        complete: () => {
          this.sweetAlert.removeSuccess("Adaptation detail");
          this.router.navigateByUrl("/PatientProfile/" + this.patientProfile.id);
        }
      })
    }
  }
}
