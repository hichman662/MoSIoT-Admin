import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PatientProfileAdapterComponent } from 'src/app/adapters/patient-profile-adapter/patient-profile-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { Condition } from 'src/app/models/Patient Profile/condition';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-edit-patient-profile-condition',
  templateUrl: './edit-patient-profile-condition.component.html',
  styleUrls: ['./edit-patient-profile-condition.component.scss']
})
export class EditPatientProfileConditionComponent implements OnInit {
  patient!:PatientProfile;
  condition!:Condition;
  isNew:boolean = false;
  id!:number;

  patientConditionForm = this.fb.group({
    Name:['',Validators.required],
    Clinical:['', Validators.required],
    Disease:['', Validators.required],
    Description:['',Validators.required]
  })

  get Name() { return this.patientConditionForm.get('Name'); }
  get Clinical() { return this.patientConditionForm.get('Clinical'); }
  get Disease() { return this.patientConditionForm.get('Disease'); }
  get Description() { return this.patientConditionForm.get('Description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private patientService:PatientProfileService, 
    private router:Router, private activatedRoute: ActivatedRoute, private patientProfileAdapter: PatientProfileAdapterComponent) { }

  ngOnInit(): void {
    this.patient = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['conditionId']);
    this.condition = this.patient.Condition.find(condition => condition.Id == this.id)!;

    //If not exists, create new
    if(!this.patient.Condition.some(condition => condition.Id == this.id)){
      this.isNew = true;
      this.initDefaults();
    }

    this.patientConditionForm.setValue({Name: this.condition.Name, Clinical: this.condition.ClinicalStatus, Disease: this.condition.Disease, Description: this.condition.Description});
  }

  initDefaults(){
    this.condition = {
      Id: 0,
      Name: "",
      ClinicalStatus: 1,
      Description: "",
      Disease: 1
    }
  }

  editPatientCondition(){
    this.condition.Name = this.patientConditionForm.get('Name')?.value;
    this.condition.ClinicalStatus = this.patientConditionForm.get('Clinical')?.value;
    this.condition.Disease = this.patientConditionForm.get('Disease')?.value;
    this.condition.Description = this.patientConditionForm.get('Description')?.value;

    if(this.isNew){
      this.patientService.createCondition(this.patientProfileAdapter.newCondition(this.condition, this.patient.Id)).subscribe({
        next : result =>{
          this.condition = result;
        },
        error : error => {
          this.sweetAlert.createError("condition",error);
        },
        complete : () => {
          localStorage.setItem('patientProfileDetail',JSON.stringify(this.patient));
          this.router.navigateByUrl("PatientProfile/" + this.patient.Id);
          this.sweetAlert.createSuccess("Condition");
        }
      });
    }
    else{
      this.patientService.updatePatientCondition(this.condition.Id,this.condition).subscribe({
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

  cancelPatientCondition(){
    this.router.navigateByUrl("PatientProfile/ " + this.patient.Id);
  }
}
