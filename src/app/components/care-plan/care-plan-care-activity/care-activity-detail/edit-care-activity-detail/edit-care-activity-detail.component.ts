import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarePlanAdapterComponent } from 'src/app/adapters/care-plan-adapter/care-plan-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { CareActivity } from 'src/app/models/Care Plan/care-activity';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { CarePlanService } from 'src/app/services/care-plan.service';

@Component({
  selector: 'app-edit-care-activity-detail',
  templateUrl: './edit-care-activity-detail.component.html',
  styleUrls: ['./edit-care-activity-detail.component.scss']
})
export class EditCareActivityDetailComponent implements OnInit {
  carePlan!:CarePlanTemplate;
  careActivity!:CareActivity;
  isNew:boolean = false;
  id!:number;

  careActivityForm = this.fb.group({
    Name:['',Validators.required],
    Type:['',Validators.required],
    Periodicity:['', Validators.required],
    Duration:['', Validators.required],
    Location:['', Validators.required],
    Description:['',Validators.required]
  })

  get Name() { return this.careActivityForm.get('Name'); }
  get Type() { return this.careActivityForm.get('Type'); }
  get Periodicity() { return this.careActivityForm.get('Periodicity'); }
  get Duration() { return this.careActivityForm.get('Duration'); }
  get Location() { return this.careActivityForm.get('Location'); }
  get Description() { return this.careActivityForm.get('Description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private carePlanService:CarePlanService, 
    private router:Router, private activatedRoute: ActivatedRoute, private carePlanAdapter: CarePlanAdapterComponent) { }

  ngOnInit(): void {
    this.carePlan = JSON.parse('' + localStorage.getItem('carePlanDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['careActivityId']);
    this.careActivity = this.carePlan.CareActivities?.find(careActivity => careActivity.Id == this.id)!;

    //If not exists, create new
    if(!this.carePlan.CareActivities?.some(careActivity => careActivity.Id == this.id)){
      this.isNew = true;
      this.initDefaults();
    }

    this.careActivityForm.setValue({Name: this.careActivity.Name, Type: this.careActivity.TypeActivity, Periodicity: this.careActivity.Periodicity, 
      Duration: this.careActivity.Duration, Location: this.careActivity.Location, Description: this.careActivity.Description});
  }

  initDefaults(){
    this.careActivity = {
      Name: "",
      Description: "",
      Duration: 1,
      Location: "",
      Periodicity: 1,
      TypeActivity: 1,
      Id: 0
    }
  }

  editaCareAcitivity(){
    this.careActivity.Name = this.careActivityForm.get('Name')?.value;
    this.careActivity.TypeActivity = this.careActivityForm.get('Type')?.value;
    this.careActivity.Periodicity = this.careActivityForm.get('Periodicity')?.value;
    this.careActivity.Duration = this.careActivityForm.get('Duration')?.value;
    this.careActivity.Location = this.careActivityForm.get('Location')?.value;
    this.careActivity.Description = this.careActivityForm.get('Description')?.value;

    if(this.isNew){
      this.carePlanService.createCareActivity(this.carePlanAdapter.newCareActivity(this.careActivity, this.carePlan.Id)).subscribe({
        next : result =>{
          this.careActivity = result;
        },
        error : error => {
          this.sweetAlert.createError("care activity",error);
        },
        complete : () => {
          localStorage.setItem('carePlanDetail',JSON.stringify(this.carePlan));
          this.router.navigateByUrl("CarePlan/" + this.carePlan.Id);
          this.sweetAlert.createSuccess("care activity");
        }
      });
    }
    else{
      this.carePlanService.updateCareActivity(this.careActivity.Id,this.carePlanAdapter.newCareActivity(this.careActivity, this.carePlan.Id)).subscribe({
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

  cancelCareActivity(){
    this.router.navigateByUrl("CarePlan/ " + this.carePlan.Id);
  }
}
