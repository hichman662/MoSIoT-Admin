import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { PatientProfile } from 'src/app/models/Patient Profile/patient-profile';
import { CarePlanService } from 'src/app/services/care-plan.service';
import { DeviceTemplateService } from 'src/app/services/device-template.service';
import { PatientProfileService } from 'src/app/services/patient-profile.service';
import { SweetAlertsComponent } from '../shared/sweet-alerts/sweet-alerts.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  devices:DeviceTemplate[] = [];
  patients:PatientProfile[] = [];
  carePlans:CarePlanTemplate[] = [];
  token!:string;

  cargando!:boolean;

  constructor(private sweetAlert: SweetAlertsComponent, private router: Router, private deviceTemplateService:DeviceTemplateService, private carePlanService: CarePlanService, private patientProfileService: PatientProfileService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')!;
    if(this.token == null || this.token == ''){
      // this.sweetAlert.loginRequired();
    }

    else{
      this.cargando = true;

      this.carePlanService.getAllCarePlanTemplate().subscribe({
        next: result => {
          this.carePlans = result;
        },
        error: error => {
          this.cargando = false;
          this.sweetAlert.readError("care plan templates","error getting care plan templates");
        },
        complete: () => {
          localStorage.setItem('carePlanTemplates',JSON.stringify(this.carePlans));
        }
      })

      this.deviceTemplateService.getAllDeviceTemplate().subscribe({
        next: result => {
          this.devices = result;
        },
        error: error => {
          this.cargando = false;
          this.sweetAlert.readError("devices",error);
        },
        complete: () => {
        }
      })

      this.patientProfileService.getAllPatientProfile().subscribe({
        next: result => {
          this.patients = result;
        },
        error: error => {
          this.cargando = false;
          this.sweetAlert.readError("patient profiles",error);
        },
        complete: () => {
        }
      })

      this.cargando = false;
    }
  }
  
  goDevice(){
    if(this.token == null || this.token == ''){
      this.sweetAlert.loginRequired();
    }
    else{
    this.router.navigateByUrl("/DeviceTemplate");
    }
  }
  
  goPatient(){
    if(this.token == null || this.token == ''){
      this.sweetAlert.loginRequired();
    }
    else{
      this.router.navigateByUrl("/PatientProfile");
    }
  }

  goCarePlan(){
    if(this.token == null || this.token == ''){
      this.sweetAlert.loginRequired();
    }
    else{
      this.router.navigateByUrl("/CarePlan");
    }
  }

}
