import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceTemplate } from '../models/Device Template/device-template';
import { environment } from 'src/environments/environment';
import { Telemetry } from '../models/Device Template/telemetry';
import { Property } from '../models/Device Template/property';
import { Command } from '../models/Device Template/command';
import { NewTelemetry } from '../models/Device Template/new-telemetry';
import { NewProperty } from '../models/Device Template/new-property';
import { NewCommand } from '../models/Device Template/new-command';
import { NewDevice } from '../models/Device Template/new-device';
import { Sensor } from '../models/Device Template/sensor';
import { State } from '../models/Device Template/state';
import { Event } from '../models/Device Template/event';
import { NewStateTelemetry } from '../models/Device Template/new-state-telemetry';
import { NewEventTelemetry } from '../models/Device Template/new-event-telemetry';
import { NewLocation } from '../models/Device Template/new-location';
import { Location } from '../models/Device Template/location';
import { NewSensor } from '../models/Device Template/new-sensor';
import { NewStateDevice } from '../models/Device Template/new-state-device';
import { StateDevice } from '../models/Device Template/state-device';

@Injectable({
  providedIn: 'root'
})
export class DeviceTemplateService {
  constructor(private http: HttpClient) { }

  getAllDeviceTemplate(){
    return this.http.get<DeviceTemplate[]>(environment.base_url + '/DeviceTemplate/ReadAll');
  }

  getAllTelemetry(){
    return this.http.get<Telemetry[]>(environment.base_url + '/Telemetry/ReadAll');
  }

  getDeviceTemplateById(id: number){
    return this.http.get<DeviceTemplate>(environment.base_url + '/DeviceTemplate/' + id);
  }

  getStateDeviceById(id: number){
    return this.http.get<StateDevice>(environment.base_url + '/StateDevice/' + id);
  }

  createDeviceTemplate(data: NewDevice){
    return this.http.post<DeviceTemplate>(environment.base_url + '/DeviceTemplate/NEW_', data);
  }

  createTelemetry(data: NewTelemetry){
    return this.http.post<Telemetry>(environment.base_url + '/Telemetry/New_', data);
  }

  createProperty(data: NewProperty){
    return this.http.post<Property>(environment.base_url + '/Property/New_', data);
  }

  createCommand(data: NewCommand){
    return this.http.post<Command>(environment.base_url + '/Command/New_', data);
  }

  createStateTelemetry(data:NewStateTelemetry) {
    return this.http.post<State>(environment.base_url + '/StateTelemetry/New_', data);
  }

  createLocationTelemetry(data:NewLocation) {
    return this.http.post<Location>(environment.base_url + '/LocationTelemetry/New_', data);
  }

  createSensorTelemetry(data:NewSensor) {
    return this.http.post<Sensor>(environment.base_url + '/SensorTelemetry/New_', data);
  }

  createEventTelemetry(data:NewEventTelemetry) {
    return this.http.post<Event>(environment.base_url + '/EventTelemetry/New_', data);
  }

  createStateDeviceTelemetry(data:NewStateDevice) {
    return this.http.post<StateDevice>(environment.base_url + '/StateDevice/New_', data);
  }

  updateDeviceCommand(id: number, data: Command){
    return this.http.put(environment.base_url + '/Command/Modify?idCommand=' + id, data);
  }

  updateDeviceProperty(id: number, data: Property){
    return this.http.put(environment.base_url + '/Property/Modify?idProperty=' + id, data);
  }

  updateDeviceTemplate(id: number, data: DeviceTemplate){
    return this.http.put(environment.base_url + '/DeviceTemplate/Modify?idDeviceTemplate=' + id, data);
  }

  updateDeviceTelemetry(id: number, data: Telemetry){
    return this.http.put(environment.base_url + '/Telemetry/Modify?idTelemetry=' + id, data);
  }

  updateEventTelemetry(id: number, data: Event){
    return this.http.put(environment.base_url + '/EventTelemetry/Modify?idEventTelemetry=' + id, data);
  }

  updateLocationTelemetry(id: number, data: Location){
    return this.http.put(environment.base_url + '/LocationTelemetry/Modify?idLocationTelemetry=' + id, data);
  }

  updateSensorTelemetry(id: number, data: Sensor){
    return this.http.put(environment.base_url + '/SensorTelemetry/Modify?idSensorTelemetry=' + id, data);
  }

  updateStateTelemetry(id: number, data: NewStateTelemetry){
    return this.http.put(environment.base_url + '/StateTelemetry/Modify?idStateTelemetry=' + id, data);
  }

  updateStateDeviceTelemetry(id: number, data: StateDevice){
    return this.http.put(environment.base_url + '/StateDevice/Modify?idSensorTelemetry=' + id, data);
  }

  deleteDeviceTelemetry(id:number) {
    return this.http.delete(environment.base_url + '/Telemetry/Destroy?p_telemetry_oid=' + id);
  }

  deleteDeviceTemplate(id:number) {
    return this.http.delete(environment.base_url + '/DeviceTemplate/Destroy?p_devicetemplate_oid=' + id);
  }

  deleteDeviceProperty(id:number) {
    return this.http.delete(environment.base_url + '/Property/Destroy?p_property_oid=' + id);
  }

  deleteDeviceCommand(id:number) {
    return this.http.delete(environment.base_url + '/Command/Destroy?p_command_oid=' + id);
  }

  deleteStateTelemetry(id:number) {
    return this.http.delete(environment.base_url + '/StateTelemetry/Destroy?p_statetelemetry_oid=' + id);
  }

  deleteStateDeviceTelemetry(id:number) {
    return this.http.delete(environment.base_url + '/StateDevice/Destroy?p_statetelemetry_oid=' + id);
  }

  deleteLocationTelemetry(id:number) {
    return this.http.delete(environment.base_url + '/LocationTelemetry/Destroy?p_locationtelemetry_oid=' + id);
  }

  deleteSensorTelemetry(id:number) {
    return this.http.delete(environment.base_url + '/SensorTelemetry/Destroy?p_sensortelemetry_oid=' + id);
  }

  deleteEventTelemetry(id:number) {
    return this.http.delete(environment.base_url + '/EventTelemetry/Destroy?p_eventtelemetry_oid=' + id);
  }
}
