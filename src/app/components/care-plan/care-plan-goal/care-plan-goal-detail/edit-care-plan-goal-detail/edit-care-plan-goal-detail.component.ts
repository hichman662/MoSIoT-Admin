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
    Name:['',Validators.required],
    Category:['',Validators.required],
    Description:['',Validators.required],
    Priority:['', Validators.required],
    Status:['', Validators.required],
    Outcome:['', Validators.required],
    Condition:[''] 
  })

  get Name() { return this.goalForm.get('Name'); }
  get Category() { return this.goalForm.get('Category'); }
  get Priority() { return this.goalForm.get('Priority'); }
  get Status() { return this.goalForm.get('Status'); }
  get Outcome() { return this.goalForm.get('Outcome'); }
  get Description() { return this.goalForm.get('Description'); }
  get Condition() { return this.goalForm.get('Condition'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, 
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.conditions = this.carePlan.AddressConditions!;
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['goalId']);
    this.goal = this.carePlan.Goals?.find(goal => goal.Id == this.id)!;

    //If not exists, create new
    if(this.goal == undefined){
      if(this.conditions == undefined || this.conditions.length == 0){
        this.sweetAlert.createError("goal","To create a goal you need at least one condition attached to this care plan, please assign one first");
        this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
      }
      else{
        this.isNew = true;
        this.initDefaults();
      }
    }

    this.goalForm.setValue({Name: this.goal.Name, Category: this.goal.Category, Priority: this.goal.Priority, 
      Status: this.goal.Status, Outcome: this.goal.OutcomeCode, Description: this.goal.Description, Condition: 0});
  }

  initDefaults(){
    this.goal = {
      Name: "",
      Description: "",
      Status: 1,
      OutcomeCode: "",
      Priority: 1,
      Category: 1,
      Id: 0
    }
  }

  editGoal(){
    this.goal.Name = this.goalForm.get('Name')?.value;
    this.goal.Category = this.goalForm.get('Category')?.value;
    this.goal.Priority = this.goalForm.get('Priority')?.value;
    this.goal.Status = this.goalForm.get('Status')?.value;
    this.goal.OutcomeCode = this.goalForm.get('Outcome')?.value;
    this.goal.Description = this.goalForm.get('Description')?.value;

    if(this.isNew){
      let idCondition:number = this.goalForm.get('Condition')?.value;

      this.carePlanService.createGoal(this.carePlanAdapter.newGoal(this.goal, this.carePlan.Id, idCondition)).subscribe({
        next : result =>{
          this.goal = result;
        },
        error : error => {
          this.sweetAlert.createError("goal",error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
          this.sweetAlert.createSuccess("goal");
        }
      });
    }
    else{
      this.carePlanService.updateGoal(this.goal.Id,this.goal).subscribe({
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

  cancelGoal(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Id);
  }
}
