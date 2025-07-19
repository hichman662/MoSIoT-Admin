import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Measure } from 'src/app/models/Care Plan/measure';
import { Telemetry } from 'src/app/models/Device Template/telemetry';
import { CarePlanService } from 'src/app/services/care-plan.service';
import { DeviceTemplateService } from 'src/app/services/device-template.service';

@Component({
  selector: 'care-plan-measure-telemetry',
  templateUrl: './care-plan-measure-telemetry.component.html',
  styleUrls: ['./care-plan-measure-telemetry.component.scss']
})
export class CarePlanMeasureTelemetryComponent implements OnInit {
  measure!:Measure;
  carePlan!:CarePlanTemplate;
  newTelemetry:boolean = false;
  newMeasure:boolean = false;

  telemetries!:Telemetry[];

  idGoal!:number;
  idTarget!:number;

  telemetryForm = this.fb.group({
    telemetry:['',Validators.required]
  })

  get condition() { return this.telemetryForm.get('telemetry'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private activatedRoute: ActivatedRoute, private carePlanService:CarePlanService, private deviceTemplateService: DeviceTemplateService, private router:Router) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.measure = JSON.parse('' + localStorage.getItem('measureDetail'));

    if(this.measure == undefined){
      this.newMeasure = true;
    }

    this.activatedRoute.params.subscribe((params: Params) => this.idGoal = params['goalId']);
    this.activatedRoute.params.subscribe((params: Params) => this.idTarget = params['targetId']);

    this.getTelemetries();
  }

  addTelemetry(){
    this.newTelemetry = true;
  }

  editTelemetry(){
    if(!this.newMeasure){
      let idTelemetry:number[] = this.telemetryForm.get('telemetry')?.value;

      idTelemetry = this.deleteDuplicates(idTelemetry);

      if(idTelemetry.length > 0){
        this.carePlanService.updateMeasureTelemtry(this.measure.id,idTelemetry).subscribe({
          next : result =>{
            console.log(result);
          },
          error : error => {
            this.sweetAlert.updateError(error);
          },
          complete : () => {
            this.router.navigateByUrl("CarePlan/ " + this.carePlan.id);
            this.sweetAlert.updateSuccess();
          }
        });
      }
    }
    else{
      this.sweetAlert.createError("Telemtry","First create a Measure");
    }
  }

  cancelTelemetry(){
    this.newTelemetry = false;
  }

  getTelemetries(){
    this.deviceTemplateService.getAllTelemetry().subscribe({
      next: result => {
        this.telemetries = result;
      },
      error: error => {
        this.sweetAlert.readError("telemetries",error);
      },
      complete: () => { }
    })
  }

  deleteDuplicates(newTelemetries:number[]){
    let telemetry!: Telemetry;
    newTelemetries.forEach(newTelemetry => {
      telemetry = this.measure.telemetriesMeasure?.find(telemetry => telemetry.id == newTelemetry)!;
      if(newTelemetry == telemetry.id){
          this.sweetAlert.createError("Telemetry: " + telemetry.name,"The telemetry was already added to this Measure");
          newTelemetries.splice(newTelemetries.indexOf(newTelemetry),1);
      }
    });
    return newTelemetries;
  }

  removeTelemetry(idTelemetry:number){
    this.measure.telemetriesMeasure?.splice(this.measure.telemetriesMeasure?.map(telemetry => telemetry.id).indexOf(idTelemetry),1);

    this.carePlanService.updateMeasure(this.measure.id,this.measure).subscribe({
      next : result =>{
        console.log(result);
      },
      error : error => {
        this.sweetAlert.updateError(error);
      },
      complete : () => {
        localStorage.setItem('measureDetail',JSON.stringify(this.measure));
        this.router.navigateByUrl("CarePlan/ " + this.carePlan.id);
        this.sweetAlert.updateSuccess();
      }
    });
  }

  details(id:number){
    this.router.navigate(["CarePlan/" + this.carePlan.name + "/AdressCondition/" + id]);
  }
}
