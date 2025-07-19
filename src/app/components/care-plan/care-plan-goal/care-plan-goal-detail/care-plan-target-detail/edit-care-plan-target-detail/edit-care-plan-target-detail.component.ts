import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Goal } from 'src/app/models/Care Plan/goal';
import { Target } from 'src/app/models/Care Plan/target';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-edit-care-plan-target-detail',
  templateUrl: './edit-care-plan-target-detail.component.html',
  styleUrls: ['./edit-care-plan-target-detail.component.scss']
})
export class EditCarePlanTargetDetailComponent implements OnInit {
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
    private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));

    this.activatedRoute.params.subscribe((params: Params) => this.idGoal = params['goalId']);
    this.goal = this.carePlan.goals?.find(goal => goal.id == this.idGoal)!;

    this.activatedRoute.params.subscribe((params: Params) => this.idTarget = params['targetId']);
    this.target = this.goal.targets?.find(target => target.id == this.idTarget)!;

    localStorage.setItem('measureDetail',JSON.stringify(this.target.measure));

    this.targetForm.setValue({desired: this.target.desiredValue, description: this.target.description, dueDate: new Date(this.target.dueDate)});
  }

  editTarget(){
    this.target.desiredValue = this.targetForm.get('desired')?.value;
    this.target.dueDate = this.targetForm.get('dueDate')?.value;
    this.target.dueDate.setDate(this.target.dueDate.getDate() + 1); //Backend substracts a day from the request
    this.target.description = this.targetForm.get('description')?.value;

    this.carePlanService.updateTarget(this.target.id,this.target).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.updateError(error);
      },
      complete : () => {
        this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
        this.sweetAlert.updateSuccess();
      }
    });
  }

  editMeasure(){

  }

  cancelTarget(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/Goal/" + this.idGoal);
  }
}
