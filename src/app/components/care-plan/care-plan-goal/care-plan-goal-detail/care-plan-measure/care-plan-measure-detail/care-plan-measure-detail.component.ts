import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Measure } from 'src/app/models/Care Plan/measure';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-care-plan-measure-detail',
  templateUrl: './care-plan-measure-detail.component.html',
  styleUrls: ['./care-plan-measure-detail.component.scss']
})
export class CarePlanMeasureDetailComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  measure!:Measure;
  cargando!:boolean;
  idMeasure!:number;

  constructor(private sweetAlert:SweetAlertsComponent, private activatedRoute: ActivatedRoute, private router: Router,
    public dialog: MatDialog, private carePlanService: CarePlanService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.idMeasure = params['measureId']);

    this.carePlanService.getMeasureById(this.idMeasure).subscribe({
      next: result => {
        this.measure = result;
      },
      error: error => {
        this.sweetAlert.readError("measures",error);
      },
      complete: () => {
        this.cargando = false;
        localStorage.setItem('measureDetail',JSON.stringify(this.measure));
       }
    });
  }

  

  removeDialog(){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: this.measure.Name
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("measure",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          this.removeMeasure();
        }
      }
    });
  }

  removeMeasure(){
    this.carePlanService.deleteMeasure(this.measure.Id).subscribe({
      next: result => {
        console.log("Removing measure...");
      },
      error: error => {
        this.sweetAlert.removeError("measure",error);
      },
      complete: () => {
        this.router.navigateByUrl("/CarePlan/" + this.carePlan.Id);
        this.sweetAlert.removeSuccess("measure");
      }
    })
  }
}
