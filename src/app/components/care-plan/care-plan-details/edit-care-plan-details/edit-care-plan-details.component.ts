import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarePlanAdapterComponent } from 'src/app/adapters/care-plan-adapter/care-plan-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { CarePlanService } from 'src/app/services/care-plan.service';
import { PatientProfileService } from 'src/app/services/patient-profile.service';

@Component({
  selector: 'app-edit-care-plan-details',
  templateUrl: './edit-care-plan-details.component.html',
  styleUrls: ['./edit-care-plan-details.component.scss']
})
export class EditCarePlanDetailsComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  carePlans!:CarePlanTemplate[];
  newCarePlan:boolean = false;

  patients!:PatientProfile[];

  carePlanForm = this.fb.group({
    name:['',Validators.required],
    title:['',Validators.required],
    description:['', Validators.required],
    duration:['', Validators.required],
    intent:['', Validators.required],
    status:['', Validators.required],
    patient:['']
  })

  get name() { return this.carePlanForm.get('name'); }
  get title() { return this.carePlanForm.get('title'); }
  get description() { return this.carePlanForm.get('description'); }
  get duration() { return this.carePlanForm.get('duration'); }
  get intent() { return this.carePlanForm.get('intent'); }
  get status() { return this.carePlanForm.get('status'); }
  get patient() { return this.carePlanForm.get('patient'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, private patientProfileService: PatientProfileService, private router:Router, 
    private carePlanAdapter: CarePlanAdapterComponent, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.carePlans = JSON.parse('' + localStorage.getItem('carePlanTemplates'));
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));

    this.getPatients();

    //If not exists, create new
    if(!this.carePlans.some(carePlan => carePlan.id == this.carePlan.id)){
      this.newCarePlan = true;
    } 

    this.carePlanForm.setValue({name: this.carePlan.name, title: this.carePlan.title, description: this.carePlan.description, duration: this.carePlan.durationDays, 
      intent: this.carePlan.intent, status: this.carePlan.status, patient: 1});
  
  }

  editCarePlan(){
    this.carePlan.name = this.carePlanForm.get('name')?.value;
    this.carePlan.title = this.carePlanForm.get('title')?.value;
    this.carePlan.description = this.carePlanForm.get('description')?.value;
    this.carePlan.durationDays = this.carePlanForm.get('duration')?.value;
    this.carePlan.intent = this.carePlanForm.get('intent')?.value;
    this.carePlan.status = this.carePlanForm.get('status')?.value;
    this.carePlan.modified = new Date();

    if(this.newCarePlan){
      this.carePlanService.createCarePlanTemplate(this.carePlanAdapter.newCarePlan(this.carePlan)).subscribe({
        next: result => {
          this.carePlan = result;
        },
        error: error => {
          this.sweetAlert.createError("care plan",error);
        },
        complete: () => {
          this.patientAssigned();
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan");
          this.sweetAlert.createSuccess("care plan");
        }
      })
    }
    else{
      this.carePlanService.updateCarePlan(this.carePlan.id,this.carePlan).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          this.patientAssigned();
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/ " + this.carePlan.id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  getPatients(){
    this.patientProfileService.getAllPatientProfile().subscribe({
      next: result => {
        this.patients = result;
      },
      error: error => {
        this.sweetAlert.readError("patients",error);
      },
      complete: () => {
        localStorage.setItem('patientProfiles',JSON.stringify(this.patients));
      }
    })
  }

  patientAssigned(){
    let idPatient:number = this.carePlanForm.get('Patient')?.value;

    if(this.carePlan.patient?.id != undefined && this.carePlan.patient?.id != idPatient){
      this.carePlanService.updateCarePlanPatient(this.carePlan.id,idPatient).subscribe({
        next: result => {
          console.log( result );
        },
        error: error => {
          this.sweetAlert.updateError(error);
        },
        complete: () => {
          this.sweetAlert.updateSuccess();
         }
      });
    }
  }

  cancelCarePlan(){
    this.router.navigateByUrl("/CarePlan/" + this.carePlan.id);
  }
}
