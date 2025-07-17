import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { AccessMode } from 'src/app/models/Patient Profile/access-mode';
import { NewAdaptationDetail } from 'src/app/models/Patient Profile/new-adaptation-detail';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-create-patient-profile-adaptation-detail',
  templateUrl: './create-patient-profile-adaptation-detail.component.html',
  styleUrls: ['./create-patient-profile-adaptation-detail.component.scss']
})
export class CreatePatientProfileAdaptationDetailComponent implements OnInit {
  adaptationDetail!:NewAdaptationDetail;
  accessMode!:AccessMode;
  patient!:PatientProfile;

  idAccessMode!:number;
  idAdapatationType!:number;

  patientAdaptationForm = this.fb.group({
    Type:[''],
    Description:['',Validators.required]
  })

  get Type() { return this.patientAdaptationForm.get('Type'); }
  get Description() { return this.patientAdaptationForm.get('Description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private patientService:PatientProfileService, 
    private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.patient = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idAccessMode = params['accessModeId']);
    this.accessMode = this.patient.AccessMode.find(access => access.Id == this.idAccessMode)!;

    this.initDefaults();

    this.patientAdaptationForm.setValue({Type: this.adaptationDetail.AdaptationRequest, Description: this.adaptationDetail.Description});
  }

  initDefaults(){
    this.adaptationDetail = {
      AccessMode_oid: this.accessMode.Id,
      AdaptationRequest: 1,
      Description: ""
    }
  }

  createPatientAdaptation(){
    this.adaptationDetail.AdaptationRequest = this.patientAdaptationForm.get('Type')?.value;
    this.adaptationDetail.Description = this.patientAdaptationForm.get('Description')?.value;
    
    this.patientService.createPatientadAptationDetail(this.adaptationDetail).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.createError("adaptation detail required",error);
      },
      complete : () => {
        this.router.navigateByUrl("PatientProfile/" + this.patient.Id);
        this.sweetAlert.createSuccess("adaptation detail required");
      }
    });
  }

  cancelPatientAdaptation(){
    this.router.navigateByUrl("PatientProfile/ " + this.patient.Name + "/AccessMode/" + this.idAccessMode);
  }
}
