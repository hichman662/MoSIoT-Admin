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
    name:['',Validators.required],
    description:['',Validators.required],
    product:[''],
    manufacturer:['', Validators.required],
    dosage:['', Validators.required],
    form:['', Validators.required],
    code:['', Validators.required]
  })

  get name() { return this.careActivityMedicationForm.get('name'); }
  get description() { return this.careActivityMedicationForm.get('description'); }
  get product() { return this.careActivityMedicationForm.get('product'); }
  get manufacturer() { return this.careActivityMedicationForm.get('manufacturer'); }
  get dosage() { return this.careActivityMedicationForm.get('dosage'); }
  get form() { return this.careActivityMedicationForm.get('form'); }
  get code() { return this.careActivityMedicationForm.get('code'); }

  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, 
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['careActivityId']);
    this.careActivity = this.carePlan.careActivities?.find(careActivity => careActivity.id == this.id)!;

    if(this.careActivity == undefined){
      this.sweetAlert.readError("care activity","care activity load error");
      this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
    }
    else{
      this.careActivityMedication = this.careActivity.medications!;

      //If not exists, create new
      if(this.careActivityMedication == undefined){
        this.isNew = true;
        this.initDefaults();
      }
    }

    this.careActivityMedicationForm.setValue({name: this.careActivityMedication.name, description: this.careActivityMedication.description, product: this.careActivityMedication.productReference,
    manufacturer: this.careActivityMedication.manufacturer, dosage: this.careActivityMedication.dosage, form: this.careActivityMedication.form, code: this.careActivityMedication.medicationCode});
  }

  initDefaults(){
    this.careActivityMedication = {
      name: "",
      description: "",
      productReference: 1,
      manufacturer: "",
      dosage: "",
      form: 1,
      medicationCode: ""
    }
  }

  editaCareAcitivityMedication(){
    this.careActivityMedication.name = this.careActivityMedicationForm.get('name')?.value;
    this.careActivityMedication.description = this.careActivityMedicationForm.get('description')?.value;
    this.careActivityMedication.productReference = this.careActivityMedicationForm.get('product')?.value;
    this.careActivityMedication.manufacturer = this.careActivityMedicationForm.get('manufacturer')?.value;
    this.careActivityMedication.dosage = this.careActivityMedicationForm.get('dosage')?.value;
    this.careActivityMedication.form = this.careActivityMedicationForm.get('form')?.value;
    this.careActivityMedication.medicationCode = this.careActivityMedicationForm.get('code')?.value;

    if(this.isNew){
      this.carePlanService.createCareActivityMedication(this.carePlanAdapter.newCareMedication(this.careActivityMedication, this.careActivity.id)).subscribe({
        next : result =>{
          this.careActivityMedication = result;
        },
        error : error => {
          this.sweetAlert.createError("medication",error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
          this.sweetAlert.createSuccess("medication");
        }
      });
    }
    else{
      this.carePlanService.updateCareActivityMedication(this.careActivityMedication.productReference,this.carePlanAdapter.newCareMedication(this.careActivityMedication, this.careActivity.id)).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelCareActivityMedication(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.name + "/CareActivity/" + this.careActivity.id);
  }
}
