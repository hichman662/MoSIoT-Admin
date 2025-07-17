import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';

@Component({
  selector: 'patient-profile-access-mode',
  templateUrl: './patient-profile-access-mode.component.html',
  styleUrls: ['./patient-profile-access-mode.component.scss']
})
export class PatientProfileAccessModeComponent implements OnInit {
  patientProfile!:PatientProfile;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.patientProfile = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
  }

  details(id:number){
    this.router.navigate(["PatientProfile/" + this.patientProfile.Name + "/AccessMode/" + id]);
  }

  createAccessMode(){
    this.router.navigateByUrl("PatientProfile/ " + this.patientProfile.Name + "/AccessMode/" + -999 + "/Edit");
  }
}
