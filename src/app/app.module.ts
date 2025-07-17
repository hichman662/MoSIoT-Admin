//#region Utilities
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from "./components/login/login.component";
import { CatchErrorInterceptor } from './interceptors/catch-error.interceptor';
import { NgChartsModule } from 'ng2-charts';
//#endregion Utilities
//#region Angular Material
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule} from '@angular/material/datepicker';
//#endregion Angular Material
//#region Shared
import { TableComponent } from './components/shared/table/table.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
//#endregion Shared
//#region Adapters
import { PatientProfileAdapterComponent } from './adapters/patient-profile-adapter/patient-profile-adapter.component';
import { DeviceTemplateAdapterComponent } from './adapters/device-template-adapter/device-template-adapter.component';
//#endregion Adapters
//#region Patient
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { PatientProfileDetailComponent } from './components/patient-profile/patient-profile-detail/patient-profile-detail.component';
import { PatientProfileDetailsComponent } from './components/patient-profile/patient-profile-details/patient-profile-details.component';
import { PatientProfileConditionComponent } from './components/patient-profile/patient-profile-condition/patient-profile-condition.component';
import { PatientProfileDisabilityComponent } from './components/patient-profile/patient-profile-disability/patient-profile-disability.component';
import { PatientProfileAccessModeComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-mode.component';
import { PatientProfileConditionDetailComponent } from './components/patient-profile/patient-profile-condition/patient-profile-condition-detail/patient-profile-condition-detail.component';
import { PatientProfileDisabilityDetailComponent } from './components/patient-profile/patient-profile-disability/patient-profile-disability-detail/patient-profile-disability-detail.component';
import { PatientProfileAccessDetailComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/patient-profile-access-detail.component';
import { EditPatientProfileDetailsComponent } from './components/patient-profile/patient-profile-details/edit-patient-profile-details/edit-patient-profile-details.component';
import { EditPatientProfileConditionComponent } from './components/patient-profile/patient-profile-condition/patient-profile-condition-detail/edit-patient-profile-condition/edit-patient-profile-condition.component';
import { EditPatientProfileDisabilityComponent } from './components/patient-profile/patient-profile-disability/patient-profile-disability-detail/edit-patient-profile-disability/edit-patient-profile-disability.component';
import { EditPatientProfileAccessModeComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/edit-patient-profile-access-mode.component';
import { EditPatientProfileAdaptationRequestComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/edit-patient-profile-adaptation-request/edit-patient-profile-adaptation-request.component';
import { CreatePatientProfileAdapatationRequestComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/create-patient-profile-adapatation-request/create-patient-profile-adapatation-request.component';
import { EditPatientProfileAdaptationTypeComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/edit-patient-profile-adaptation-type/edit-patient-profile-adaptation-type.component';
import { CreatePatientProfileAdaptationTypeComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/create-patient-profile-adaptation-type/create-patient-profile-adaptation-type.component';
import { CreatePatientProfileAdaptationDetailComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/create-patient-profile-adaptation-detail/create-patient-profile-adaptation-detail.component';
import { EditPatientProfileAdaptationDetailComponent } from './components/patient-profile/patient-profile-access-mode/patient-profile-access-detail/edit-patient-profile-access-mode/edit-patient-profile-adaptation-detail/edit-patient-profile-adaptation-detail.component';
//#endregion Patient
//#region Device
import { DeviceTemplateComponent } from './components/device-template/device-template.component';
import { DeviceTemplateDetailComponent } from './components/device-template/device-template-detail/device-template-detail.component';
import { DeviceProfileComponent } from './components/device-template/device-profile/device-profile.component';
import { DeviceTelemetryComponent } from './components/device-template/device-telemetry/device-telemetry.component';
import { DevicePropertyComponent } from './components/device-template/device-property/device-property.component';
import { DeviceCommandComponent } from './components/device-template/device-command/device-command.component';
import { DeviceTelemetryDetailComponent } from './components/device-template/device-telemetry/device-telemetry-detail/device-telemetry-detail.component';
import { DevicePropertyDetailComponent } from './components/device-template/device-property/device-property-detail/device-property-detail.component';
import { DeviceCommandDetailComponent } from './components/device-template/device-command/device-command-detail/device-command-detail.component';
import { EditDeviceTelemetryComponent } from './components/device-template/device-telemetry/device-telemetry-detail/edit-device-telemetry/edit-device-telemetry.component';
import { EditDevicePropertyComponent } from './components/device-template/device-property/device-property-detail/edit-device-property/edit-device-property.component';
import { EditDeviceCommandComponent } from './components/device-template/device-command/device-command-detail/edit-device-command/edit-device-command.component';
import { EditDeviceProfileComponent } from './components/device-template/device-profile/edit-device-profile/edit-device-profile.component';
//#endregion Device
//#region CarePlan
import { CarePlanComponent } from './components/care-plan/care-plan.component';
import { CarePlanDetailComponent } from './components/care-plan/care-plan-detail/care-plan-detail.component';
import { CarePlanDetailsComponent } from './components/care-plan/care-plan-details/care-plan-details.component';
import { CarePlanCareActivityComponent } from './components/care-plan/care-plan-care-activity/care-plan-care-activity.component';
import { CarePlanGoalComponent } from './components/care-plan/care-plan-goal/care-plan-goal.component';
import { CarePlanAdressConditionComponent } from './components/care-plan/care-plan-adress-condition/care-plan-adress-condition.component';
import { CareActivityDetailComponent } from './components/care-plan/care-plan-care-activity/care-activity-detail/care-activity-detail.component';
//#endregion CarePlan
//#region Pipes
import { LanguagePipe } from './pipes/language.pipe';
import { SeverityPipe } from './pipes/Device/severity.pipe';
import { TelemetryTypePipe } from './pipes/Device/telemetry-type.pipe';
import { TelemetryUnitTypePipe } from './pipes/Device/telemetry-unit-type.pipe';
import { BooleanToStringPipe } from './pipes/boolean-to-string.pipe';
import { DeviceTypePipe } from './pipes/Device/device-type.pipe';
import { AccessModeTypePipe } from './pipes/PatientProfile/access-mode-type.pipe';
import { AdaptationTypePipe } from './pipes/PatientProfile/adaptation-type.pipe';
import { AdaptationDetailPipe } from './pipes/PatientProfile/adaptation-detail.pipe';
import { HazardValuePipe } from './pipes/PatientProfile/hazard-value.pipe';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { DisabilityTypePipe } from './pipes/PatientProfile/disability-type.pipe';
import { PatientSeverityPipe } from './pipes/PatientProfile/patient-severity.pipe';
import { SchemaTypePipe } from './pipes/Device/schema-type.pipe';
import { ClinicalStatusPipe } from './pipes/PatientProfile/clinical-status.pipe';
import { DiseaseTypePipe } from './pipes/PatientProfile/disease-type.pipe';
import { TypePeriodicityPipe } from './pipes/CarePlan/type-periodicity.pipe';
import { CategoryGoalPipe } from './pipes/CarePlan/category-goal.pipe';
import { CareStatusPipe } from './pipes/CarePlan/care-status.pipe';
import { CarePlanIntentPipe } from './pipes/CarePlan/care-plan-intent.pipe';
import { TypeActivityPipe } from './pipes/CarePlan/type-activity.pipe';
import { FormTypePipe } from './pipes/CarePlan/form-type.pipe';
import { PriorityTypePipe } from './pipes/CarePlan/priority-type.pipe';
import { IsAssignedPipe } from './pipes/is-assigned.pipe';
import { CarePlanGoalDetailComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-goal-detail.component';
import { CarePlanTargetDetailComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-target-detail/care-plan-target-detail.component';
import { EditCarePlanDetailsComponent } from './components/care-plan/care-plan-details/edit-care-plan-details/edit-care-plan-details.component';
import { CarePlanAdapterComponent } from './adapters/care-plan-adapter/care-plan-adapter.component';
import { EditCareActivityDetailComponent } from './components/care-plan/care-plan-care-activity/care-activity-detail/edit-care-activity-detail/edit-care-activity-detail.component';
import { EditCareActivityMedicationComponent } from './components/care-plan/care-plan-care-activity/care-activity-detail/edit-care-activity-medication/edit-care-activity-medication.component';
import { EditCareActivityNutritionOrderComponent } from './components/care-plan/care-plan-care-activity/care-activity-detail/edit-care-activity-nutrition-order/edit-care-activity-nutrition-order.component';
import { EditCareActivityAppoinmentsComponent } from './components/care-plan/care-plan-care-activity/care-activity-detail/edit-care-activity-appoinments/edit-care-activity-appoinments.component';
import { EditCarePlanGoalDetailComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/edit-care-plan-goal-detail/edit-care-plan-goal-detail.component';
import { EditCarePlanTargetDetailComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-target-detail/edit-care-plan-target-detail/edit-care-plan-target-detail.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CarePlanMeasureComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-measure/care-plan-measure.component';
import { CarePlanMeasureDetailComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-measure/care-plan-measure-detail/care-plan-measure-detail.component';
import { CarePlanMeasureDetailsComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-measure/care-plan-measure-details/care-plan-measure-details.component';
import { CarePlanMeasureTelemetryComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-measure/care-plan-measure-telemetry/care-plan-measure-telemetry.component';
import { EditCarePlanMeasureDetailsComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-measure/care-plan-measure-details/edit-care-plan-measure-details/edit-care-plan-measure-details.component';
import { CreateCareplanTargetComponent } from './components/care-plan/care-plan-goal/care-plan-goal-detail/care-plan-target-detail/create-careplan-target/create-careplan-target.component';
import { CommandTypePipe } from './pipes/Device/command-type.pipe';
import { TelemetrySpecificDetailComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/telemetry-specific-detail.component';
import { StateTelemetryDetailComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/state-telemetry-detail/state-telemetry-detail.component';
import { EventTelemtryDetailComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/event-telemtry-detail/event-telemtry-detail.component';
import { LocationTelemtryDetailComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/location-telemtry-detail/location-telemtry-detail.component';
import { SensorTelemtryDetailComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/sensor-telemtry-detail/sensor-telemtry-detail.component';
import { EditEventTelemetryComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/event-telemtry-detail/edit-event-telemetry/edit-event-telemetry.component';
import { EditLocationTelemetryComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/location-telemtry-detail/edit-location-telemetry/edit-location-telemetry.component';
import { EditSensorTelemetryComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/sensor-telemtry-detail/edit-sensor-telemetry/edit-sensor-telemetry.component';
import { EditStateTelemetryComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/state-telemetry-detail/edit-state-telemetry/edit-state-telemetry.component';
import { EditStateDeviceComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/state-telemetry-detail/edit-state-device/edit-state-device.component';
import { CreateStateDeviceComponent } from './components/device-template/device-telemetry/device-telemetry-detail/telemetry-specific-detail/state-telemetry-detail/create-state-device/create-state-device.component';
import { SweetAlertsComponent } from './components/shared/sweet-alerts/sweet-alerts.component';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
//#endregion Pipes

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    DeviceTemplateDetailComponent,
    DeviceTemplateComponent,
    DeviceProfileComponent,
    DeviceTelemetryComponent,
    DevicePropertyComponent,
    DeviceCommandComponent,
    DeviceTelemetryDetailComponent,
    DevicePropertyDetailComponent,
    DeviceCommandDetailComponent,
    LoginComponent,
    TableComponent,
    EditDeviceProfileComponent,
    ConfirmationDialogComponent,
    EditDeviceTelemetryComponent,
    EditDevicePropertyComponent,
    EditDeviceCommandComponent,
    PatientProfileComponent,
    PatientProfileDetailComponent,
    PatientProfileDetailsComponent,
    PatientProfileConditionComponent,
    PatientProfileDisabilityComponent,
    PatientProfileAccessModeComponent,
    PatientProfileConditionDetailComponent,
    PatientProfileDisabilityDetailComponent,
    PatientProfileAccessDetailComponent,
    LanguagePipe,
    SeverityPipe,
    TelemetryTypePipe,
    TelemetryUnitTypePipe,
    BooleanToStringPipe,
    DeviceTypePipe,
    AccessModeTypePipe,
    AdaptationTypePipe,
    AdaptationDetailPipe,
    HazardValuePipe,
    DisabilityTypePipe,
    PatientSeverityPipe,
    SchemaTypePipe,
    ClinicalStatusPipe,
    DiseaseTypePipe,
    EditPatientProfileDetailsComponent,
    EditPatientProfileConditionComponent,
    EditPatientProfileDisabilityComponent,
    EditPatientProfileAccessModeComponent,
    EditPatientProfileAdaptationRequestComponent,
    CreatePatientProfileAdapatationRequestComponent,
    PatientProfileAdapterComponent,
    DeviceTemplateAdapterComponent,
    EditPatientProfileAdaptationTypeComponent,
    CreatePatientProfileAdaptationTypeComponent,
    CreatePatientProfileAdaptationDetailComponent,
    EditPatientProfileAdaptationDetailComponent,
    TypePeriodicityPipe,
    CategoryGoalPipe,
    CareStatusPipe,
    CarePlanIntentPipe,
    TypeActivityPipe,
    FormTypePipe,
    PriorityTypePipe,
    CarePlanComponent,
    CarePlanDetailComponent,
    CarePlanDetailsComponent,
    CarePlanCareActivityComponent,
    CarePlanGoalComponent,
    CarePlanAdressConditionComponent,
    IsAssignedPipe,
    CareActivityDetailComponent,
    CarePlanGoalDetailComponent,
    CarePlanTargetDetailComponent,
    EditCarePlanDetailsComponent,
    CarePlanAdapterComponent,
    EditCareActivityDetailComponent,
    EditCareActivityMedicationComponent,
    EditCareActivityNutritionOrderComponent,
    EditCareActivityAppoinmentsComponent,
    EditCarePlanGoalDetailComponent,
    EditCarePlanTargetDetailComponent,
    CarePlanMeasureComponent,
    CarePlanMeasureDetailComponent,
    CarePlanMeasureDetailsComponent,
    CarePlanMeasureTelemetryComponent,
    EditCarePlanMeasureDetailsComponent,
    CreateCareplanTargetComponent,
    CommandTypePipe,
    TelemetrySpecificDetailComponent,
    StateTelemetryDetailComponent,
    EventTelemtryDetailComponent,
    LocationTelemtryDetailComponent,
    SensorTelemtryDetailComponent,
    EditEventTelemetryComponent,
    EditLocationTelemetryComponent,
    EditSensorTelemetryComponent,
    EditStateTelemetryComponent,
    EditStateDeviceComponent,
    CreateStateDeviceComponent,
    SweetAlertsComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [
    MatDatepickerModule,
    SeverityPipe,
    TelemetryTypePipe,
    TelemetryUnitTypePipe,
    LanguagePipe,
    BooleanToStringPipe,
    DeviceTypePipe,
    AccessModeTypePipe,
    HazardValuePipe,
    UpperCasePipe,
    DisabilityTypePipe,
    PatientSeverityPipe,
    SchemaTypePipe,
    ClinicalStatusPipe,
    DiseaseTypePipe,
    PatientProfileAdapterComponent,
    CarePlanIntentPipe,
    CareStatusPipe,
    DatePipe,
    IsAssignedPipe,
    TypePeriodicityPipe,
    TypeActivityPipe,
    FormTypePipe,
    CategoryGoalPipe,
    PriorityTypePipe,
    CareStatusPipe,
    CarePlanAdapterComponent,
    DeviceTemplateAdapterComponent,
    CommandTypePipe,
    SweetAlertsComponent,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CatchErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }