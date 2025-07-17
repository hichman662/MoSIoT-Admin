import { Property } from "./property";
import { Command } from "./command";
import { Telemetry } from "./telemetry";

export interface DeviceTemplate {
    Id:          number;
    Name:        string;
    Type:        number;
    IsEdge:      boolean;
    Properties?:  Property[];
    Commands?:    Command[];
    Telemetries?: Telemetry[];
}
