import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { AccessMode } from 'src/app/models/Patient Profile/access-mode';
import { AdaptationRequest } from 'src/app/models/Patient Profile/adaptation-request';
import { NewAdaptationRequest } from 'src/app/models/Patient Profile/new-adaptation-request';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-create-patient-profile-adapatation-request',
  templateUrl: './create-patient-profile-adapatation-request.component.html',
  styleUrls: ['./create-patient-profile-adapatation-request.component.scss']
})
export class CreatePatientProfileAdapatationRequestComponent implements OnInit {
  adaptationRequest!:NewAdaptationRequest;
  accessMode!:AccessMode;
  patient!:PatientProfile;

  idAccessMode!:number;
  idAdapatationRequest!:number;

  patientAdaptationForm = this.fb.group({
    Target:[''],
    Language:[''],
    Description:['',Validators.required]
  })

  get Target() { return this.patientAdaptationForm.get('Target'); }
  get Language() { return this.patientAdaptationForm.get('Language'); }
  get Description() { return this.patientAdaptationForm.get('Description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private patientService:PatientProfileService, 
    private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.patient = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idAccessMode = params['accessModeId']);
    this.accessMode = this.patient.AccessMode.find(access => access.Id == this.idAccessMode)!;

    this.initDefaults();

    this.patientAdaptationForm.setValue({Target: this.adaptationRequest.AccessModeTarget, Language: this.adaptationRequest.LanguageOfAdaptation, Description: this.adaptationRequest.Description});
  }

  initDefaults(){
    this.adaptationRequest = {
      AccessMode_oid: this.accessMode.Id,
      AccessModeTarget: 1,
      Description: "",
      LanguageOfAdaptation: 1
    }
  }

  createPatientAdaptation(){
    this.adaptationRequest.AccessModeTarget = this.patientAdaptationForm.get('Target')?.value;
    this.adaptationRequest.LanguageOfAdaptation = this.patientAdaptationForm.get('Language')?.value;
    this.adaptationRequest.Description = this.patientAdaptationForm.get('Description')?.value;
    
    this.patientService.createPatientAdaptationRequest(this.adaptationRequest).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.createError("adaptation request",error);
      },
      complete : () => {
        this.sweetAlert.createSuccess("Adaptation request");
        this.router.navigateByUrl("PatientProfile/" + this.patient.Id);
      }
    });
  }

  cancelPatientAdaptation(){
    this.router.navigateByUrl("PatientProfile/ " + this.patient.Name + "/AccessMode/" + this.idAccessMode);
  }
}
