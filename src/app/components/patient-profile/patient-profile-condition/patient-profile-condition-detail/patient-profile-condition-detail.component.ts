import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { Condition } from 'src/app/models/Patient Profile/condition';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { TableDataSource } from 'src/app/models/table-data-source';
import { ClinicalStatusPipe } from 'src/app/pipes/PatientProfile/clinical-status.pipe';
import { DiseaseTypePipe } from 'src/app/pipes/PatientProfile/disease-type.pipe';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-patient-profile-condition-detail',
  templateUrl: './patient-profile-condition-detail.component.html',
  styleUrls: ['./patient-profile-condition-detail.component.scss']
})
export class PatientProfileConditionDetailComponent implements OnInit {
  id!:number;
  patientProfile!:PatientProfile;
  condition!:Condition;
  tableDataSource!:TableDataSource[];

  constructor(private sweetAlert:SweetAlertsComponent, private activatedRoute: ActivatedRoute, private router: Router,
    public dialog: MatDialog, private patientProfileService: PatientProfileService, private diseaseType: DiseaseTypePipe,
    private clinicalType: ClinicalStatusPipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['conditionId']);
    this.patientProfile = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.condition = this.patientProfile.condition.find(condition => condition.id == this.id)!;

    this.loadTable();
  }

  loadTable(){
    this.tableDataSource = [
      {
        name: "Clinical status",
        value: this.clinicalType.transform(this.condition.clinicalStatus)
      },
      {
        name: "Disease",
        value: this.diseaseType.transform(this.condition.disease)
      },
      {
        name: "Description",
        value: this.condition.description
      }
    ]
  }

  editCondition(){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.name + "/Condition/" + this.condition.id + "/Edit");
  }

  removeDialog(){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: this.condition.name
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("condition",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          this.removePatientProfileCondition();
        }
      }
    });
  }

  removePatientProfileCondition(){
    console.log("Condition ID to remove: " + this.condition.id);
    this.patientProfileService.deleteCondition(this.condition.id).subscribe({
      next: result => {
        console.log("Removing condition...");
      },
      error: error => {
        this.sweetAlert.removeError("condition",error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("Condition");
        this.router.navigateByUrl("/PatientProfile/" + this.patientProfile.id);
      }
    })
  }
}
