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
    Desired:['',Validators.required],
    Description:['',Validators.required],
    DueDate:['',Validators.required]
  })

  get Desired() { return this.targetForm.get('Desired'); }
  get DueDate() { return this.targetForm.get('DueDate'); }
  get Description() { return this.targetForm.get('Description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService,
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));

    this.activatedRoute.params.subscribe((params: Params) => this.idGoal = params['goalId']);
    this.goal = this.carePlan.Goals?.find(goal => goal.Id == this.idGoal)!;

    this.initDefaults();

    this.targetForm.setValue({Desired: this.target.DesiredValue, Description: this.target.Description, DueDate: new Date(this.target.DueDate)});
  }

  initDefaults(){
    this.target = {
      Description: "",
      DesiredValue: "",
      DueDate: new Date(),
      Id: 0,
    }
  }

  createTarget(){
    this.target.DesiredValue = this.targetForm.get('Desired')?.value;
    this.target.DueDate = this.targetForm.get('DueDate')?.value;
    this.target.DueDate.setDate(this.target.DueDate.getDate() + 1); //Backend substracts a day from the request
    this.target.Description = this.targetForm.get('Description')?.value;

    this.carePlanService.createTarget(this.carePlanAdapter.newTarget(this.target, this.idGoal)).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.createError("target",error);
      },
      complete : () => {
        this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
        this.sweetAlert.createSuccess("target");
      }
    });
  }

  editMeasure(){

  }

  cancelTarget(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/Goal/" + this.idGoal);
  }
}
