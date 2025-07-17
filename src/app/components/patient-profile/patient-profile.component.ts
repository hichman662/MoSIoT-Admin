import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { PatientProfileService } from 'src/app/services/patient-profile.service';
import { SweetAlertsComponent } from '../shared/sweet-alerts/sweet-alerts.component';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  patientProfiles!: PatientProfile[];
  cargando!:boolean;
  token!:string;

  constructor(private sweetAlert:SweetAlertsComponent, private router: Router, private patientProfileService: PatientProfileService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')!;
    if(this.token == null || this.token == ''){
      this.sweetAlert.loginRequired();
    }

    else{
      this.cargando = true;
      this.patientProfileService.getAllPatientProfile().subscribe({
        next: result => {
          this.patientProfiles = result;
        },
        error: error => {
          this.cargando = false;
          this.sweetAlert.readError("patient profiles",error);
        },
        complete: () => {
          localStorage.setItem('patientProfiles',JSON.stringify(this.patientProfiles));
          this.cargando = false;
        }
      })
    }
  }

  details(id:number){
    this.router.navigate(["PatientProfile/" + id]);
  }

  createPatientProfile(){
    let patientProfile:PatientProfile = {
      Id: -999,
      AccessMode: [],
      Condition: [],
      Description: "",
      Disabilities: [],
      HazardAvoidance: 1,
      Name: "",
      PreferredLanguage: 1,
      Region: ""
    }
    
    localStorage.setItem('patientProfileDetail',JSON.stringify(patientProfile));
    this.router.navigateByUrl("PatientProfile/NewPatient/EditDetails");
  }
}
