import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PatientProfileAdapterComponent } from 'src/app/adapters/patient-profile-adapter/patient-profile-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { Disability } from 'src/app/models/Patient Profile/disability';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-edit-patient-profile-disability',
  templateUrl: './edit-patient-profile-disability.component.html',
  styleUrls: ['./edit-patient-profile-disability.component.scss']
})
export class EditPatientProfileDisabilityComponent implements OnInit {
  patient!:PatientProfile;
  disability!:Disability;
  id!:number;
  newDisability:boolean = false;

  patientDisabilityForm = this.fb.group({
    name:['',Validators.required],
    type:['',Validators.required],
    severity:['',Validators.required],
    description:['',Validators.required]
  })

  get name() { return this.patientDisabilityForm.get('name'); }
  get type() { return this.patientDisabilityForm.get('type'); }
  get severity() { return this.patientDisabilityForm.get('severity'); }
  get description() { return this.patientDisabilityForm.get('description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private patientService:PatientProfileService, 
    private router:Router, private activatedRoute: ActivatedRoute, private patientProfileAdapter: PatientProfileAdapterComponent) { }

  ngOnInit(): void {
    this.patient = JSON.parse('' + localStorage.getItem('patientProfileDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['disabilityId']);
    this.disability = this.patient.disabilities.find(disability => disability.id == this.id)!;

    //If not exists, create new
    if(!this.patient.disabilities.some(disability => disability.id == this.id)){
      this.newDisability = true;
      this.initDefaults();
    }

    this.patientDisabilityForm.setValue({Name: this.disability.name, Type: this.disability.type, Severity: this.disability.severity, Description: this.disability.description});
  }

  initDefaults(){
    this.disability = {
      id: 0,
      name: "",
      description: "",
      severity: 1,
      type: 1
    }
  }

  editPatientDisability(){
    this.disability.name = this.patientDisabilityForm.get('name')?.value;
    this.disability.type = this.patientDisabilityForm.get('type')?.value;
    this.disability.severity = this.patientDisabilityForm.get('severity')?.value;
    this.disability.description = this.patientDisabilityForm.get('description')?.value;

    if(this.newDisability){
      this.patientService.createDisability(this.patientProfileAdapter.newDisability(this.disability, this.patient.id)).subscribe({
        next : result =>{
          this.disability = result;
        },
        error : error => {
          this.sweetAlert.createError("disability",error);
        },
        complete : () => {
          localStorage.setItem('patientProfileDetail',JSON.stringify(this.patient));
          this.router.navigateByUrl("PatientProfile/" + this.patient.id);
          this.sweetAlert.createSuccess("Disability");
        }
      });
    }
    else{
      this.patientService.updatePatientDisability(this.disability.id,this.disability).subscribe({
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

  cancelPatientDisability(){
    this.router.navigateByUrl("PatientProfile/ " + this.patient.id);
  }
}
