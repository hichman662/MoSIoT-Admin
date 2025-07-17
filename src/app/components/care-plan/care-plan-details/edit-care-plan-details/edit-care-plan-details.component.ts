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
    Name:['',Validators.required],
    Title:['',Validators.required],
    Description:['', Validators.required],
    Duration:['', Validators.required],
    Intent:['', Validators.required],
    Status:['', Validators.required],
    Patient:['']
  })

  get Name() { return this.carePlanForm.get('Name'); }
  get Title() { return this.carePlanForm.get('Title'); }
  get Description() { return this.carePlanForm.get('Description'); }
  get Duration() { return this.carePlanForm.get('Duration'); }
  get Intent() { return this.carePlanForm.get('Intent'); }
  get Status() { return this.carePlanForm.get('Status'); }
  get Patient() { return this.carePlanForm.get('Patient'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, private patientProfileService: PatientProfileService, private router:Router, 
    private carePlanAdapter: CarePlanAdapterComponent, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.carePlans = JSON.parse('' + localStorage.getItem('carePlanTemplates'));
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));

    this.getPatients();

    //If not exists, create new
    if(!this.carePlans.some(carePlan => carePlan.Id == this.carePlan.Id)){
      this.newCarePlan = true;
    } 

    this.carePlanForm.setValue({Name: this.carePlan.Name, Title: this.carePlan.Title, Description: this.carePlan.Description, Duration: this.carePlan.DurationDays, 
      Intent: this.carePlan.Intent, Status: this.carePlan.Status, Patient: 1});
  
  }

  editCarePlan(){
    this.carePlan.Name = this.carePlanForm.get('Name')?.value;
    this.carePlan.Title = this.carePlanForm.get('Title')?.value;
    this.carePlan.Description = this.carePlanForm.get('Description')?.value;
    this.carePlan.DurationDays = this.carePlanForm.get('Duration')?.value;
    this.carePlan.Intent = this.carePlanForm.get('Intent')?.value;
    this.carePlan.Status = this.carePlanForm.get('Status')?.value;
    this.carePlan.Modified = new Date();

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
      this.carePlanService.updateCarePlan(this.carePlan.Id,this.carePlan).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          this.patientAssigned();
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/ " + this.carePlan.Id);
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

    if(this.carePlan.Patient?.Id != undefined && this.carePlan.Patient?.Id != idPatient){
      this.carePlanService.updateCarePlanPatient(this.carePlan.Id,idPatient).subscribe({
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
    this.router.navigateByUrl("/CarePlan/" + this.carePlan.Id);
  }
}
