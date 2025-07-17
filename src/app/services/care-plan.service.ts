import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/Care Plan/appointment';
import { CareActivity } from '../models/Care Plan/care-activity';
import { CarePlanTemplate } from '../models/Care Plan/care-plan-template';
import { Goal } from '../models/Care Plan/goal';
import { Measure } from '../models/Care Plan/measure';
import { Medication } from '../models/Care Plan/medication';
import { NewAppointment } from '../models/Care Plan/new-appointment';
import { NewCareActivity } from '../models/Care Plan/new-care-activity';
import { NewCarePlan } from '../models/Care Plan/new-care-plan';
import { NewGoal } from '../models/Care Plan/new-goal';
import { NewMeasure } from '../models/Care Plan/new-measure';
import { NewMedication } from '../models/Care Plan/new-medication';
import { NewNutrition } from '../models/Care Plan/new-nutrition';
import { NewTarget } from '../models/Care Plan/new-target';
import { NutritionOrder } from '../models/Care Plan/nutrition-order';
import { Target } from '../models/Care Plan/target';
import { Condition } from '../models/Patient Profile/condition';

@Injectable({
  providedIn: 'root'
})
export class CarePlanService {

  constructor(private http: HttpClient) { }

  getAllCarePlanTemplate(){
    return this.http.get<CarePlanTemplate[]>(environment.base_url + '/CarePlanTemplate/ReadAll');
  }

  getAllMeasure(){
    return this.http.get<Measure[]>(environment.base_url + '/Measure/ReadAll');
  }

  getCarePlanById(id: number){
    return this.http.get<CarePlanTemplate>(environment.base_url + '/CarePlanTemplate/' + id);
  }

  getMeasureById(id: number){
    return this.http.get<Measure>(environment.base_url + '/Measure/' + id);
  }

  createCarePlanTemplate(data: NewCarePlan){
    return this.http.post<CarePlanTemplate>(environment.base_url + '/CarePlanTemplate/New_', data);
  }

  createCareActivity(data: NewCareActivity){
    return this.http.post<CareActivity>(environment.base_url + '/CareActivity/New_', data);
  }

  createCareActivityMedication(data: NewMedication){
    return this.http.post<Medication>(environment.base_url + '/Medication/New_', data);
  }

  createCareActivityNutrition(data: NewNutrition){
    return this.http.post<NutritionOrder>(environment.base_url + '/NutritionOrder/New_', data);
  }

  createCareActivityAppointment(data: NewAppointment){
    return this.http.post<Appointment>(environment.base_url + '/Appointment/New_', data);
  }

  createGoal(data: NewGoal){
    return this.http.post<Goal>(environment.base_url + '/Goal/New_', data);
  }

  createTarget(data: NewTarget){
    return this.http.post<Target>(environment.base_url + '/Target/New_', data);
  }

  createMeasure(data: NewMeasure){
    return this.http.post<Measure>(environment.base_url + '/Measure/New_', data);
  }

  updateCarePlan(id: number, data: CarePlanTemplate){
    return this.http.put(environment.base_url + '/CarePlanTemplate/Modify?idCarePlanTemplate=' + id, data);
  }

  updateCarePlanPatient(idCarePlan: number, idPatient: number){
    return this.http.put(environment.base_url + '/CarePlanTemplate/AddPatientProfile?p_careplantemplate_oid=' + idCarePlan + "&p_patientprofile_oid=" + idPatient, null);
  }

  updateCarePlanAdressCondition(idCarePlanTemplate:number, idAdressCondition: number[]){
    return this.http.put(environment.base_url + '/CarePlanTemplate/AddCondition?p_careplantemplate_oid=' + idCarePlanTemplate, idAdressCondition);
  }

  updateTargetMeasure(idTarget: number, idMeasure: number){
    return this.http.put(environment.base_url + '/Target/AddMeasure?p_target_oid=' + idTarget + '&p_measure_oid=' + idMeasure, null);
  }

  updateMeasureTelemtry(idMeasure:number, idTelemetries: number[]){
    return this.http.put(environment.base_url + '/Measure/AddTelemetries?p_measure_oid=' + idMeasure, idTelemetries);
  }

  updateCareActivity(id: number, data: NewCareActivity){
    return this.http.put(environment.base_url + '/CareActivity/Modify?idCareActivity=' + id, data);
  }

  updateCareActivityMedication(id: number, data: NewMedication){
    return this.http.put(environment.base_url + '/Medication/Modify?idMedication=' + id, data);
  }

  updateCareActivityNutrition(id: number, data: NewNutrition){
    return this.http.put(environment.base_url + '/NutritionOrder/Modify?idNutritionOrder=' + id, data);
  }

  updateCareActivityAppointment(id: number, data: NewAppointment){
    return this.http.put(environment.base_url + '/Appointment/Modify?idAppointment=' + id, data);
  }

  updateGoal(id: number, data: Goal){
    return this.http.put(environment.base_url + '/Goal/Modify?idGoal=' + id, data);
  }

  updateTarget(id: number, data: Target){
    return this.http.put(environment.base_url + '/Target/Modify?idTarget=' + id, data);
  }

  updateMeasure(id: number, data: NewMeasure){
    return this.http.put(environment.base_url + '/Measure/Modify?idMeasure=' + id, data);
  }

  deleteCarePlan(id:number) {
    return this.http.delete(environment.base_url + '/CarePlanTemplate/Destroy?p_careplantemplate_oid=' + id);
  }

  deleteCareActivity(id:number) {
    return this.http.delete(environment.base_url + '/CareActivity/Destroy?p_careactivity_oid=' + id);
  }

  deleteGoal(id:number) {
    return this.http.delete(environment.base_url + '/Goal/Destroy?p_goal_oid=' + id);
  }

  deleteTarget(id:number) {
    return this.http.delete(environment.base_url + '/Target/Destroy?p_target_oid=' + id);
  }

  deleteMeasure(id:number) {
    return this.http.delete(environment.base_url + '/Measure/Destroy?p_measure_oid=' + id);
  }

  deleteAdressCondition(id:number){
    return this.http.delete(environment.base_url + '/Condition_CarePlan/Destroy?p_condition_oid=' + id);
  }
}