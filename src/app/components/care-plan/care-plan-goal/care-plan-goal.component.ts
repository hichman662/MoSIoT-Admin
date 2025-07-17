import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';

@Component({
  selector: 'care-plan-goal',
  templateUrl: './care-plan-goal.component.html',
  styleUrls: ['./care-plan-goal.component.scss']
})
export class CarePlanGoalComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
  }

  details(id:number){
    this.router.navigate(["CarePlan/" + this.carePlan.Name + "/Goal/" + id]);
  }

  createGoal(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/Goal/" + -999 + "/Edit");
  }
}
