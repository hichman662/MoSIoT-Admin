import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { Appointment } from 'src/app/models/Care Plan/appointment';
import { CareActivity } from 'src/app/models/Care Plan/care-activity';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Medication } from 'src/app/models/Care Plan/medication';
import { NutritionOrder } from 'src/app/models/Care Plan/nutrition-order';
import { TableDataSource } from 'src/app/models/table-data-source';
import { BooleanToStringPipe } from 'src/app/pipes/boolean-to-string.pipe';
import { FormTypePipe } from 'src/app/pipes/CarePlan/form-type.pipe';
import { TypeActivityPipe } from 'src/app/pipes/CarePlan/type-activity.pipe';
import { TypePeriodicityPipe } from 'src/app/pipes/CarePlan/type-periodicity.pipe';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-care-activity-detail',
  templateUrl: './care-activity-detail.component.html',
  styleUrls: ['./care-activity-detail.component.scss']
})

export class CareActivityDetailComponent implements OnInit {
  id!:number;
  carePlan!:CarePlanTemplate;
  careActivity!:CareActivity;

  tableDetailsDataSource!:TableDataSource[];
  tableMedicationDataSource!:TableDataSource[];
  tableNutritionOrderDataSource!:TableDataSource[];
  tableAppoinmentsDataSource!:TableDataSource[];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog, private carePlanService: CarePlanService, 
    private typePeriodicityPipe: TypePeriodicityPipe, private typeActivityPipe: TypeActivityPipe, private booleanToStringPipe: BooleanToStringPipe,
    private formTypePipe: FormTypePipe, private sweetAlert:SweetAlertsComponent) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['careActivtyId']);
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.careActivity = this.carePlan.careActivities?.find(careActivity => careActivity.id == this.id)!;

    if(this.careActivity != null){
      this.loadDetailsTable();

      if(this.careActivity.medications != null){
        this.loadMedicationTable(this.careActivity.medications);
      }
      else{
        this.tableMedicationDataSource = [{name: "Empty", value: ""}]
      }

      if(this.careActivity.nutritionOrders != null){
        this.loadNutritionOrderTable(this.careActivity.nutritionOrders);
      }
      else{
        this.tableNutritionOrderDataSource = [{name: "Empty", value: ""}]
      }

      if(this.careActivity.appointments != null){
        this.loadAppointmentsTable(this.careActivity.appointments);
      }
      else{
        this.tableAppoinmentsDataSource = [{name: "Empty", value: ""}]
      }
    }
    else{
      this.sweetAlert.createError("care activity","care activity error");
      this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
    }
    
  }

  editCareActivity(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/CareActivity/" + this.careActivity.id + "/Edit");
  }

  editCareActivityMedication(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/CareActivity/" + this.careActivity.id + "/Medication/Edit");
  }

  editCareActivityNutrition(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/CareActivity/" + this.careActivity.id + "/Nutrition/Edit");
  }

  editCareActivityAppointment(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/CareActivity/" + this.careActivity.id + "/Appointment/Edit");
  }

  removeDialog(){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: this.careActivity.name
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        removeConfirm = result;
      },
      error: error => {
        this.sweetAlert.removeError("care activity",error);
        removeConfirm = 0;
      },
      complete: () => {
        if(removeConfirm == 1){
          this.removeCareActivity();
        }
      }
    });
  }

  removeCareActivity(){
    this.carePlanService.deleteCareActivity(this.careActivity.id).subscribe({
      next: result => {
        console.log("Removing care activity...");
      },
      error: error => {
        this.sweetAlert.removeError("care activity",error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("Care activity");
        this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
      }
    })
  }

  loadDetailsTable(){
    this.tableDetailsDataSource = [
      {
        name: "Type Activity",
        value: this.typeActivityPipe.transform(this.careActivity.typeActivity)
      },
      {
        name: "Description",
        value: this.careActivity.description
      },
      {
        name: "Periodicity",
        value: this.typePeriodicityPipe.transform(this.careActivity.periodicity)
      },
      {
        name: "Duration",
        value: this.careActivity.duration
      },
      {
        name: "Location",
        value: this.careActivity.location
      }
    ]
  }

  loadMedicationTable(medication:Medication){
    this.tableMedicationDataSource = [
      {
        name: "Name",
        value: medication.name
      },
      {
        name: "Description",
        value: medication.description
      },
      {
        name: "Product Reference",
        value: medication.productReference
      },
      {
        name: "Manufacturer",
        value: medication.manufacturer
      },
      {
        name: "Dosage",
        value: medication.dosage
      },
      {
        name: "Form",
        value: this.formTypePipe.transform(medication.form)
      },
      {
        name: "Medication Code",
        value: medication.medicationCode
      }
    ]
  }

  loadNutritionOrderTable(nutritionOrder:NutritionOrder){
    this.tableNutritionOrderDataSource = [
      {
        name: "Name",
        value: nutritionOrder.name
      },
      {
        name: "Description",
        value: nutritionOrder.description
      },
      {
        name: "Diet Code",
        value: nutritionOrder.dietCode
      }
    ]
  }

  loadAppointmentsTable(appointment:Appointment){
    this.tableAppoinmentsDataSource = [
      {
        name: "Description",
        value: appointment.description
      },
      {
        name: "Direction",
        value: appointment.direction
      },
      {
        name: "Reason Code",
        value: appointment.reasonCode
      },
      {
        name: "Virtual",
        value: this.booleanToStringPipe.transform(appointment.isVirtual)
      }
    ]
  }
}