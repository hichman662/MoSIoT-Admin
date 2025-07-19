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
    target:[''],
    language:[''],
    description:['',Validators.required]
  })

  get target() { return this.patientAdaptationForm.get('target'); }
  get language() { return this.patientAdaptationForm.get('language'); }
  get description() { return this.patientAdaptationForm.get('description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private patientService:PatientProfileService, 
    private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.patient = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idAccessMode = params['accessModeId']);
    this.accessMode = this.patient.accessMode.find(access => access.id == this.idAccessMode)!;

    this.initDefaults();

    this.patientAdaptationForm.setValue({Target: this.adaptationRequest.accessModeTarget, Language: this.adaptationRequest.languageOfAdaptation, Description: this.adaptationRequest.description});
  }

  initDefaults(){
    this.adaptationRequest = {
      accessMode_oid: this.accessMode.id,
      accessModeTarget: 1,
      description: "",
      languageOfAdaptation: 1
    }
  }

  createPatientAdaptation(){
    this.adaptationRequest.accessModeTarget = this.patientAdaptationForm.get('target')?.value;
    this.adaptationRequest.languageOfAdaptation = this.patientAdaptationForm.get('aanguage')?.value;
    this.adaptationRequest.description = this.patientAdaptationForm.get('description')?.value;
    
    this.patientService.createPatientAdaptationRequest(this.adaptationRequest).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.createError("adaptation request",error);
      },
      complete : () => {
        this.sweetAlert.createSuccess("Adaptation request");
        this.router.navigateByUrl("PatientProfile/" + this.patient.id);
      }
    });
  }

  cancelPatientAdaptation(){
    this.router.navigateByUrl("PatientProfile/ " + this.patient.name + "/AccessMode/" + this.idAccessMode);
  }
}
