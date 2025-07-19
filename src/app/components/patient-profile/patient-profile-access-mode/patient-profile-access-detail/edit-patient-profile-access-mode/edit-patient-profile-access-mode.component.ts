import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PatientProfileAdapterComponent } from 'src/app/adapters/patient-profile-adapter/patient-profile-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { AccessMode } from 'src/app/models/Patient Profile/access-mode';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-edit-patient-profile-access-mode',
  templateUrl: './edit-patient-profile-access-mode.component.html',
  styleUrls: ['./edit-patient-profile-access-mode.component.scss']
})
export class EditPatientProfileAccessModeComponent implements OnInit {
  patient!:PatientProfile;
  accessMode!:AccessMode;
  id!:number;
  newAccessMode:boolean = false;

  patientAccessForm = this.fb.group({
    name:['',Validators.required],
    type:['',Validators.required],
    description:['',Validators.required]
  })

  get name() { return this.patientAccessForm.get('name'); }
  get type() { return this.patientAccessForm.get('type'); }
  get description() { return this.patientAccessForm.get('description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private patientService:PatientProfileService, 
    private router:Router, private activatedRoute: ActivatedRoute, private patientProfileAdapter: PatientProfileAdapterComponent) { }

  ngOnInit(): void {
    this.patient = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['accessModeId']);
    this.accessMode = this.patient.accessMode.find(access => access.id == this.id)!;

    //If not exists, create new
    if(!this.patient.accessMode.some(access => access.id == this.id)){
      this.initDefaults();
      this.newAccessMode = true;
    }

    this.patientAccessForm.setValue({name: this.accessMode.name, type: this.accessMode.typeAccessMode, description: this.accessMode.description});
  }

  initDefaults(){
    this.accessMode = {
      id: 0,
      description: "",
      name: "",
      typeAccessMode: 1,
    }
  }

  editPatientAccess(){
    this.accessMode.name = this.patientAccessForm.get('name')?.value;
    this.accessMode.typeAccessMode = Number(this.patientAccessForm.get('type')?.value);
    this.accessMode.description = this.patientAccessForm.get('description')?.value;

    if(this.newAccessMode){
      this.patientService.createPatientAccessMode(this.patientProfileAdapter.newAccessMode(this.accessMode, this.patient.id, this.patient.disabilities[0].id)).subscribe({
        next : result =>{
          this.accessMode = result;
        },
        error : error => {
          this.sweetAlert.createError("access mode",error);
        },
        complete : () => {
          localStorage.setItem('patientProfileDetail',JSON.stringify(this.patient));
          this.router.navigateByUrl("PatientProfile/" + this.patient.id);
          this.sweetAlert.createSuccess("access mode");
        }
      });
    }
    else{
      this.patientService.updatePatientAccessMode(this.accessMode.id,this.accessMode).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('patientProfileDetail',JSON.stringify(this.patient));
          this.router.navigateByUrl("PatientProfile/" + this.patient.id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelPatientAccess(){
    this.router.navigateByUrl("PatientProfile/ " + this.patient.id);
  }
}
