import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarePlanAdapterComponent } from 'src/app/adapters/care-plan-adapter/care-plan-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { Appointment } from 'src/app/models/Care Plan/appointment';
import { CareActivity } from 'src/app/models/Care Plan/care-activity';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-edit-care-activity-appoinments',
  templateUrl: './edit-care-activity-appoinments.component.html',
  styleUrls: ['./edit-care-activity-appoinments.component.scss']
})
export class EditCareActivityAppoinmentsComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  careActivity!:CareActivity;
  careActivityAppointment!:Appointment;
  isNew:boolean = false;
  id!:number;

  careActivityAppointmentForm = this.fb.group({
    Direction:['',Validators.required],
    Description:['',Validators.required],
    Code:['', Validators.required],
    IsVirtual:['', Validators.required]
  })

  get Direction() { return this.careActivityAppointmentForm.get('Direction'); }
  get Description() { return this.careActivityAppointmentForm.get('Description'); }
  get Code() { return this.careActivityAppointmentForm.get('Code'); }
  get IsVirtual() { return this.careActivityAppointmentForm.get('IsVirtual'); }

  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, 
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['careActivityId']);
    this.careActivity = this.carePlan.CareActivities?.find(careActivity => careActivity.Id == this.id)!;

    if(this.careActivity == undefined){
      this.sweetAlert.readError("care activity","care activity error");
      this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
    }
    else{
      this.careActivityAppointment = this.careActivity.Appointments!;

      //If not exists, create new
      if(this.careActivityAppointment == undefined){
        this.isNew = true;
        this.initDefaults();
      }
    }

    this.careActivityAppointmentForm.setValue({Direction: this.careActivityAppointment.Direction, Code: this.careActivityAppointment.ReasonCode, 
      Description: this.careActivityAppointment.Description, IsVirtual: this.careActivityAppointment.IsVirtual});
  }

  initDefaults(){
    this.careActivityAppointment = {
      Direction: "",
      Description: "",
      IsVirtual: false,
      ReasonCode: "",
      Id: 0
    }
  }

  editaCareAcitivityAppointment(){
    this.careActivityAppointment.Direction = this.careActivityAppointmentForm.get('Direction')?.value;
    this.careActivityAppointment.Description = this.careActivityAppointmentForm.get('Description')?.value;
    this.careActivityAppointment.ReasonCode = this.careActivityAppointmentForm.get('Code')?.value;
    this.careActivityAppointment.IsVirtual = this.careActivityAppointmentForm.get('IsVirtual')?.value;

    if(this.isNew){
      this.carePlanService.createCareActivityAppointment(this.carePlanAdapter.newCareAppointment(this.careActivityAppointment, this.careActivity.Id)).subscribe({
        next : result =>{
          this.careActivityAppointment = result;
        },
        error : error => {
          this.sweetAlert.createError("care activity appointment",error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
          this.sweetAlert.createSuccess("care activity appointment");
        }
      });
    }
    else{
      this.carePlanService.updateCareActivityAppointment(this.careActivityAppointment.Id,this.carePlanAdapter.newCareAppointment(this.careActivityAppointment, this.careActivity.Id)).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError("care activity appointment");
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelCareActivityAppointment(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/CareActivity/" + this.careActivity.Id);
  }
}
