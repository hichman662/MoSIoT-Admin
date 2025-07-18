import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Measure } from 'src/app/models/Care Plan/measure';
import { TableDataSource } from 'src/app/models/table-data-source';

@Component({
  selector: 'care-plan-measure-details',
  templateUrl: './care-plan-measure-details.component.html',
  styleUrls: ['./care-plan-measure-details.component.scss']
})
export class CarePlanMeasureDetailsComponent implements OnInit {
  tableDataSource!:TableDataSource[];
  carePlan!:CarePlanTemplate;
  measure!:Measure;
  isNew:boolean = false;

  idGoal!:number;
  idTarget!:number;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.measure = JSON.parse('' + localStorage.getItem('measureDetail'));

    this.activatedRoute.params.subscribe((params: Params) => this.idGoal = params['goalId']);
    this.activatedRoute.params.subscribe((params: Params) => this.idTarget = params['targetId']);

    this.measure = JSON.parse('' + localStorage.getItem('measureDetail'));

    if(this.measure == undefined){
      this.isNew = true;
    }
    else{
      this.loadTable();
    }
  }

  loadTable(){
    this.tableDataSource = [
      {
        name: "Name",
        value: this.measure.name
      },
      {
        name: "Description",
        value: this.measure.description
      },
      {
        name: "LOIN Code",
        value: this.measure.lOINCcode
      }
    ]
  }

  editDetails(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/Goal/" + this.idGoal + "/Target/" + this.idTarget + "/Measure/" + this.measure.id + "/Edit");
  }

  createMeasure(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/Goal/" + this.idGoal + "/Target/" + this.idTarget + "/Measure/" + -999 + "/Edit");
  }

}
