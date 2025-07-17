import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { AccessMode } from 'src/app/models/Patient Profile/access-mode';
import { AdaptationDetail } from 'src/app/models/Patient Profile/adaptation-detail';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-edit-patient-profile-adaptation-detail',
  templateUrl: './edit-patient-profile-adaptation-detail.component.html',
  styleUrls: ['./edit-patient-profile-adaptation-detail.component.scss']
})
export class EditPatientProfileAdaptationDetailComponent implements OnInit {
  adaptationDetail!:AdaptationDetail;
  accessMode!:AccessMode;
  patient!:PatientProfile;

  idAccessMode!:number;
  idAdapatationDetail!:number;

  patientAdaptationForm = this.fb.group({
    Type:['',Validators.required],
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
    this.activatedRoute.params.subscribe((params: Params) => this.idAdapatationDetail = params['adaptationDetailId']);
    this.adaptationDetail = this.accessMode.AdaptationDetail?.find(adaptation => adaptation.Id == this.idAdapatationDetail)!;

    this.patientAdaptationForm.setValue({Type: this.adaptationDetail.AdaptationRequest, Description: this.adaptationDetail.Description});
  }

  editPatientAdaptation(){
    this.adaptationDetail.AdaptationRequest = this.patientAdaptationForm.get('Type')?.value;
    this.adaptationDetail.Description = this.patientAdaptationForm.get('Description')?.value;
    
    this.patientService.updatePatientadAptationDetail(this.adaptationDetail.Id,this.adaptationDetail).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.updateError(error);
      },
      complete : () => {
        this.router.navigateByUrl("PatientProfile/" + this.patient.Id);
        this.sweetAlert.updateSuccess();
      }
    });
  }

  cancelPatientAdaptation(){
    this.router.navigateByUrl("PatientProfile/ " + this.patient.Name + "/AccessMode/" + this.idAccessMode);
  }
}
