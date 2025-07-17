import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarePlanAdapterComponent } from 'src/app/adapters/care-plan-adapter/care-plan-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CareActivity } from 'src/app/models/Care Plan/care-activity';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { NutritionOrder } from 'src/app/models/Care Plan/nutrition-order';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-edit-care-activity-nutrition-order',
  templateUrl: './edit-care-activity-nutrition-order.component.html',
  styleUrls: ['./edit-care-activity-nutrition-order.component.scss']
})
export class EditCareActivityNutritionOrderComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  careActivity!:CareActivity;
  careActivityNutrition!:NutritionOrder;
  isNew:boolean = false;
  id!:number;

  careActivityNutritionForm = this.fb.group({
    Name:['',Validators.required],
    Description:['',Validators.required],
    Code:['', Validators.required]
  })

  get Name() { return this.careActivityNutritionForm.get('Name'); }
  get Description() { return this.careActivityNutritionForm.get('Description'); }
  get Code() { return this.careActivityNutritionForm.get('Code'); }

  
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
      this.careActivityNutrition = this.careActivity.NutritionOrders!;

      //If not exists, create new
      if(this.careActivityNutrition == undefined){
        this.isNew = true;
        this.initDefaults();
      }
    }

    this.careActivityNutritionForm.setValue({Name: this.careActivityNutrition.Name, Code: this.careActivityNutrition.DietCode, Description: this.careActivityNutrition.Description});
  }

  initDefaults(){
    this.careActivityNutrition = {
      Name: "",
      Description: "",
      DietCode: "",
      Id: 0
    }
  }

  editaCareAcitivityNutrition(){
    this.careActivityNutrition.Name = this.careActivityNutritionForm.get('Name')?.value;
    this.careActivityNutrition.Description = this.careActivityNutritionForm.get('Description')?.value;
    this.careActivityNutrition.DietCode = this.careActivityNutritionForm.get('Code')?.value;

    if(this.isNew){
      this.carePlanService.createCareActivityNutrition(this.carePlanAdapter.newCareNutrition(this.careActivityNutrition, this.careActivity.Id)).subscribe({
        next : result =>{
          this.careActivityNutrition = result;
        },
        error : error => {
          this.sweetAlert.createError("nutrition",error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
          this.sweetAlert.createSuccess("nutrition");
        }
      });
    }
    else{
      this.carePlanService.updateCareActivityNutrition(this.careActivityNutrition.Id,this.carePlanAdapter.newCareNutrition(this.careActivityNutrition, this.careActivity.Id)).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelCareActivityNutrition(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/CareActivity/" + this.careActivity.Id);
  }
}
