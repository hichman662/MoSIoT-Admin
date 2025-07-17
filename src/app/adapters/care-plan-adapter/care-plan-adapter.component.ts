import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/Care Plan/appointment';
import { CareActivity } from 'src/app/models/Care Plan/care-activity';
import { CarePlanTemplate } from 'src/app/models/Care Plan/care-plan-template';
import { Goal } from 'src/app/models/Care Plan/goal';
import { Measure } from 'src/app/models/Care Plan/measure';
import { Medication } from 'src/app/models/Care Plan/medication';
import { NewAppointment } from 'src/app/models/Care Plan/new-appointment';
import { NewCareActivity } from 'src/app/models/Care Plan/new-care-activity';
import { NewCarePlan } from 'src/app/models/Care Plan/new-care-plan';
import { NewGoal } from 'src/app/models/Care Plan/new-goal';
import { NewMeasure } from 'src/app/models/Care Plan/new-measure';
import { NewMedication } from 'src/app/models/Care Plan/new-medication';
import { NewNutrition } from 'src/app/models/Care Plan/new-nutrition';
import { NewTarget } from 'src/app/models/Care Plan/new-target';
import { NutritionOrder } from 'src/app/models/Care Plan/nutrition-order';
import { Target } from 'src/app/models/Care Plan/target';

@Component({
  selector: 'app-care-plan-adapter',
  templateUrl: './care-plan-adapter.component.html',
  styleUrls: ['./care-plan-adapter.component.scss']
})
export class CarePlanAdapterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  newCarePlan(carePlan: CarePlanTemplate): NewCarePlan{
    let newCarePlan: NewCarePlan;

    newCarePlan = {
      PatientProfile_oid: carePlan.Patient?.Id,
      Title: carePlan.Title,
      Description: carePlan.Description,
      DurationDays: carePlan.DurationDays,
      Intent: carePlan.Intent,
      Modified: carePlan.Modified,
      Name: carePlan.Name,
      Status: carePlan.Status
    }

    return newCarePlan;
  }

  newCareActivity(careActivity: CareActivity, idCarePlanTemplate: number): NewCareActivity{
    let newCareActivity: NewCareActivity;

    newCareActivity = {
      CarePlanTemplate_oid: idCarePlanTemplate,
      Name: careActivity.Name,
      Description: careActivity.Description,
      Duration: careActivity.Duration,
      Location: careActivity.Location,
      Periodicity: careActivity.Periodicity,
      TypeActivity: careActivity.TypeActivity,
      ActivityCode: "",
      OutcomeCode: ""
    }

    return newCareActivity;
  }

  newCareMedication(medication: Medication, idCareActivity: number): NewMedication{
    let newMedication: NewMedication;

    newMedication = {
      CareActivity_oid: idCareActivity,
      Name: medication.Name,
      Description: medication.Description,
      Dosage: medication.Dosage, 
      Form: medication.Form,
      Manufacturer: medication.Manufacturer, 
      MedicationCode: medication.MedicationCode,
      ProductReference: medication.ProductReference
    }

    return newMedication;
  }

  newCareNutrition(nutrition: NutritionOrder, idCareActivity: number): NewNutrition{
    let newNutrition: NewNutrition;

    newNutrition = {
      CareActivity_oid: idCareActivity,
      Description: nutrition.Description,
      DietCode: nutrition.DietCode,
      Name: nutrition.Name
    }

    return newNutrition;
  }

  newCareAppointment(appointment: Appointment, idCareActivity: number): NewAppointment{
    let newAppointment: NewAppointment;

    newAppointment = {
      CareActivity_oid: idCareActivity,
      Description: appointment.Description,
      Direction: appointment.Direction,
      IsVirtual: appointment.IsVirtual,
      Id: appointment.Id,
      ReasonCode: appointment.ReasonCode
    }

    return newAppointment;
  }

  newGoal(goal: Goal, idCarePlanTemplate: number, idCondition: number): NewGoal{
    let newGoal: NewGoal;

    newGoal = {
      CarePlanTemplate_oid: idCarePlanTemplate,
      Category: goal.Category,
      Condition_oid: idCondition,
      Description: goal.Description,
      Name: goal.Name,
      OutcomeCode: goal.OutcomeCode,
      Priority: goal.Priority,
      Status: goal.Status
    }

    return newGoal;
  }

  newTarget(target: Target, idGoal:number): NewTarget{
    let newTarget: NewTarget;

    newTarget = {
      Description: target.Description,
      DesiredValue: target.DesiredValue,
      DueDate: target.DueDate,
      Goal_oid: idGoal
    }

    return newTarget;
  }

  newMeasure(measure: Measure): NewMeasure{
    let newMeasure: NewMeasure;

    newMeasure = {
      Description: measure.Description,
      LOINCcode: measure.LOINCcode,
      Name: measure.Name
    }

    return newMeasure;
  }
}
