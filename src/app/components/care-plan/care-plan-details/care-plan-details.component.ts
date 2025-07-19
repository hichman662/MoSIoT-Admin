import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { TableDataSource } from 'src/app/models/table-data-source';
import { CarePlanIntentPipe } from 'src/app/pipes/CarePlan/care-plan-intent.pipe';
import { CareStatusPipe } from 'src/app/pipes/CarePlan/care-status.pipe';
import { IsAssignedPipe } from 'src/app/pipes/is-assigned.pipe';

@Component({
  selector: 'care-plan-details',
  templateUrl: './care-plan-details.component.html',
  styleUrls: ['./care-plan-details.component.scss']
})
export class CarePlanDetailsComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  tableDataSource!:TableDataSource[];

  constructor(private router: Router, private intentPipe: CarePlanIntentPipe, private statusPipe: CareStatusPipe, private datePipe: DatePipe, private isAssignedPipe: IsAssignedPipe) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.loadTable();
  }

  loadTable(){
    this.tableDataSource = [
      {
        name: "Title",
        value: this.carePlan.title
      },
      {
        name: "Description",
        value: this.carePlan.description
      },
      {
        name: "Duration days",
        value: this.carePlan.durationDays
      },
      {
        name: "Intent",
        value: this.intentPipe.transform(this.carePlan.intent)
      },
      {
        name: "Status",
        value: this.statusPipe.transform(this.carePlan.status)
      },
      {
        name: "Modified",
        value: this.datePipe.transform( this.carePlan.modified)
      },
      {
        name: "Patient",
        value: this.carePlan.patient?.name
      }
    ]
  }

  editDetails(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/EditDetails");
  }
}
