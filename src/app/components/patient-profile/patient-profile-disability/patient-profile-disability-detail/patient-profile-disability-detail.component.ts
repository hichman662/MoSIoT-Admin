import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { Disability } from 'src/app/models/Patient Profile/disability';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { TableDataSource } from 'src/app/models/table-data-source';
import { DisabilityTypePipe } from 'src/app/pipes/PatientProfile/disability-type.pipe';
import { PatientSeverityPipe } from 'src/app/pipes/PatientProfile/patient-severity.pipe';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-patient-profile-disability-detail',
  templateUrl: './patient-profile-disability-detail.component.html',
  styleUrls: ['./patient-profile-disability-detail.component.scss']
})
export class PatientProfileDisabilityDetailComponent implements OnInit {
  id!:number;
  patientProfile!:PatientProfile;
  disability!:Disability;
  tableDataSource!:TableDataSource[];

  constructor(private sweetAlert:SweetAlertsComponent, private activatedRoute: ActivatedRoute, private router: Router,
    public dialog: MatDialog, private patientProfileService: PatientProfileService, private severityPipe: PatientSeverityPipe,
    private disabilityTypePipe: DisabilityTypePipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['disabilityId']);

    this.patientProfile = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.disability = this.patientProfile.Disabilities.find(disability => disability.Id == this.id)!;

    this.loadTable();
  }

  loadTable(){
    this.tableDataSource = [
      {
        Name: "Disability type",
        Value: this.disabilityTypePipe.transform(this.disability.Type)
      },
      {
        Name: "Severity",
        Value: this.severityPipe.transform(this.disability.Severity)
      },
      {
        Name: "Description",
        Value: this.disability.Description
      }
    ]
  }

  editDisability(){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.Name + "/Disability/" + this.disability.Id + "/Edit");
  }

  removeDialog(){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: this.disability.Name
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("disability", error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          this.removePatientProfileDisability();
        }
      }
    });
  }

  removePatientProfileDisability(){
    console.log("Disability ID to remove: " + this.disability.Id);
    this.patientProfileService.deleteDisability(this.disability.Id).subscribe({
      next: result => {
        console.log("Removing disability...");
      },
      error: error => {
        this.sweetAlert.removeError("disability", error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("Disability");
        this.router.navigateByUrl("/PatientProfile/" + this.patientProfile.Id);
      }
    })
  }
}
