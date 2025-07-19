import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { AccessMode } from 'src/app/models/Patient Profile/access-mode';
import { NewAdaptationType } from 'src/app/models/Patient Profile/new-adaptation-type';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-create-patient-profile-adaptation-type',
  templateUrl: './create-patient-profile-adaptation-type.component.html',
  styleUrls: ['./create-patient-profile-adaptation-type.component.scss']
})
export class CreatePatientProfileAdaptationTypeComponent implements OnInit {
  adaptationType!:NewAdaptationType;
  accessMode!:AccessMode;
  patient!:PatientProfile;

  idAccessMode!:number;
  idAdapatationType!:number;

  patientAdaptationForm = this.fb.group({
    type:[''],
    description:['',Validators.required]
  })

  get type() { return this.patientAdaptationForm.get('type'); }
  get description() { return this.patientAdaptationForm.get('description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private patientService:PatientProfileService, 
    private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.patient = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idAccessMode = params['accessModeId']);
    this.accessMode = this.patient.accessMode.find(access => access.id == this.idAccessMode)!;

    this.initDefaults();

    this.patientAdaptationForm.setValue({Type: this.adaptationType.adaptionRequest, Description: this.adaptationType.description});
  }

  initDefaults(){
    this.adaptationType = {
      accessMode_oid: this.accessMode.id,
      adaptionRequest: 1,
      description: ""
    }
  }

  createPatientAdaptation(){
    this.adaptationType.adaptionRequest = this.patientAdaptationForm.get('type')?.value;
    this.adaptationType.description = this.patientAdaptationForm.get('description')?.value;
    
    this.patientService.createPatientadAptationType(this.adaptationType).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.createError("adaptation type required",error);
      },
      complete : () => {
        this.router.navigateByUrl("PatientProfile/" + this.patient.id);
        this.sweetAlert.createSuccess("adaptation type required");
      }
    });
  }

  cancelPatientAdaptation(){
    this.router.navigateByUrl("PatientProfile/ " + this.patient.name + "/AccessMode/" + this.idAccessMode);
  }
}
