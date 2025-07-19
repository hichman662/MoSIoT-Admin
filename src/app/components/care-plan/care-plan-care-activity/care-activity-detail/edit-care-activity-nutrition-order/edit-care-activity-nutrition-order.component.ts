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
    name:['',Validators.required],
    description:['',Validators.required],
    code:['', Validators.required]
  })

  get name() { return this.careActivityNutritionForm.get('name'); }
  get description() { return this.careActivityNutritionForm.get('description'); }
  get code() { return this.careActivityNutritionForm.get('code'); }

  
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
      this.careActivityNutrition = this.careActivity.nutritionOrders!;

      //If not exists, create new
      if(this.careActivityNutrition == undefined){
        this.isNew = true;
        this.initDefaults();
      }
    }

    this.careActivityNutritionForm.setValue({name: this.careActivityNutrition.name, code: this.careActivityNutrition.dietCode, description: this.careActivityNutrition.description});
  }

  initDefaults(){
    this.careActivityNutrition = {
      name: "",
      description: "",
      dietCode: "",
      id: 0
    }
  }

  editaCareAcitivityNutrition(){
    this.careActivityNutrition.name = this.careActivityNutritionForm.get('name')?.value;
    this.careActivityNutrition.description = this.careActivityNutritionForm.get('description')?.value;
    this.careActivityNutrition.dietCode = this.careActivityNutritionForm.get('code')?.value;

    if(this.isNew){
      this.carePlanService.createCareActivityNutrition(this.carePlanAdapter.newCareNutrition(this.careActivityNutrition, this.careActivity.id)).subscribe({
        next : result =>{
          this.careActivityNutrition = result;
        },
        error : error => {
          this.sweetAlert.createError("nutrition",error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
          this.sweetAlert.createSuccess("nutrition");
        }
      });
    }
    else{
      this.carePlanService.updateCareActivityNutrition(this.careActivityNutrition.id,this.carePlanAdapter.newCareNutrition(this.careActivityNutrition, this.careActivity.id)).subscribe({
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

  cancelCareActivityNutrition(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/CareActivity/" + this.careActivity.id);
  }
}
