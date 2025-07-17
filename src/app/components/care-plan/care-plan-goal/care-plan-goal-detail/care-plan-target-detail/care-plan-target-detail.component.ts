import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Goal } from 'src/app/models/Care Plan/goal';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'care-plan-target-detail',
  templateUrl: './care-plan-target-detail.component.html',
  styleUrls: ['./care-plan-target-detail.component.scss']
})
export class CarePlanTargetDetailComponent implements OnInit {
  @Input() goal!: Goal;
  carePlan!:CarePlanTemplate;

  constructor(private sweetAlert:SweetAlertsComponent, private router: Router, public dialog: MatDialog, private carePlanService: CarePlanService) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
  }

  editTarget(idTarget:number){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/Goal/" + this.goal.Id + "/Target/" + idTarget + "/Edit");
  }

  createTarget(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/Goal/" + this.goal.Id + "/Target/New");
  }

  removeDialog(id:number){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: name
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("target",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          this.removeTarget(id!);
        }
      }
    });
  }

  removeTarget(idTarget:number){
    this.carePlanService.deleteTarget(idTarget).subscribe({
      next: result => {
        console.log("Removing target...");
      },
      error: error => {
        this.sweetAlert.removeError("target",error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("Target");
        this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
      }
    })
  }
}
