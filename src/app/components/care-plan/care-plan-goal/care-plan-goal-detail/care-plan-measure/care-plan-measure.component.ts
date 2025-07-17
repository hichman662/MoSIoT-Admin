import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Goal } from 'src/app/models/Care Plan/goal';
import { Measure } from 'src/app/models/Care Plan/measure';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'care-plan-measure',
  templateUrl: './care-plan-measure.component.html',
  styleUrls: ['./care-plan-measure.component.scss']
})
export class CarePlanMeasureComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  goal!:Goal;
  measures!:Measure[];
  loading:boolean = true;

  idGoal!:number;

  constructor(private sweetAlert:SweetAlertsComponent, private activatedRoute: ActivatedRoute, private router: Router, private carePlanService: CarePlanService) { }

  ngOnInit(): void {
    this.loading = true;

    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idGoal = params['goalId']);
    this.goal = this.carePlan.Goals?.find(goal => goal.Id == this.idGoal)!;

    this.carePlanService.getAllMeasure().subscribe({
      next: result => {
        this.measures = result;
      },
      error: error => {
        this.sweetAlert.readError("measures",error);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  details(id:number){
    this.router.navigate(["CarePlan/" + this.carePlan.Name + "/Goal/" + this.goal.Id + "/Measure/" + id]);
  }

  createMeasure(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/Goal/" + this.goal.Id + "/Measure/" + -999 + "/Edit");
  }
}
