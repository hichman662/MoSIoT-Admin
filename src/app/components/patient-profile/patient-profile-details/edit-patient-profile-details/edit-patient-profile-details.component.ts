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
    Name:['',Validators.required],
    Description:['', Validators.required],
    Hazard:['', Validators.required],
    Region:['', Validators.required],
    Language:['', Validators.required]
  })

  get Name() { return this.patientProfileForm.get('Name'); }
  get Description() { return this.patientProfileForm.get('Description'); }
  get Hazard() { return this.patientProfileForm.get('Hazard'); }
  get Region() { return this.patientProfileForm.get('Region'); }
  get Language() { return this.patientProfileForm.get('Language'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private patientService:PatientProfileService, private router:Router, private patientProfileAdapter: PatientProfileAdapterComponent) { }

  ngOnInit(): void {
    this.patients = JSON.parse('' + localStorage.getItem('patientProfiles'));
    this.patient = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    //If not exists, create new
    if(!this.patients.some(patient => patient.Id == this.patient.Id)){
      this.newPatient = true;
    } 

    this.patientProfileForm.setValue({Name: this.patient.Name, Description: this.patient.Description, Hazard: this.patient.HazardAvoidance, Region: this.patient.Region, Language: this.patient.PreferredLanguage});
  
  }

  editPatientProfile(){
    this.patient.Name = this.patientProfileForm.get('Name')?.value
    this.patient.Description = this.patientProfileForm.get('Description')?.value
    this.patient.HazardAvoidance = this.patientProfileForm.get('Hazard')?.value
    this.patient.Region = this.patientProfileForm.get('Region')?.value
    this.patient.PreferredLanguage = this.patientProfileForm.get('Language')?.value

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
      this.patientService.updatePatientProfile(this.patient.Id,this.patient).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('patientProfileDetail',JSON.stringify(this.patient));
          this.router.navigateByUrl("PatientProfile/ " + this.patient.Id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelPatientProfile(){
    this.router.navigateByUrl("PatientProfile");
  }
}
