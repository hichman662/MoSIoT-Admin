import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarePlanAdapterComponent } from 'src/app/adapters/care-plan-adapter/care-plan-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CareActivity } from 'src/app/models/Care Plan/care-activity';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-edit-care-activity-detail',
  templateUrl: './edit-care-activity-detail.component.html',
  styleUrls: ['./edit-care-activity-detail.component.scss']
})
export class EditCareActivityDetailComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  careActivity!:CareActivity;
  isNew:boolean = false;
  id!:number;

  careActivityForm = this.fb.group({
    name:['',Validators.required],
    type:['',Validators.required],
    periodicity:['', Validators.required],
    duration:['', Validators.required],
    location:['', Validators.required],
    description:['',Validators.required]
  })

  get name() { return this.careActivityForm.get('name'); }
  get type() { return this.careActivityForm.get('type'); }
  get periodicity() { return this.careActivityForm.get('periodicity'); }
  get duration() { return this.careActivityForm.get('duration'); }
  get location() { return this.careActivityForm.get('location'); }
  get description() { return this.careActivityForm.get('description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, 
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['careActivityId']);
    this.careActivity = this.carePlan.careActivities?.find(careActivity => careActivity.id == this.id)!;

    //If not exists, create new
    if(!this.carePlan.careActivities?.some(careActivity => careActivity.id == this.id)){
      this.isNew = true;
      this.initDefaults();
    }

    this.careActivityForm.setValue({name: this.careActivity.name, type: this.careActivity.typeActivity, periodicity: this.careActivity.periodicity, 
      duration: this.careActivity.duration, location: this.careActivity.location, description: this.careActivity.description});
  }

  initDefaults(){
    this.careActivity = {
      name: "",
      description: "",
      duration: 1,
      location: "",
      periodicity: 1,
      typeActivity: 1,
      id: 0
    }
  }

  editaCareAcitivity(){
    this.careActivity.name = this.careActivityForm.get('name')?.value;
    this.careActivity.typeActivity = this.careActivityForm.get('type')?.value;
    this.careActivity.periodicity = this.careActivityForm.get('periodicity')?.value;
    this.careActivity.duration = this.careActivityForm.get('duration')?.value;
    this.careActivity.location = this.careActivityForm.get('location')?.value;
    this.careActivity.description = this.careActivityForm.get('description')?.value;

    if(this.isNew){
      this.carePlanService.createCareActivity(this.carePlanAdapter.newCareActivity(this.careActivity, this.carePlan.id)).subscribe({
        next : result =>{
          this.careActivity = result;
        },
        error : error => {
          this.sweetAlert.createError("care activity",error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
          this.sweetAlert.createSuccess("care activity");
        }
      });
    }
    else{
      this.carePlanService.updateCareActivity(this.careActivity.id,this.carePlanAdapter.newCareActivity(this.careActivity, this.carePlan.id)).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelCareActivity(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.id);
  }
}
