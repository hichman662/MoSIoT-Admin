import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Goal } from 'src/app/models/Care Plan/goal';
import { TableDataSource } from 'src/app/models/table-data-source';
import { CareStatusPipe } from 'src/app/pipes/CarePlan/care-status.pipe';
import { CategoryGoalPipe } from 'src/app/pipes/CarePlan/category-goal.pipe';
import { PriorityTypePipe } from 'src/app/pipes/CarePlan/priority-type.pipe';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-care-plan-goal-detail',
  templateUrl: './care-plan-goal-detail.component.html',
  styleUrls: ['./care-plan-goal-detail.component.scss']
})
export class CarePlanGoalDetailComponent implements OnInit {
  id!:number;
  carePlan!:CarePlanTemplate;
  goal!:Goal;
  tableDetailsDataSource!:TableDataSource[];

  constructor(private sweetAlert:SweetAlertsComponent, private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog, private carePlanService: CarePlanService,
    private categoryGoalPipe: CategoryGoalPipe, private priorityTypePipe: PriorityTypePipe, private careStatusPipe: CareStatusPipe) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['goalId']);
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.goal = this.carePlan.goals?.find(goal => goal.id == this.id)!;

    if(this.goal != null){
      this.loadDetailsTable();
    }
  }

  editGoal(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/Goal/" + this.goal.id + "/Edit");
  }

  

  removeDialog(){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: "goal"
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("goal",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
            this.removeGoal();
        }
      }
    });
  }

  removeGoal(){
    this.carePlanService.deleteGoal(this.goal.id).subscribe({
      next: result => {
        console.log("Removing goal...");
      },
      error: error => {
        this.sweetAlert.removeError("goal",error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("goal");
        this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
      }
    })
  }

  loadDetailsTable(){
    this.tableDetailsDataSource = [
      {
        name: "Category",
        value: this.categoryGoalPipe.transform(this.goal.category)
      },
      {
        name: "Description",
        value: this.goal.description
      },
      {
        name: "Priority",
        value: this.priorityTypePipe.transform(this.goal.priority)
      },
      {
        name: "Status",
        value: this.careStatusPipe.transform(this.goal.status)
      },
      {
        name: "Outcome Code",
        value: this.goal.outcomeCode
      }
    ]
  }
}
