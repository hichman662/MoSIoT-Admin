import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';

@Component({
  selector: 'care-plan-care-activity',
  templateUrl: './care-plan-care-activity.component.html',
  styleUrls: ['./care-plan-care-activity.component.scss']
})
export class CarePlanCareActivityComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
  }

  details(id:number){
    this.router.navigate(["CarePlan/" + this.carePlan.Name + "/CareActivity/" + id]);
  }

  createCareActivity(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/CareActivity/" + -999 + "/Edit");
  }
}
