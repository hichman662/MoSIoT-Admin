import { Component, OnInit } from '@angular/core';
import { Command } from 'src/app/models/Device Template/command';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { Event } from 'src/app/models/Device Template/event';
import { Location } from 'src/app/models/Device Template/location';
import { NewCommand } from 'src/app/models/Device Template/new-command';
import { NewDevice } from 'src/app/models/Device Template/new-device';
import { NewEventTelemetry } from 'src/app/models/Device Template/new-event-telemetry';
import { NewLocation } from 'src/app/models/Device Template/new-location';
import { NewProperty } from 'src/app/models/Device Template/new-property';
import { NewSensor } from 'src/app/models/Device Template/new-sensor';
import { NewStateDevice } from 'src/app/models/Device Template/new-state-device';
import { NewStateTelemetry } from 'src/app/models/Device Template/new-state-telemetry';
import { NewTelemetry } from 'src/app/models/Device Template/new-telemetry';
import { Property } from 'src/app/models/Device Template/property';
import { Sensor } from 'src/app/models/Device Template/sensor';
import { StateDevice } from 'src/app/models/Device Template/state-device';
import { Telemetry } from 'src/app/models/Device Template/telemetry';

@Component({
  selector: 'app-device-template-adapter',
  templateUrl: './device-template-adapter.component.html',
  styleUrls: ['./device-template-adapter.component.scss']
})
export class DeviceTemplateAdapterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  newDevice(device: DeviceTemplate): NewDevice {
    let newDevice: NewDevice;

    newDevice = {
      isEdge: device.isEdge,
      name: device.name,
      type: device.type
    }

    return newDevice;
  }

  newProperty(property: Property, idDeviceTemplate: number): NewProperty{
    let newProperty: NewProperty;

    newProperty = {
      deviceTemplate_oid: idDeviceTemplate,
      isCloudable: property.isCloudable,
      isWritable: property.isWritable,
      name: property.name
    }

    return newProperty;
  }

  newCommnad(command: Command, idDeviceTemplate: number): NewCommand{
    let newCommand: NewCommand;

    newCommand = {
      deviceTemplate_oid: idDeviceTemplate,
      description: command.description,
      isSynchronous: command.isSynchronous,
      name: command.name,
      type: command.type
    }

    return newCommand;
  }

  newTelemetry(telemetry: Telemetry, idDeviceTemplate: number): NewTelemetry{
    let newTelemetry: NewTelemetry;

    newTelemetry = {
      deviceTemplate_oid: idDeviceTemplate,
      frecuency: telemetry.frecuency,
      name: telemetry.name,
      type: telemetry.type,
      unit: telemetry.unit,
      schema: telemetry.schema
    }

    return newTelemetry;
  }

  newEventTelemetry(event: Event, idTelemetry: number): NewEventTelemetry{
    let newEvent: NewEventTelemetry;

    newEvent = {
      telemetry_oid: idTelemetry,
      name: event.name,
      severity: event.severity
    }

    return newEvent;
  }

  newLocationTelemetry(location: Location, idTelemetry: number): NewLocation{
    let newLocation: NewLocation;

    newLocation = {
      telemetry_oid: idTelemetry,
      altitude: location.altitude,
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name
    }

    return newLocation;
  }

  newSensorTelemetry(sensor: Sensor, idTelemetry: number): NewSensor{
    let newSensor: NewSensor;

    newSensor = {
      telemetry_oid: idTelemetry,
      name: sensor.name,
      sensorType: sensor.sensorType
    }

    return newSensor;
  }

  newStateTelemetry(name: string, idTelemetry: number): NewStateTelemetry{
    let newState: NewStateTelemetry;

    newState = {
      telemetry_oid: idTelemetry,
      name: name
    }

    return newState;
  }

  newStateDevice(stateDevice: StateDevice, idStateTelemetry: number): NewStateDevice{
    let newStateDevice: NewStateDevice;

    newStateDevice = {
      stateTelemetry_oid: idStateTelemetry,
      name: stateDevice.name,
      value: stateDevice.value
    }

    return newStateDevice;
  }

}
