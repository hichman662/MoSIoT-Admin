import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { CarePlanService } from 'src/app/services/care-plan.service';import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from '../../shared/sweet-alerts/sweet-alerts.component';

@Component({
  selector: 'app-care-plan-detail',
  templateUrl: './care-plan-detail.component.html',
  styleUrls: ['./care-plan-detail.component.scss']
})
export class CarePlanDetailComponent implements OnInit {
  id!:number;
  carePlan!:CarePlanTemplate;
  cargando!:boolean;

  constructor(private sweetAlert:SweetAlertsComponent, private activatedRoute: ActivatedRoute, private carePlanService: CarePlanService, 
    public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.cargando = true;
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['carePlanId']);

    this.carePlanService.getCarePlanById(this.id).subscribe({
      next: result => {
        this.carePlan = result;
      },
      error: error => {
        this.cargando = false;
        alert("An error occurred while accessing the care plan: " + error);
      },
      complete: () => {
        this.cargando = false;
        localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
      }
    })
  }

  removeDialog(){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: this.carePlan.Name
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("remove care plan",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          this.removeCarePlan();
        }
      }
    });
  }

  removeCarePlan(){
    this.carePlanService.deleteCarePlan(this.carePlan.Id).subscribe({
      next: result => {
        console.log("Removing care plan...");
      },
      error: error => {
        alert("There was a problem removing the care plan: " + error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("Care Plan");
        this.router.navigateByUrl("/CarePlan");
      }
    })
  }
}
