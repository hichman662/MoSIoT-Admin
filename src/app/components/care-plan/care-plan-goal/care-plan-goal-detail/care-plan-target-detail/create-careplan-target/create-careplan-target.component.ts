import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarePlanAdapterComponent } from 'src/app/adapters/care-plan-adapter/care-plan-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Goal } from 'src/app/models/Care Plan/goal';
import { Target } from 'src/app/models/Care Plan/target';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-create-careplan-target',
  templateUrl: './create-careplan-target.component.html',
  styleUrls: ['./create-careplan-target.component.scss']
})
export class CreateCareplanTargetComponent implements OnInit {
  target!:Target;
  goal!:Goal;
  carePlan!:CarePlanTemplate;

  idGoal!:number;
  idTarget!:number;

  targetForm = this.fb.group({
    desired:['',Validators.required],
    description:['',Validators.required],
    dueDate:['',Validators.required]
  })

  get desired() { return this.targetForm.get('desired'); }
  get dueDate() { return this.targetForm.get('dueDate'); }
  get description() { return this.targetForm.get('description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService,
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));

    this.activatedRoute.params.subscribe((params: Params) => this.idGoal = params['goalId']);
    this.goal = this.carePlan.goals?.find(goal => goal.id == this.idGoal)!;

    this.initDefaults();

    this.targetForm.setValue({desired: this.target.desiredValue, description: this.target.description, dueDate: new Date(this.target.dueDate)});
  }

  initDefaults(){
    this.target = {
      description: "",
      desiredValue: "",
      dueDate: new Date(),
      id: 0,
    }
  }

  createTarget(){
    this.target.desiredValue = this.targetForm.get('desired')?.value;
    this.target.dueDate = this.targetForm.get('dueDate')?.value;
    this.target.dueDate.setDate(this.target.dueDate.getDate() + 1); //Backend substracts a day from the request
    this.target.description = this.targetForm.get('description')?.value;

    this.carePlanService.createTarget(this.carePlanAdapter.newTarget(this.target, this.idGoal)).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.createError("target",error);
      },
      complete : () => {
        this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
        this.sweetAlert.createSuccess("target");
      }
    });
  }

  editMeasure(){

  }

  cancelTarget(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/Goal/" + this.idGoal);
  }
}
