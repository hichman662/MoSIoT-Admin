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
      IsEdge: device.IsEdge,
      Name: device.Name,
      Type: device.Type
    }

    return newDevice;
  }

  newProperty(property: Property, idDeviceTemplate: number): NewProperty{
    let newProperty: NewProperty;

    newProperty = {
      DeviceTemplate_oid: idDeviceTemplate,
      IsCloudable: property.IsCloudable,
      IsWritable: property.IsWritable,
      Name: property.Name
    }

    return newProperty;
  }

  newCommnad(command: Command, idDeviceTemplate: number): NewCommand{
    let newCommand: NewCommand;

    newCommand = {
      DeviceTemplate_oid: idDeviceTemplate,
      Description: command.Description,
      IsSynchronous: command.IsSynchronous,
      Name: command.Name,
      Type: command.Type
    }

    return newCommand;
  }

  newTelemetry(telemetry: Telemetry, idDeviceTemplate: number): NewTelemetry{
    let newTelemetry: NewTelemetry;

    newTelemetry = {
      DeviceTemplate_oid: idDeviceTemplate,
      Frecuency: telemetry.Frecuency,
      Name: telemetry.Name,
      Type: telemetry.Type,
      Unit: telemetry.Unit,
      Schema: telemetry.Schema
    }

    return newTelemetry;
  }

  newEventTelemetry(event: Event, idTelemetry: number): NewEventTelemetry{
    let newEvent: NewEventTelemetry;

    newEvent = {
      Telemetry_oid: idTelemetry,
      Name: event.Name,
      Severity: event.Severity
    }

    return newEvent;
  }

  newLocationTelemetry(location: Location, idTelemetry: number): NewLocation{
    let newLocation: NewLocation;

    newLocation = {
      Telemetry_oid: idTelemetry,
      Altitude: location.Altitude,
      Latitude: location.Latitude,
      Longitude: location.Longitude,
      Name: location.Name
    }

    return newLocation;
  }

  newSensorTelemetry(sensor: Sensor, idTelemetry: number): NewSensor{
    let newSensor: NewSensor;

    newSensor = {
      Telemetry_oid: idTelemetry,
      Name: sensor.Name,
      SensorType: sensor.SensorType
    }

    return newSensor;
  }

  newStateTelemetry(name: string, idTelemetry: number): NewStateTelemetry{
    let newState: NewStateTelemetry;

    newState = {
      Telemetry_oid: idTelemetry,
      Name: name
    }

    return newState;
  }

  newStateDevice(stateDevice: StateDevice, idStateTelemetry: number): NewStateDevice{
    let newStateDevice: NewStateDevice;

    newStateDevice = {
      StateTelemetry_oid: idStateTelemetry,
      Name: stateDevice.Name,
      Value: stateDevice.Value
    }

    return newStateDevice;
  }

}
