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
    Name:['',Validators.required],
    Type:['',Validators.required],
    Description:['',Validators.required]
  })

  get Name() { return this.patientAccessForm.get('Name'); }
  get Type() { return this.patientAccessForm.get('Type'); }
  get Description() { return this.patientAccessForm.get('Description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private patientService:PatientProfileService, 
    private router:Router, private activatedRoute: ActivatedRoute, private patientProfileAdapter: PatientProfileAdapterComponent) { }

  ngOnInit(): void {
    this.patient = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['accessModeId']);
    this.accessMode = this.patient.AccessMode.find(access => access.Id == this.id)!;

    //If not exists, create new
    if(!this.patient.AccessMode.some(access => access.Id == this.id)){
      this.initDefaults();
      this.newAccessMode = true;
    }

    this.patientAccessForm.setValue({Name: this.accessMode.Name, Type: this.accessMode.TypeAccessMode, Description: this.accessMode.Description});
  }

  initDefaults(){
    this.accessMode = {
      Id: 0,
      Description: "",
      Name: "",
      TypeAccessMode: 1,
    }
  }

  editPatientAccess(){
    this.accessMode.Name = this.patientAccessForm.get('Name')?.value;
    this.accessMode.TypeAccessMode = this.patientAccessForm.get('Type')?.value;
    this.accessMode.Description = this.patientAccessForm.get('Description')?.value;

    if(this.newAccessMode){
      this.patientService.createPatientAccessMode(this.patientProfileAdapter.newAccessMode(this.accessMode, this.patient.Id, this.patient.Disabilities[0].Id)).subscribe({
        next : result =>{
          this.accessMode = result;
        },
        error : error => {
          this.sweetAlert.createError("access mode",error);
        },
        complete : () => {
          localStorage.setItem('patientProfileDetail',JSON.stringify(this.patient));
          this.router.navigateByUrl("PatientProfile/" + this.patient.Id);
          this.sweetAlert.createSuccess("access mode");
        }
      });
    }
    else{
      this.patientService.updatePatientAccessMode(this.accessMode.Id,this.accessMode).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('patientProfileDetail',JSON.stringify(this.patient));
          this.router.navigateByUrl("PatientProfile/" + this.patient.Id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelPatientAccess(){
    this.router.navigateByUrl("PatientProfile/ " + this.patient.Id);
  }
}
