import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarePlanAdapterComponent } from 'src/app/adapters/care-plan-adapter/care-plan-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CareActivity } from 'src/app/models/Care Plan/care-activity';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Medication } from 'src/app/models/Care Plan/medication';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-edit-care-activity-medication',
  templateUrl: './edit-care-activity-medication.component.html',
  styleUrls: ['./edit-care-activity-medication.component.scss']
})
export class EditCareActivityMedicationComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  careActivity!:CareActivity;
  careActivityMedication!:Medication;
  isNew:boolean = false;
  id!:number;

  careActivityMedicationForm = this.fb.group({
    Name:['',Validators.required],
    Description:['',Validators.required],
    Product:[''],
    Manufacturer:['', Validators.required],
    Dosage:['', Validators.required],
    Form:['', Validators.required],
    Code:['', Validators.required]
  })

  get Name() { return this.careActivityMedicationForm.get('Name'); }
  get Description() { return this.careActivityMedicationForm.get('Description'); }
  get Product() { return this.careActivityMedicationForm.get('Product'); }
  get Manufacturer() { return this.careActivityMedicationForm.get('Manufacturer'); }
  get Dosage() { return this.careActivityMedicationForm.get('Dosage'); }
  get Form() { return this.careActivityMedicationForm.get('Form'); }
  get Code() { return this.careActivityMedicationForm.get('Code'); }

  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, 
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['careActivityId']);
    this.careActivity = this.carePlan.CareActivities?.find(careActivity => careActivity.Id == this.id)!;

    if(this.careActivity == undefined){
      this.sweetAlert.readError("care activity","care activity load error");
      this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
    }
    else{
      this.careActivityMedication = this.careActivity.Medications!;

      //If not exists, create new
      if(this.careActivityMedication == undefined){
        this.isNew = true;
        this.initDefaults();
      }
    }

    this.careActivityMedicationForm.setValue({Name: this.careActivityMedication.Name, Description: this.careActivityMedication.Description, Product: this.careActivityMedication.ProductReference,
    Manufacturer: this.careActivityMedication.Manufacturer, Dosage: this.careActivityMedication.Dosage, Form: this.careActivityMedication.Form, Code: this.careActivityMedication.MedicationCode});
  }

  initDefaults(){
    this.careActivityMedication = {
      Name: "",
      Description: "",
      ProductReference: 1,
      Manufacturer: "",
      Dosage: "",
      Form: 1,
      MedicationCode: ""
    }
  }

  editaCareAcitivityMedication(){
    this.careActivityMedication.Name = this.careActivityMedicationForm.get('Name')?.value;
    this.careActivityMedication.Description = this.careActivityMedicationForm.get('Description')?.value;
    this.careActivityMedication.ProductReference = this.careActivityMedicationForm.get('Product')?.value;
    this.careActivityMedication.Manufacturer = this.careActivityMedicationForm.get('Manufacturer')?.value;
    this.careActivityMedication.Dosage = this.careActivityMedicationForm.get('Dosage')?.value;
    this.careActivityMedication.Form = this.careActivityMedicationForm.get('Form')?.value;
    this.careActivityMedication.MedicationCode = this.careActivityMedicationForm.get('Code')?.value;

    if(this.isNew){
      this.carePlanService.createCareActivityMedication(this.carePlanAdapter.newCareMedication(this.careActivityMedication, this.careActivity.Id)).subscribe({
        next : result =>{
          this.careActivityMedication = result;
        },
        error : error => {
          this.sweetAlert.createError("medication",error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
          this.sweetAlert.createSuccess("medication");
        }
      });
    }
    else{
      this.carePlanService.updateCareActivityMedication(this.careActivityMedication.ProductReference,this.carePlanAdapter.newCareMedication(this.careActivityMedication, this.careActivity.Id)).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelCareActivityMedication(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Name + "/CareActivity/" + this.careActivity.Id);
  }
}
