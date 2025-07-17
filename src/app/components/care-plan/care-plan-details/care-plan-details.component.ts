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
        Name: "Title",
        Value: this.carePlan.Title
      },
      {
        Name: "Description",
        Value: this.carePlan.Description
      },
      {
        Name: "Duration days",
        Value: this.carePlan.DurationDays
      },
      {
        Name: "Intent",
        Value: this.intentPipe.transform(this.carePlan.Intent)
      },
      {
        Name: "Status",
        Value: this.statusPipe.transform(this.carePlan.Status)
      },
      {
        Name: "Modified",
        Value: this.datePipe.transform( this.carePlan.Modified)
      },
      {
        Name: "Patient",
        Value: this.carePlan.Patient?.Name
      }
    ]
  }

  editDetails(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/EditDetails");
  }
}
