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
    Name:['',Validators.required],
    LOIN:['', Validators.required],
    Description:['',Validators.required]
  })

  get Name() { return this.measureForm.get('Name'); }
  get LOIN() { return this.measureForm.get('LOIN'); }
  get Description() { return this.measureForm.get('Description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, 
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idGoal = params['goalId']);
    this.goal = this.carePlan.Goals?.find(goal => goal.Id == this.idGoal)!;

    this.activatedRoute.params.subscribe((params: Params) => this.idTarget = params['targetId']);

    this.measure = JSON.parse('' + localStorage.getItem('measureDetail'));

    //If not exists, create new
    if(this.measure == undefined){
      this.isNew = true;
      this.initDefaults();
    }

    this.measureForm.setValue({Name: this.measure.Name, LOIN: this.measure.LOINCcode, Description: this.measure.Description});
  }

  initDefaults(){
    this.measure = {
      Id: 0,
      Name: "",
      LOINCcode: "",
      Description: "",
      TelemetriesMeasure: []
    }
  }

  editMeasure(){
    this.measure.Name = this.measureForm.get('Name')?.value;
    this.measure.LOINCcode = this.measureForm.get('LOIN')?.value;
    this.measure.Description = this.measureForm.get('Description')?.value;

    if(this.isNew){
      this.carePlanService.createMeasure(this.carePlanAdapter.newMeasure(this.measure)).subscribe({
        next : result =>{
          this.measure = result;
        },
        error : error => {
          this.sweetAlert.createError("measure",error);
        },
        complete : () => {
          this.addMeasureToTarget(this.measure.Id);
          this.sweetAlert.createSuccess("measure");
        }
      });
    }
    else{
      this.carePlanService.updateMeasure(this.measure.Id, this.carePlanAdapter.newMeasure(this.measure)).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('measureDetail',JSON.stringify(this.measure));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
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
        this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
        this.sweetAlert.updateSuccess();
      }
    });
  }

  cancelMeasure(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/Goal/" + this.idGoal);
  }
}
