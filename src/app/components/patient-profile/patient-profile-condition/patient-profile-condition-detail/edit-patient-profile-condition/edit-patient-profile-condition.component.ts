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
    name:['',Validators.required],
    clinical:['', Validators.required],
    disease:['', Validators.required],
    description:['',Validators.required]
  })

  get name() { return this.patientConditionForm.get('name'); }
  get clinical() { return this.patientConditionForm.get('clinical'); }
  get disease() { return this.patientConditionForm.get('disease'); }
  get description() { return this.patientConditionForm.get('description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private patientService:PatientProfileService, 
    private router:Router, private activatedRoute: ActivatedRoute, private patientProfileAdapter: PatientProfileAdapterComponent) { }

  ngOnInit(): void {
    this.patient = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['conditionId']);
    this.condition = this.patient.condition.find(condition => condition.id == this.id)!;

    //If not exists, create new
    if(!this.patient.condition.some(condition => condition.id == this.id)){
      this.isNew = true;
      this.initDefaults();
    }

    this.patientConditionForm.setValue({Name: this.condition.name, Clinical: this.condition.clinicalStatus, Disease: this.condition.disease, Description: this.condition.description});
  }

  initDefaults(){
    this.condition = {
      id: 0,
      name: "",
      clinicalStatus: 1,
      description: "",
      disease: 1
    }
  }

  editPatientCondition(){
    this.condition.name = this.patientConditionForm.get('name')?.value;
    this.condition.clinicalStatus = this.patientConditionForm.get('clinical')?.value;
    this.condition.disease = this.patientConditionForm.get('disease')?.value;
    this.condition.description = this.patientConditionForm.get('description')?.value;

    if(this.isNew){
      this.patientService.createCondition(this.patientProfileAdapter.newCondition(this.condition, this.patient.id)).subscribe({
        next : result =>{
          this.condition = result;
        },
        error : error => {
          this.sweetAlert.createError("condition",error);
        },
        complete : () => {
          localStorage.setItem('patientProfileDetail',JSON.stringify(this.patient));
          this.router.navigateByUrl("PatientProfile/" + this.patient.id);
          this.sweetAlert.createSuccess("Condition");
        }
      });
    }
    else{
      this.patientService.updatePatientCondition(this.condition.id,this.condition).subscribe({
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

  cancelPatientCondition(){
    this.router.navigateByUrl("PatientProfile/ " + this.patient.id);
  }
}
