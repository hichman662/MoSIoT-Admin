//#region imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarePlanComponent } from './components/care-plan/care-plan.component';
import { DeviceTemplateComponent } from './components/device-template/device-template.component';
import { DeviceTemplateDetailComponent } from './components/device-template/device-template-detail/device-template-detail.component';

import { DeviceTelemetryDetailComponent } from './components/device-template/device-telemetry/device-telemetry-detail/device-telemetry-detail.component';
import { DevicePropertyDetailComponent } from './components/device-template/device-property/device-property-detail/device-property-detail.component';
import { DeviceCommandDetailComponent } from './components/device-template/device-command/device-command-detail/device-command-detail.component';

import {LoginComponent} from "./components/login/login.component";
import { EditDeviceProfileComponent } from './components/device-template/device-profile/edit-device-profile/edit-device-profile.component';
import { EditDeviceTelemetryComponent } from './components/device-template/device-telemetry/device-telemetry-detail/edit-device-telemetry/edit-device-telemetry.component';
import { EditDevicePropertyComponent } from './components/device-template/device-property/device-property-detail/edit-device-property/edit-device-property.component';
import { EditDeviceCommandComponent } from './components/device-template/device-command/device-command-detail/edit-device-command/edit-device-command.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { PatientProfileDetailComponent } from './components/patient-profile/patient-profile-detail/patient-profile-detail.component';
import { PatientProfileConditionDetailComponent } from './components/patient-profile/patient-profile-condition/patient-profile-condition-detail/patient-profile-condition-detail.component';
import { PatientProfileDisabilityDetailComponent } from './components/patient-profile/patient-profile-disability/patient-profile-disability-detail/patient-profile-disability-detail.component';
import { PatientProfileAccessDetailComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/patient-profile-access-detail.component';
import { EditPatientProfileDetailsComponent } from './components/patient-profile/patient-profile-details/edit-patient-profile-details/edit-patient-profile-details.component';
import { EditPatientProfileConditionComponent } from './components/patient-profile/patient-profile-condition/patient-profile-condition-detail/edit-patient-profile-condition/edit-patient-profile-condition.component';
import { EditPatientProfileDisabilityComponent } from './components/patient-profile/patient-profile-disability/patient-profile-disability-detail/edit-patient-profile-disability/edit-patient-profile-disability.component';
import { EditPatientProfileAccessModeComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/edit-patient-profile-access-mode.component';
import { EditPatientProfileAdaptationRequestComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/edit-patient-profile-adaptation-request/edit-patient-profile-adaptation-request.component';
import { CreatePatientProfileAdapatationRequestComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/create-patient-profile-adapatation-request/create-patient-profile-adapatation-request.component';
import { CreatePatientProfileAdaptationTypeComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/create-patient-profile-adaptation-type/create-patient-profile-adaptation-type.component';
import { EditPatientProfileAdaptationTypeComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/edit-patient-profile-adaptation-type/edit-patient-profile-adaptation-type.component';
import { CreatePatientProfileAdaptationDetailComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/create-patient-profile-adaptation-detail/create-patient-profile-adaptation-detail.component';
import { EditPatientProfileAdaptationDetailComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/edit-patient-profile-adaptation-detail/edit-patient-profile-adaptation-detail.component';
import { CarePlanDetailComponent } from './components/care-plan/care-plan-detail/care-plan-detail.component';
import { CareActivityDetailComponent } from './components/care-plan/care-plan-care-activity/care-activity-detail/care-activity-detail.component';
import { CarePlanGoalDetailComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-goal-detail.component';
import { EditCarePlanDetailsComponent } from './components/care-plan/care-plan-details/edit-care-plan-details/edit-care-plan-details.component';
import { EditCareActivityDetailComponent } from './components/care-plan/care-plan-care-activity/care-activity-detail/edit-care-activity-detail/edit-care-activity-detail.component';
import { EditCareActivityMedicationComponent } from './components/care-plan/care-plan-care-activity/care-activity-detail/edit-care-activity-medication/edit-care-activity-medication.component';
import { EditCareActivityNutritionOrderComponent } from './components/care-plan/care-plan-care-activity/care-activity-detail/edit-care-activity-nutrition-order/edit-care-activity-nutrition-order.component';
import { EditCareActivityAppoinmentsComponent } from './components/care-plan/care-plan-care-activity/care-activity-detail/edit-care-activity-appoinments/edit-care-activity-appoinments.component';
import { EditCarePlanGoalDetailComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/edit-care-plan-goal-detail/edit-care-plan-goal-detail.component';
import { EditCarePlanTargetDetailComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-target-detail/edit-care-plan-target-detail/edit-care-plan-target-detail.component';
import { CarePlanMeasureDetailComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-measure/care-plan-measure-detail/care-plan-measure-detail.component';
import { EditCarePlanMeasureDetailsComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-measure/care-plan-measure-details/edit-care-plan-measure-details/edit-care-plan-measure-details.component';
import { CreateCareplanTargetComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-target-detail/create-careplan-target/create-careplan-target.component';
import { EditEventTelemetryComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/event-telemtry-detail/edit-event-telemetry/edit-event-telemetry.component';
import { EditLocationTelemetryComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/location-telemtry-detail/edit-location-telemetry/edit-location-telemetry.component';
import { EditSensorTelemetryComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/sensor-telemtry-detail/edit-sensor-telemetry/edit-sensor-telemetry.component';
import { EditStateTelemetryComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/state-telemetry-detail/edit-state-telemetry/edit-state-telemetry.component';
import { EditStateDeviceComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/state-telemetry-detail/edit-state-device/edit-state-device.component';
import { CreateStateDeviceComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/state-telemetry-detail/create-state-device/create-state-device.component';
//#endregion imports

const routes: Routes = [
  {
    path:'Home',
    component:HomeComponent
  },

  //#region DeviceTemplate routes
  {
    path:'DeviceTemplate',
    component:DeviceTemplateComponent
  },
  {
    path:'DeviceTemplate/:deviceId',
    component:DeviceTemplateDetailComponent
  },
  {
    path:'DeviceTemplate/:deviceId/EditProfile',
    component:EditDeviceProfileComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Telemetry/:telemetryId',
    component:DeviceTelemetryDetailComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Telemetry/:telemetryId/Edit',
    component:EditDeviceTelemetryComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Telemetry/:telemetryId/Event/:eventName/Edit',
    component:EditEventTelemetryComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Telemetry/:telemetryId/Location/:locationName/Edit',
    component:EditLocationTelemetryComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Telemetry/:telemetryId/Sensor/:locationName/Edit',
    component:EditSensorTelemetryComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Telemetry/:telemetryId/State/:stateName/Edit',
    component:EditStateTelemetryComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Telemetry/:telemetryId/State/:stateId/StateDevice/:stateDeviceId/Edit',
    component:EditStateDeviceComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Telemetry/:telemetryId/State/:stateId/StateDevice/New',
    component:CreateStateDeviceComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Property/:propertyId',
    component:DevicePropertyDetailComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Property/:propertyId/Edit',
    component:EditDevicePropertyComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Command/:commandId',
    component:DeviceCommandDetailComponent
  },
  {
    path:'DeviceTemplate/:deviceName/Command/:commandId/Edit',
    component:EditDeviceCommandComponent
  },
  //#endregion
  //#region PatientProfile routes
  {
    path:'PatientProfile',
    component:PatientProfileComponent
  },
  {
    path:'PatientProfile/:patientProfileId',
    component:PatientProfileDetailComponent
  },
  {
    path:'PatientProfile/:patientProfileName/EditDetails',
    component:EditPatientProfileDetailsComponent
  },
  {
    path:'PatientProfile/:patientProfileName/Condition/:conditionId',
    component:PatientProfileConditionDetailComponent
  },
  {
    path:'PatientProfile/:patientProfileName/Condition/:conditionId/Edit',
    component:EditPatientProfileConditionComponent
  },
  {
    path:'PatientProfile/:patientProfileName/Disability/:disabilityId',
    component:PatientProfileDisabilityDetailComponent
  },
  {
    path:'PatientProfile/:patientProfileName/Disability/:disabilityId/Edit',
    component:EditPatientProfileDisabilityComponent
  },
  {
    path:'PatientProfile/:patientProfileName/AccessMode/:accessModeId',
    component:PatientProfileAccessDetailComponent
  },
  {
    path:'PatientProfile/:patientProfileName/AccessMode/:accessModeId/Edit',
    component:EditPatientProfileAccessModeComponent
  },
  {
    path:'PatientProfile/:patientProfileName/AccessMode/:accessModeId/AdaptationRequest/:adaptationRequestId/Edit',
    component:EditPatientProfileAdaptationRequestComponent
  },
  {
    path:'PatientProfile/:patientProfileName/AccessMode/:accessModeId/AdaptationRequest/New',
    component:CreatePatientProfileAdapatationRequestComponent
  },
  {
    path:'PatientProfile/:patientProfileName/AccessMode/:accessModeId/AdaptationType/:adaptationTypeId/Edit',
    component:EditPatientProfileAdaptationTypeComponent
  },
  {
    path:'PatientProfile/:patientProfileName/AccessMode/:accessModeId/AdaptationType/New',
    component: CreatePatientProfileAdaptationTypeComponent
  },
  {
    path:'PatientProfile/:patientProfileName/AccessMode/:accessModeId/AdaptationDetail/:adaptationDetailId/Edit',
    component:EditPatientProfileAdaptationDetailComponent
  },
  {
    path:'PatientProfile/:patientProfileName/AccessMode/:accessModeId/AdaptationDetail/New',
    component:CreatePatientProfileAdaptationDetailComponent
  },
  //#endregion
  //#region CarePlan routes
  {
    path:'CarePlan',
    component:CarePlanComponent
  },
  {
    path:'CarePlan/:carePlanId',
    component:CarePlanDetailComponent
  },
  {
    path:'CarePlan/:carePlanName/EditDetails',
    component:EditCarePlanDetailsComponent
  },
  {
    path:'CarePlan/:carePlanName/CareActivity/:careActivtyId',
    component:CareActivityDetailComponent
  },
  {
    path:'CarePlan/:carePlanName/CareActivity/:careActivityId/Edit',
    component:EditCareActivityDetailComponent
  },
  {
    path:'CarePlan/:carePlanName/CareActivity/:careActivityId/Medication/Edit',
    component:EditCareActivityMedicationComponent
  },
  {
    path:'CarePlan/:carePlanName/CareActivity/:careActivityId/Nutrition/Edit',
    component:EditCareActivityNutritionOrderComponent
  },
  {
    path:'CarePlan/:carePlanName/CareActivity/:careActivityId/Appointment/Edit',
    component:EditCareActivityAppoinmentsComponent
  },
  {
    path:'CarePlan/:carePlanName/Goal/:goalId',
    component:CarePlanGoalDetailComponent
  },
  {
    path:'CarePlan/:carePlanName/Goal/:goalId/Edit',
    component:EditCarePlanGoalDetailComponent
  },
  {
    path:'CarePlan/:carePlanName/Goal/:goalId/Target/:targetId/Edit',
    component:EditCarePlanTargetDetailComponent
  },
  {
    path:'CarePlan/:carePlanName/Goal/:goalId/Target/New',
    component:CreateCareplanTargetComponent
  },
  {
    path:'CarePlan/:carePlanName/Goal/:goalId/Measure/:measureId',
    component:CarePlanMeasureDetailComponent
  },
  {
    path:'CarePlan/:carePlanName/Goal/:goalId/Target/:targetId/Measure/:measureId/Edit',
    component:EditCarePlanMeasureDetailsComponent
  },
  //#endregion
  {
    path:'Login',
    component:LoginComponent
  },
  {
    path:'',
    redirectTo:'Home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution:'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
