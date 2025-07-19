import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { TableDataSource } from 'src/app/models/table-data-source';
import { HazardValuePipe } from 'src/app/pipes/PatientProfile/hazard-value.pipe';
import { LanguagePipe } from 'src/app/pipes/language.pipe';

@Component({
  selector: 'patient-profile-details',
  templateUrl: './patient-profile-details.component.html',
  styleUrls: ['./patient-profile-details.component.scss']
})
export class PatientProfileDetailsComponent implements OnInit {
  patientProfile!:PatientProfile;
  tableDataSource!:TableDataSource[];

  constructor(private router: Router, private languagePipe: LanguagePipe, private hazardValuePipe: HazardValuePipe) { }

  ngOnInit(): void {
    this.patientProfile = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.loadTable();
  }

  loadTable(){
    this.tableDataSource = [
      {
        name: "Description",
        value: this.patientProfile.description
      },
      {
        name: "Hazard Avoidance",
        value: this.hazardValuePipe.transform(this.patientProfile.hazardAvoidance)
      },
      {
        name: "Region",
        value: this.patientProfile.region
      },
      {
        name: "Preferred Language",
        value: this.languagePipe.transform(this.patientProfile.preferredLanguage)
      }
    ]
  }

  editDetails(){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.name + "/EditDetails");
  }
}
