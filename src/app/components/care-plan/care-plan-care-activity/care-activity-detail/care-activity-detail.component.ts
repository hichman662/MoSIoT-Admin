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
    this.careActivity = this.carePlan.CareActivities?.find(careActivity => careActivity.Id == this.id)!;

    if(this.careActivity != null){
      this.loadDetailsTable();

      if(this.careActivity.Medications != null){
        this.loadMedicationTable(this.careActivity.Medications);
      }
      else{
        this.tableMedicationDataSource = [{Name: "Empty", Value: ""}]
      }

      if(this.careActivity.NutritionOrders != null){
        this.loadNutritionOrderTable(this.careActivity.NutritionOrders);
      }
      else{
        this.tableNutritionOrderDataSource = [{Name: "Empty", Value: ""}]
      }

      if(this.careActivity.Appointments != null){
        this.loadAppointmentsTable(this.careActivity.Appointments);
      }
      else{
        this.tableAppoinmentsDataSource = [{Name: "Empty", Value: ""}]
      }
    }
    else{
      this.sweetAlert.createError("care activity","care activity error");
      this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
    }
    
  }

  editCareActivity(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/CareActivity/" + this.careActivity.Id + "/Edit");
  }

  editCareActivityMedication(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/CareActivity/" + this.careActivity.Id + "/Medication/Edit");
  }

  editCareActivityNutrition(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/CareActivity/" + this.careActivity.Id + "/Nutrition/Edit");
  }

  editCareActivityAppointment(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/CareActivity/" + this.careActivity.Id + "/Appointment/Edit");
  }

  removeDialog(){
    let removeConfirm:number = 0;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '250px',
      data: this.careActivity.Name
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
    this.carePlanService.deleteCareActivity(this.careActivity.Id).subscribe({
      next: result => {
        console.log("Removing care activity...");
      },
      error: error => {
        this.sweetAlert.removeError("care activity",error);
      },
      complete: () => {
        this.sweetAlert.removeSuccess("Care activity");
        this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
      }
    })
  }

  loadDetailsTable(){
    this.tableDetailsDataSource = [
      {
        Name: "Type Activity",
        Value: this.typeActivityPipe.transform(this.careActivity.TypeActivity)
      },
      {
        Name: "Description",
        Value: this.careActivity.Description
      },
      {
        Name: "Periodicity",
        Value: this.typePeriodicityPipe.transform(this.careActivity.Periodicity)
      },
      {
        Name: "Duration",
        Value: this.careActivity.Duration
      },
      {
        Name: "Location",
        Value: this.careActivity.Location
      }
    ]
  }

  loadMedicationTable(medication:Medication){
    this.tableMedicationDataSource = [
      {
        Name: "Name",
        Value: medication.Name
      },
      {
        Name: "Description",
        Value: medication.Description
      },
      {
        Name: "Product Reference",
        Value: medication.ProductReference
      },
      {
        Name: "Manufacturer",
        Value: medication.Manufacturer
      },
      {
        Name: "Dosage",
        Value: medication.Dosage
      },
      {
        Name: "Form",
        Value: this.formTypePipe.transform(medication.Form)
      },
      {
        Name: "Medication Code",
        Value: medication.MedicationCode
      }
    ]
  }

  loadNutritionOrderTable(nutritionOrder:NutritionOrder){
    this.tableNutritionOrderDataSource = [
      {
        Name: "Name",
        Value: nutritionOrder.Name
      },
      {
        Name: "Description",
        Value: nutritionOrder.Description
      },
      {
        Name: "Diet Code",
        Value: nutritionOrder.DietCode
      }
    ]
  }

  loadAppointmentsTable(appointment:Appointment){
    this.tableAppoinmentsDataSource = [
      {
        Name: "Description",
        Value: appointment.Description
      },
      {
        Name: "Direction",
        Value: appointment.Direction
      },
      {
        Name: "Reason Code",
        Value: appointment.ReasonCode
      },
      {
        Name: "Virtual",
        Value: this.booleanToStringPipe.transform(appointment.IsVirtual)
      }
    ]
  }
}