import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';

@Component({
  selector: 'patient-profile-disability',
  templateUrl: './patient-profile-disability.component.html',
  styleUrls: ['./patient-profile-disability.component.scss']
})
export class PatientProfileDisabilityComponent implements OnInit {
  patientProfile!:PatientProfile;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.patientProfile = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
  }

  details(id:number){
    this.router.navigate(["PatientProfile/" + this.patientProfile.Name + "/Disability/" + id]);
  }

  createDisability(){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.Name + "/Disability/" + -999 + "/Edit");
  }
}
