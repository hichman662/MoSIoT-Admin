import { Property } from "./property";
import { Command } from "./command";
import { Telemetry } from "./telemetry";

export interface DeviceTemplate {
    id:          number;
    name:        string;
    type:        number;
    isEdge:      boolean;
    properties?:  Property[];
    commands?:    Command[];
    telemetries?: Telemetry[];
}
