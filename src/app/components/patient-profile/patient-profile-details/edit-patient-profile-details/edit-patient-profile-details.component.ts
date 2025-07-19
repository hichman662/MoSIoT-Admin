import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientProfileAdapterComponent } from 'src/app/adapters/patient-profile-adapter/patient-profile-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'edit-patient-profile-details',
  templateUrl: './edit-patient-profile-details.component.html',
  styleUrls: ['./edit-patient-profile-details.component.scss']
})
export class EditPatientProfileDetailsComponent implements OnInit {
  patient!:PatientProfile;
  patients!:PatientProfile[];
  newPatient:boolean = false;

  patientProfileForm = this.fb.group({
    name:['',Validators.required],
    description:['', Validators.required],
    hazard:['', Validators.required],
    region:['', Validators.required],
    language:['', Validators.required]
  })

  get name() { return this.patientProfileForm.get('name'); }
  get description() { return this.patientProfileForm.get('description'); }
  get hazard() { return this.patientProfileForm.get('hazard'); }
  get region() { return this.patientProfileForm.get('region'); }
  get language() { return this.patientProfileForm.get('language'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private patientService:PatientProfileService, private router:Router, private patientProfileAdapter: PatientProfileAdapterComponent) { }

  ngOnInit(): void {
    this.patients = JSON.parse('' + localStorage.getItem('patientProfiles'));
    this.patient = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    //If not exists, create new
    if(!this.patients.some(patient => patient.id == this.patient.id)){
      this.newPatient = true;
    } 

    this.patientProfileForm.setValue({name: this.patient.name, description: this.patient.description, hazard: this.patient.hazardAvoidance, region: this.patient.region, language: this.patient.preferredLanguage});
  
  }

  editPatientProfile(){
    this.patient.name = this.patientProfileForm.get('name')?.value;
    this.patient.description = this.patientProfileForm.get('description')?.value;
    this.patient.hazardAvoidance = Number(this.patientProfileForm.get('hazard')?.value);
    this.patient.region = this.patientProfileForm.get('region')?.value;
    this.patient.preferredLanguage = Number(this.patientProfileForm.get('language')?.value);

    if(this.newPatient){
      this.patientService.createPatientProfile(this.patientProfileAdapter.newPatientProfile(this.patient)).subscribe({
        next: result => {
          this.patient = result;
        },
        error: error => {
          this.sweetAlert.createError("patient profile", error);
        },
        complete: () => {
          localStorage.setItem('patientProfileDetail',JSON.stringify(this.newPatient));
          this.router.navigateByUrl("PatientProfile");
          this.sweetAlert.createSuccess("patient profile");
        }
      })
    }
    else{
      this.patientService.updatePatientProfile(this.patient.id,this.patient).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('patientProfileDetail',JSON.stringify(this.patient));
          this.router.navigateByUrl("PatientProfile/ " + this.patient.id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelPatientProfile(){
    this.router.navigateByUrl("PatientProfile");
  }
}
