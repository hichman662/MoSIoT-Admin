import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarePlanAdapterComponent } from 'src/app/adapters/care-plan-adapter/care-plan-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Goal } from 'src/app/models/Care Plan/goal';
import { Condition } from 'src/app/models/Patient Profile/condition';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-edit-care-plan-goal-detail',
  templateUrl: './edit-care-plan-goal-detail.component.html',
  styleUrls: ['./edit-care-plan-goal-detail.component.scss']
})
export class EditCarePlanGoalDetailComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  conditions!:Condition[];
  goal!:Goal;
  isNew:boolean = false;
  id!:number;

  goalForm = this.fb.group({
    name:['',Validators.required],
    category:['',Validators.required],
    description:['',Validators.required],
    priority:['', Validators.required],
    status:['', Validators.required],
    outcome:['', Validators.required],
    condition:[''] 
  })

  get name() { return this.goalForm.get('name'); }
  get category() { return this.goalForm.get('category'); }
  get priority() { return this.goalForm.get('priority'); }
  get status() { return this.goalForm.get('status'); }
  get outcome() { return this.goalForm.get('outcome'); }
  get description() { return this.goalForm.get('description'); }
  get condition() { return this.goalForm.get('condition'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, 
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.conditions = this.carePlan.addressConditions!;
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['goalId']);
    this.goal = this.carePlan.goals?.find(goal => goal.id == this.id)!;

    //If not exists, create new
    if(this.goal == undefined){
      if(this.conditions == undefined || this.conditions.length == 0){
        this.sweetAlert.createError("goal","To create a goal you need at least one condition attached to this care plan, please assign one first");
        this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
      }
      else{
        this.isNew = true;
        this.initDefaults();
      }
    }

    this.goalForm.setValue({name: this.goal.name, category: this.goal.category, priority: this.goal.priority, 
      Status: this.goal.status, outcome: this.goal.outcomeCode, description: this.goal.description, condition: 0});
  }

  initDefaults(){
    this.goal = {
      name: "",
      description: "",
      status: 1,
      outcomeCode: "",
      priority: 1,
      category: 1,
      id: 0
    }
  }

  editGoal(){
    this.goal.name = this.goalForm.get('name')?.value;
    this.goal.category = this.goalForm.get('category')?.value;
    this.goal.priority = this.goalForm.get('priority')?.value;
    this.goal.status = this.goalForm.get('status')?.value;
    this.goal.outcomeCode = this.goalForm.get('outcome')?.value;
    this.goal.description = this.goalForm.get('description')?.value;

    if(this.isNew){
      let idCondition:number = this.goalForm.get('condition')?.value;

      this.carePlanService.createGoal(this.carePlanAdapter.newGoal(this.goal, this.carePlan.id, idCondition)).subscribe({
        next : result =>{
          this.goal = result;
        },
        error : error => {
          this.sweetAlert.createError("goal",error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
          this.sweetAlert.createSuccess("goal");
        }
      });
    }
    else{
      this.carePlanService.updateGoal(this.goal.id,this.goal).subscribe({
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

  cancelGoal(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.id);
  }
}
