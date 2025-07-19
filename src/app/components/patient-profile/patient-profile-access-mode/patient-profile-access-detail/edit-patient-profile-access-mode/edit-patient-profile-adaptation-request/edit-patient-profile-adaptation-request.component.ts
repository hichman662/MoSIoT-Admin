import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { AccessMode } from 'src/app/models/Patient Profile/access-mode';
import { AdaptationRequest } from 'src/app/models/Patient Profile/adaptation-request';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-edit-patient-profile-adaptation-request',
  templateUrl: './edit-patient-profile-adaptation-request.component.html',
  styleUrls: ['./edit-patient-profile-adaptation-request.component.scss']
})
export class EditPatientProfileAdaptationRequestComponent implements OnInit {
  adaptationRequest!:AdaptationRequest;
  accessMode!:AccessMode;
  patient!:PatientProfile;

  idAccessMode!:number;
  idAdapatationRequest!:number;

  patientAdaptationForm = this.fb.group({
    target:['',Validators.required],
    language:['',Validators.required],
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
    this.activatedRoute.params.subscribe((params: Params) => this.idAdapatationRequest = params['adaptationRequestId']);
    this.adaptationRequest = this.accessMode.adaptationRequest?.find(adaptation => adaptation.id == this.idAdapatationRequest)!;

    this.patientAdaptationForm.setValue({Target: this.adaptationRequest.accessModeTarget, Language: this.adaptationRequest.languageOfAdaptation, Description: this.adaptationRequest.description});
  }

  editPatientAdaptation(){
    this.adaptationRequest.accessModeTarget = this.patientAdaptationForm.get('target')?.value;
    this.adaptationRequest.languageOfAdaptation = this.patientAdaptationForm.get('language')?.value;
    this.adaptationRequest.description = this.patientAdaptationForm.get('description')?.value;
    
    this.patientService.updatePatientAdaptationRequest(this.adaptationRequest.id,this.adaptationRequest).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.updateError(error);
      },
      complete : () => {
        this.router.navigateByUrl("PatientProfile/" + this.patient.id);
        this.sweetAlert.updateSuccess();
      }
    });
  }

  cancelPatientAdaptation(){
    this.router.navigateByUrl("PatientProfile/ " + this.patient.name + "/AccessMode/" + this.idAccessMode);
  }
}
