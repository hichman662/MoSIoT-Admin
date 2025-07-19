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

  get direction() { return this.careActivityAppointmentForm.get('direction'); }
  get description() { return this.careActivityAppointmentForm.get('description'); }
  get code() { return this.careActivityAppointmentForm.get('code'); }
  get isVirtual() { return this.careActivityAppointmentForm.get('isVirtual'); }

  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, 
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['careActivityId']);
    this.careActivity = this.carePlan.careActivities?.find(careActivity => careActivity.id == this.id)!;

    if(this.careActivity == undefined){
      this.sweetAlert.readError("care activity","care activity error");
      this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
    }
    else{
      this.careActivityAppointment = this.careActivity.appointments!;

      //If not exists, create new
      if(this.careActivityAppointment == undefined){
        this.isNew = true;
        this.initDefaults();
      }
    }

    this.careActivityAppointmentForm.setValue({direction: this.careActivityAppointment.direction, code: this.careActivityAppointment.reasonCode, 
      description: this.careActivityAppointment.description, isVirtual: this.careActivityAppointment.isVirtual});
  }

  initDefaults(){
    this.careActivityAppointment = {
      direction: "",
      description: "",
      isVirtual: false,
      reasonCode: "",
      id: 0
    }
  }

  editaCareAcitivityAppointment(){
    this.careActivityAppointment.direction = this.careActivityAppointmentForm.get('direction')?.value;
    this.careActivityAppointment.description = this.careActivityAppointmentForm.get('description')?.value;
    this.careActivityAppointment.reasonCode = this.careActivityAppointmentForm.get('code')?.value;
    this.careActivityAppointment.isVirtual = this.careActivityAppointmentForm.get('isVirtual')?.value;

    if(this.isNew){
      this.carePlanService.createCareActivityAppointment(this.carePlanAdapter.newCareAppointment(this.careActivityAppointment, this.careActivity.id)).subscribe({
        next : result =>{
          this.careActivityAppointment = result;
        },
        error : error => {
          this.sweetAlert.createError("care activity appointment",error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
          this.sweetAlert.createSuccess("care activity appointment");
        }
      });
    }
    else{
      this.carePlanService.updateCareActivityAppointment(this.careActivityAppointment.id,this.carePlanAdapter.newCareAppointment(this.careActivityAppointment, this.careActivity.id)).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError("care activity appointment");
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelCareActivityAppointment(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/CareActivity/" + this.careActivity.id);
  }
}
