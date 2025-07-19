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
      patientProfile_oid: carePlan.patient?.id,
      title: carePlan.title,
      description: carePlan.description,
      durationDays: carePlan.durationDays,
      intent: carePlan.intent,
      modified: carePlan.modified,
      name: carePlan.name,
      status: carePlan.status
    }

    return newCarePlan;
  }

  newCareActivity(careActivity: CareActivity, idCarePlanTemplate: number): NewCareActivity{
    let newCareActivity: NewCareActivity;

    newCareActivity = {
      carePlanTemplate_oid: idCarePlanTemplate,
      name: careActivity.name,
      description: careActivity.description,
      duration: careActivity.duration,
      location: careActivity.location,
      periodicity: careActivity.periodicity,
      typeActivity: careActivity.typeActivity,
      activityCode: "",
      outcomeCode: ""
    }

    return newCareActivity;
  }

  newCareMedication(medication: Medication, idCareActivity: number): NewMedication{
    let newMedication: NewMedication;

    newMedication = {
      careActivity_oid: idCareActivity,
      name: medication.name,
      description: medication.description,
      dosage: medication.dosage, 
      form: medication.form,
      manufacturer: medication.manufacturer, 
      medicationCode: medication.medicationCode,
      productReference: medication.productReference
    }

    return newMedication;
  }

  newCareNutrition(nutrition: NutritionOrder, idCareActivity: number): NewNutrition{
    let newNutrition: NewNutrition;

    newNutrition = {
      careActivity_oid: idCareActivity,
      description: nutrition.description,
      dietCode: nutrition.dietCode,
      name: nutrition.name
    }

    return newNutrition;
  }

  newCareAppointment(appointment: Appointment, idCareActivity: number): NewAppointment{
    let newAppointment: NewAppointment;

    newAppointment = {
      careActivity_oid: idCareActivity,
      description: appointment.description,
      direction: appointment.direction,
      isVirtual: appointment.isVirtual,
      id: appointment.id,
      reasonCode: appointment.reasonCode
    }

    return newAppointment;
  }

  newGoal(goal: Goal, idCarePlanTemplate: number, idCondition: number): NewGoal{
    let newGoal: NewGoal;

    newGoal = {
      carePlanTemplate_oid: idCarePlanTemplate,
      category: goal.category,
      condition_oid: idCondition,
      description: goal.description,
      name: goal.name,
      outcomeCode: goal.outcomeCode,
      priority: goal.priority,
      status: goal.status
    }

    return newGoal;
  }

  newTarget(target: Target, idGoal:number): NewTarget{
    let newTarget: NewTarget;

    newTarget = {
      description: target.description,
      desiredValue: target.desiredValue,
      dueDate: target.dueDate,
      goal_oid: idGoal
    }

    return newTarget;
  }

  newMeasure(measure: Measure): NewMeasure{
    let newMeasure: NewMeasure;

    newMeasure = {
      description: measure.description,
      lOINCcode: measure.lOINCcode,
      name: measure.name
    }

    return newMeasure;
  }
}
