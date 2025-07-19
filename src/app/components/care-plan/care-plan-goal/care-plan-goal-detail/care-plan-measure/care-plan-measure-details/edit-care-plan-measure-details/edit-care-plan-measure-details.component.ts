import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarePlanAdapterComponent } from 'src/app/adapters/care-plan-adapter/care-plan-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Goal } from 'src/app/models/Care Plan/goal';
import { Measure } from 'src/app/models/Care Plan/measure';
import { Target } from 'src/app/models/Care Plan/target';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-edit-care-plan-measure-details',
  templateUrl: './edit-care-plan-measure-details.component.html',
  styleUrls: ['./edit-care-plan-measure-details.component.scss']
})
export class EditCarePlanMeasureDetailsComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  goal!:Goal;
  measure!:Measure;
  isNew:boolean = false;

  idGoal!:number;
  idTarget!:number;

  measureForm = this.fb.group({
    name:['',Validators.required],
    lOIN:['', Validators.required],
    description:['',Validators.required]
  })

  get name() { return this.measureForm.get('name'); }
  get lOIN() { return this.measureForm.get('lOIN'); }
  get description() { return this.measureForm.get('description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, 
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idGoal = params['goalId']);
    this.goal = this.carePlan.goals?.find(goal => goal.id == this.idGoal)!;

    this.activatedRoute.params.subscribe((params: Params) => this.idTarget = params['targetId']);

    this.measure = JSON.parse('' + localStorage.getItem('measureDetail'));

    //If not exists, create new
    if(this.measure == undefined){
      this.isNew = true;
      this.initDefaults();
    }

    this.measureForm.setValue({name: this.measure.name, LOIN: this.measure.lOINCcode, description: this.measure.description});
  }

  initDefaults(){
    this.measure = {
      id: 0,
      name: "",
      lOINCcode: "",
      description: "",
      telemetriesMeasure: []
    }
  }

  editMeasure(){
    this.measure.name = this.measureForm.get('name')?.value;
    this.measure.lOINCcode = this.measureForm.get('lOIN')?.value;
    this.measure.description = this.measureForm.get('description')?.value;

    if(this.isNew){
      this.carePlanService.createMeasure(this.carePlanAdapter.newMeasure(this.measure)).subscribe({
        next : result =>{
          this.measure = result;
        },
        error : error => {
          this.sweetAlert.createError("measure",error);
        },
        complete : () => {
          this.addMeasureToTarget(this.measure.id);
          this.sweetAlert.createSuccess("measure");
        }
      });
    }
    else{
      this.carePlanService.updateMeasure(this.measure.id, this.carePlanAdapter.newMeasure(this.measure)).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('measureDetail',JSON.stringify(this.measure));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  addMeasureToTarget(idMeasure: number){
    this.carePlanService.updateTargetMeasure(this.idTarget, idMeasure).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.updateError(error);
      },
      complete : () => {
        localStorage.setItem('measureDetail',JSON.stringify(this.measure));
        this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
        this.sweetAlert.updateSuccess();
      }
    });
  }

  cancelMeasure(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/Goal/" + this.idGoal);
  }
}
