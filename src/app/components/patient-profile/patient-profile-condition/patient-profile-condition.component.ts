import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';

@Component({
  selector: 'patient-profile-condition',
  templateUrl: './patient-profile-condition.component.html',
  styleUrls: ['./patient-profile-condition.component.scss']
})
export class PatientProfileConditionComponent implements OnInit {
  patientProfile!:PatientProfile;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.patientProfile = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
  }

  details(id:number){
    this.router.navigate(["PatientProfile/" + this.patientProfile.name + "/Condition/" + id]);
  }

  createCondition(){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.name + "/Condition/" + -999 + "/Edit");
  }
}
